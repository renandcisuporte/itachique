require('dotenv/config')

module.exports = {
  apps: [
    {
      version: '1.0.0',
      name: 'itachique-app',
      script: './node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      max_restarts: 500,
      max_memory_restart: '128M',
      restart_delay: 5000,
      autorestart: true,
      ignore_watch: ['node_modules'],
      env: {
        ...process.env
      },
      env_production: {
        ...process.env,
        NODE_ENV: 'production'
      }
    }
  ]
}
