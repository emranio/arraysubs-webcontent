const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const envFile = path.join(root, ".env");
const nextBinary = path.join(root, "node_modules/next/dist/bin/next");

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

const instancesRaw = process.env.APP_INSTANCES || fileEnv.APP_INSTANCES || "2";
const instances = Number.parseInt(instancesRaw, 10);

if (process.env.NEXT_HOSTNAME || fileEnv.HOSTNAME) {
  runtimeEnv.HOSTNAME = process.env.NEXT_HOSTNAME || fileEnv.HOSTNAME;
}

module.exports = {
  apps: [
    {
      name: "arrayhash-com-next",
      cwd: root,
      script: nextBinary,
      args: "start",
      interpreter: "node",
      // Cluster mode so `pm2 reload` is zero-downtime: workers are replaced
      // one by one and the old ones keep serving until the new ones listen.
      exec_mode: "cluster",
      instances: Number.isInteger(instances) && instances > 0 ? instances : 2,
      listen_timeout: 30000,
      kill_timeout: 15000,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      merge_logs: true,
      env: runtimeEnv,
      env_production: runtimeEnv,
    },
  ],
};
