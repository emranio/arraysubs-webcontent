#!/usr/bin/env bash
set -Eeuo pipefail

# Zero-downtime deploy.
#
# The old flow built in a staging dir but then did `pm2 stop` -> swap
# .next/node_modules in place -> cold start, which took the site down for the
# whole restart (and longer when the health check failed). New flow:
#   1. Export the target commit into .deploy/releases/<stamp>-<sha>
#   2. npm ci + build there (live app untouched, keeps serving)
#   3. Link shared runtime state (storage/) into the release
#   4. Atomically repoint .deploy/current, then PM2 graceful cluster reload —
#      workers are replaced one by one; the old release stays on disk so
#      in-flight requests never lose their files
#   5. Health-check; on failure, repoint to the previous release and reload
#   6. Prune old releases (keep KEEP_RELEASES)
#
# This script does not touch git; the CI workflow checks out the target
# commit in this directory before invoking it. TARGET_SHA defaults to HEAD.

APP_NAME="${APP_NAME:-arrayhash-com-next}"
APP_HOST="${APP_HOST:-127.0.0.1}"
HEALTH_RETRIES="${HEALTH_RETRIES:-30}"
KEEP_RELEASES="${KEEP_RELEASES:-2}"
HEALTH_PATHS=("/" "/deals/arraysubs/")

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$ROOT_DIR/.deploy"
RELEASES_DIR="$DEPLOY_DIR/releases"
SHARED_DIR="$DEPLOY_DIR/shared"
CURRENT_LINK="$DEPLOY_DIR/current"

for cmd in git npm node pm2 curl tar; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "$cmd is required but was not found." >&2
    exit 1
  fi
done

cd "$ROOT_DIR"

TARGET_SHA="${TARGET_SHA:-$(git rev-parse HEAD)}"
RELEASE_DIR="$RELEASES_DIR/$(date -u +%Y%m%d%H%M%S)-${TARGET_SHA:0:12}"

PREVIOUS_TARGET=""
SWAPPED=0

switch_current_to() {
  ln -sfn "$1" "$CURRENT_LINK.tmp.$$"
  mv -Tf "$CURRENT_LINK.tmp.$$" "$CURRENT_LINK"
}

cleanup() {
  status=$?
  set +e

  if [ "$status" -ne 0 ]; then
    if [ "$SWAPPED" -eq 1 ]; then
      rollback_target=""
      if [ -n "$PREVIOUS_TARGET" ] && [ -d "$PREVIOUS_TARGET" ]; then
        rollback_target="$PREVIOUS_TARGET"
      elif [ -d "$ROOT_DIR/.next" ] && [ -d "$ROOT_DIR/node_modules" ]; then
        # First-ever release failed: fall back to the legacy in-place build
        # still present in the checkout.
        rollback_target="$ROOT_DIR"
      fi

      if [ -n "$rollback_target" ]; then
        echo "==> Deploy failed; rolling back to $rollback_target" >&2
        switch_current_to "$rollback_target"
        pm2 startOrReload "$ROOT_DIR/ecosystem.config.cjs" --env production --update-env
      else
        echo "==> Deploy failed and no previous release exists to roll back to." >&2
      fi
    fi

    rm -rf "$RELEASE_DIR"
  fi

  exit "$status"
}

trap cleanup EXIT

mkdir -p "$RELEASES_DIR" "$SHARED_DIR"

# storage/ is runtime-written (ROADMAP_DATA_PATH=./storage/roadmap.json) and
# untracked; it lives in shared/ and is linked into every release. Bootstrap
# it from the checkout on first run.
if [ ! -d "$SHARED_DIR/storage" ]; then
  if [ -d "$ROOT_DIR/storage" ]; then
    cp -a "$ROOT_DIR/storage" "$SHARED_DIR/storage"
    echo "==> Bootstrapped $SHARED_DIR/storage from checkout storage/"
  else
    mkdir -p "$SHARED_DIR/storage"
  fi
fi

echo "==> Preparing release $RELEASE_DIR"
mkdir -p "$RELEASE_DIR"
git archive "$TARGET_SHA" | tar -x -C "$RELEASE_DIR"

cp "$RELEASE_DIR/.env.production" "$RELEASE_DIR/.env"
ln -sfn "$SHARED_DIR/storage" "$RELEASE_DIR/storage"

APP_PORT="$(sed -n 's/^PORT=//p' "$RELEASE_DIR/.env" | tail -1)"
APP_PORT="${APP_PORT:-3000}"

cd "$RELEASE_DIR"

echo "==> Installing dependencies"
npm ci

echo "==> Building"
npm run build

PREVIOUS_TARGET="$(readlink "$CURRENT_LINK" 2>/dev/null || true)"

echo "==> Activating release"
switch_current_to "$RELEASE_DIR"
SWAPPED=1

stable_launcher="$ROOT_DIR/server-launcher.cjs"

# Old deployments registered Next's binary from a versioned release as PM2's
# entry point. Once that release was pruned, later worker restarts served 500s.
# Replace that legacy process once; future reloads keep this stable launcher.
if pm2 jlist 2>/dev/null | node -e '
  let raw = "";
  process.stdin.on("data", (chunk) => (raw += chunk));
  process.stdin.on("end", () => {
    const start = raw.indexOf("[");
    if (start === -1) process.exit(1);
    let list;
    try { list = JSON.parse(raw.slice(start)); } catch { process.exit(1); }
    const app = list.find((proc) => proc.name === process.argv[1]);
    if (!app) process.exit(1);
    const stable = app.pm2_env.exec_mode === "cluster_mode"
      && app.pm2_env.pm_exec_path === process.argv[2];
    process.exit(stable ? 0 : 2);
  });
' "$APP_NAME" "$stable_launcher"; then
  :
else
  pm2_state=$?
  if [ "$pm2_state" -eq 2 ]; then
    echo "==> Replacing legacy PM2 entry point with stable launcher"
    pm2 delete "$APP_NAME"
  fi
fi

pm2 startOrReload "$ROOT_DIR/ecosystem.config.cjs" --env production --update-env

echo "==> Health check"
for health_path in "${HEALTH_PATHS[@]}"; do
  health_url="http://$APP_HOST:$APP_PORT$health_path"
  healthy=0

  for attempt in $(seq 1 "$HEALTH_RETRIES"); do
    if curl -fsS --max-time 5 "$health_url" >/dev/null 2>&1; then
      healthy=1
      break
    fi
    sleep 1
  done

  if [ "$healthy" -ne 1 ]; then
    echo "Health check failed: $health_url" >&2
    pm2 logs "$APP_NAME" --lines 80 --nostream || true
    exit 1
  fi
done

# The reload is graceful, so curl can succeed against old workers; also
# require every PM2 instance to report online.
if ! pm2 jlist 2>/dev/null | node -e '
  let raw = "";
  process.stdin.on("data", (chunk) => (raw += chunk));
  process.stdin.on("end", () => {
    const start = raw.indexOf("[");
    if (start === -1) process.exit(1);
    let list;
    try { list = JSON.parse(raw.slice(start)); } catch { process.exit(1); }
    const apps = list.filter((proc) => proc.name === process.argv[1]);
    const ok = apps.length > 0 && apps.every((proc) => proc.pm2_env.status === "online");
    process.exit(ok ? 0 : 1);
  });
' "$APP_NAME"; then
  echo "PM2 reports non-online instances for $APP_NAME" >&2
  pm2 logs "$APP_NAME" --lines 80 --nostream || true
  exit 1
fi

pm2 save

echo "==> Pruning old releases (keeping $KEEP_RELEASES)"
current_target="$(readlink "$CURRENT_LINK")"
(
  cd "$RELEASES_DIR"
  ls -1dt -- */ 2>/dev/null | sed 's:/$::' | tail -n +"$((KEEP_RELEASES + 1))" | while read -r dir; do
    [ "$RELEASES_DIR/$dir" = "$current_target" ] && continue
    rm -rf -- "$RELEASES_DIR/${dir:?}"
  done
)

pm2 status "$APP_NAME"
echo "==> Deployed $TARGET_SHA to $RELEASE_DIR"
