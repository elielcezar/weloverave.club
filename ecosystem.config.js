module.exports = {
    apps: [{
      name: 'nextjs-app',
      script: '.next/standalone/server.js', // Usa o servidor standalone gerado
      cwd: process.cwd(),
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000  // Mudado para 3000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G'
    }]
  }