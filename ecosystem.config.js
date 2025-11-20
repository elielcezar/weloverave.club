module.exports = {
    apps: [{
      name: 'nextjs-app',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: process.cwd(), // Usa o diretório atual automaticamente
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000 // Pode ser sobrescrito por variável de ambiente
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G'
    }]
  }