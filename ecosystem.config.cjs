const path = require('node:path');

const bunBinary = process.env.BUN_BIN || path.join(process.env.HOME || '/root', '.bun', 'bin', 'bun');

module.exports = {
  apps: [
    {
      name: 'arrayhash-com-next',
      cwd: __dirname,
      script: '.next/standalone/server.js',
      interpreter: bunBinary,
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      merge_logs: true,
      time: true,
      env_production: {
        NODE_ENV: 'production',
        HOSTNAME: '0.0.0.0',
        PORT: '9986',
      },
    },
  ],
};
