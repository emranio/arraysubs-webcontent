const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const envFile = path.join(root, ".env");
const bunBinary =
  process.env.BUN_BINARY ||
  (process.env.HOME ? path.join(process.env.HOME, ".bun/bin/bun") : "bun");
const packageRunner = fs.existsSync(bunBinary) ? bunBinary : "npm";

function readEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        return env;
      }

      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);

      if (!match) {
        return env;
      }

      const [, key, rawValue] = match;
      const value = rawValue.trim().replace(/^(['"])(.*)\1$/, "$2");

      env[key] = value;
      return env;
    }, {});
}

const fileEnv = readEnv(envFile);
const runtimeEnv = {
  ...fileEnv,
  NODE_ENV: "production",
  PORT: process.env.PORT || fileEnv.PORT || "3000",
};

if (process.env.NEXT_HOSTNAME || fileEnv.HOSTNAME) {
  runtimeEnv.HOSTNAME = process.env.NEXT_HOSTNAME || fileEnv.HOSTNAME;
}

module.exports = {
  apps: [
    {
      name: "arrayhash-com-next",
      cwd: root,
      script: packageRunner,
      args: "run start",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      merge_logs: true,
      env: runtimeEnv,
      env_production: runtimeEnv,
    },
  ],
};
