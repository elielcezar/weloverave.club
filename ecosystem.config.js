module.exports = {
    apps: [{
      name: 'nextjs-app',
      script: '.next/standalone/server.js',
      cwd: process.cwd(), // Garante que roda da raiz do projeto
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
        // Garantir que o Next.js encontre os arquivos estáticos
        NEXT_STATIC_FOLDER: '.next/static'
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G'
    }]
  }