# Guia de Deploy - Next.js no VPS com Nginx e CloudPanel

Este documento descreve o processo completo de deploy de uma aplicação Next.js em um servidor VPS usando Nginx como reverse proxy e CloudPanel para gerenciamento.

## 📋 Pré-requisitos

- Servidor VPS com acesso SSH
- Node.js 18+ instalado
- PM2 instalado globalmente
- Nginx instalado e configurado
- CloudPanel configurado
- Domínio apontando para o servidor
- Repositório Git configurado

## 🔧 Passo 1: Configuração do Projeto

### 1.1. Configurar `next.config.js`

O arquivo `next.config.js` deve ter `output: 'standalone'` para gerar um build otimizado:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // IMPORTANTE: Gera build otimizado para produção
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cms-news-2025.s3.sa-east-1.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
```

### 1.2. Configurar `.gitignore`

**IMPORTANTE:** Certifique-se de que o `.gitignore` inclui a pasta `.next`:

```gitignore
# Next.js
.next
out
```

A pasta `.next` contém arquivos gerados pelo build e **nunca deve ser versionada** no Git. Isso evita conflitos durante o `git pull`.

### 1.3. Configurar `ecosystem.config.js`

Crie o arquivo `ecosystem.config.js` na raiz do projeto:

```javascript
module.exports = {
  apps: [{
    name: 'nextjs-app',
    script: '.next/standalone/server.js', // Usa o servidor standalone gerado
    cwd: process.cwd(), // Garante que roda da raiz do projeto
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 3000, // Porta padrão (verificar disponibilidade)
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
```

**Importante:** Verifique se a porta escolhida está livre antes de configurar.

### 1.4. Script de Deploy Automatizado

O projeto inclui um script `deploy.sh` que automatiza todo o processo de deploy. Este script:
- Faz pull do Git
- Limpa o build anterior
- Instala dependências
- Faz novo build
- Recria o link simbólico para arquivos estáticos
- Reinicia o PM2

O script está pronto para uso, mas você pode ajustar as variáveis no início do arquivo se necessário:
- `PROJECT_DIR`: Diretório do projeto no servidor
- `PM2_APP_NAME`: Nome da aplicação no PM2

## 🖥️ Passo 2: Preparação do Servidor VPS

### 2.1. Instalar Node.js e PM2

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js (versão 20)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 globalmente
sudo npm install -g pm2

# Verificar instalações
node --version
npm --version
pm2 --version
```

### 2.2. Verificar Portas Disponíveis

```bash
# Ver todas as portas em uso
sudo netstat -tulpn | grep LISTEN
# ou
sudo ss -tulpn | grep LISTEN

# Verificar portas específicas (exemplo: 3000, 3010, 3030)
sudo lsof -i :3000
sudo lsof -i :3010
sudo lsof -i :3030

# Ver processos do PM2
pm2 list
```

### 2.3. Fazer Upload do Projeto

```bash
# Opção 1: Via Git (recomendado)
cd /home/seu-usuario/htdocs/seu-dominio.com
git clone seu-repositorio.git
cd seu-projeto

# Opção 2: Via SCP/SFTP
# Faça upload dos arquivos do projeto para o servidor
```

## 🏗️ Passo 3: Build e Configuração no Servidor

### 3.1. Instalar Dependências e Fazer Build

```bash
cd /home/seu-usuario/htdocs/seu-dominio.com

# Instalar dependências de produção
npm install --production

# Fazer build do projeto
npm run build
```

### 3.2. Criar Link Simbólico para Arquivos Estáticos

**CRÍTICO:** Com `output: 'standalone'`, é necessário criar um link simbólico para os arquivos estáticos:

```bash
# Criar diretório se não existir
mkdir -p .next/standalone/.next

# Criar link simbólico para os arquivos estáticos
ln -sf ../../static .next/standalone/.next/static

# Verificar se funcionou
ls -la .next/standalone/.next/static
```

### 3.3. Criar Diretório de Logs

```bash
mkdir -p logs
```

### 3.4. Iniciar com PM2

```bash
# Iniciar aplicação
pm2 start ecosystem.config.js

# Salvar configuração para iniciar automaticamente no boot
pm2 save
pm2 startup  # Siga as instruções que aparecerem

# Verificar status
pm2 status
pm2 logs nextjs-app --lines 20
```

## 🌐 Passo 4: Configuração do Nginx no CloudPanel

### 4.1. Acessar CloudPanel

1. Acesse o CloudPanel
2. Vá em **Sites** → **seu-dominio.com** → **Vhost**
3. Cole a configuração abaixo

### 4.2. Configuração do Vhost

```nginx
# Template de Vhost para Next.js no CloudPanel
# Copie e cole no CloudPanel: Sites → seu-dominio.com → Vhost

server {
  listen 80;
  listen [::]:80;
  listen 443 quic;
  listen 443 ssl;
  listen [::]:443 quic;
  listen [::]:443 ssl;
  http2 on;
  http3 off;

  {{ssl_certificate_key}}
  {{ssl_certificate}}

  server_name seu-dominio.com;

  {{nginx_access_log}}
  {{nginx_error_log}}

  # Redirecionar HTTP para HTTPS
  if ($scheme != "https") {
    rewrite ^ https://$host$request_uri permanent;
  }

  # Let's Encrypt
  location ~ /.well-known {
    auth_basic off;
    allow all;
  }

  {{settings}}
  include /etc/nginx/global_settings;

  # ==========================================
  # BACKEND NODE.JS (seu backend existente)
  # ==========================================
  location ^~ /uploads {
    proxy_pass http://127.0.0.1:3030;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /api {
    proxy_pass http://127.0.0.1:3030;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }

  # ==========================================
  # PROXY REVERSO PARA NEXT.JS
  # ==========================================
  # IMPORTANTE: Todas as requisições /_next/* devem ir para o Next.js
  # O Next.js standalone serve os arquivos estáticos automaticamente
  
  # Proxy reverso para TODAS as requisições (incluindo /_next/static)
  location / {
    proxy_pass http://127.0.0.1:3000;  # Ajustar porta conforme ecosystem.config.js
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    
    # Timeouts
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
  }

  # ==========================================
  # CACHE PARA ARQUIVOS ESTÁTICOS (opcional)
  # ==========================================
  location ~* ^.+\.(css|js|jpg|jpeg|gif|png|ico|gz|svg|svgz|ttf|otf|woff|woff2|eot|mp4|ogg|ogv|webm|webp|zip|swf)$ {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    add_header Access-Control-Allow-Origin "*";
    expires max;
    access_log off;
  }
}
```

**Importante:** Ajuste a porta `3000` no `proxy_pass` conforme a porta configurada no `ecosystem.config.js`.

### 4.3. Salvar e Recarregar Nginx

O CloudPanel geralmente recarrega o Nginx automaticamente. Se não recarregar:

```bash
sudo nginx -t  # Testar configuração
sudo systemctl reload nginx  # Recarregar nginx
```

## ✅ Passo 5: Verificação e Testes

### 5.1. Verificar Status do PM2

```bash
pm2 status
pm2 logs nextjs-app --lines 20
```

### 5.2. Testar Acesso Direto

```bash
# Testar se o Next.js está respondendo na porta 3000
curl http://localhost:3000

# Testar arquivos estáticos
curl http://localhost:3000/_next/static/css/[nome-do-arquivo].css
```

### 5.3. Verificar Logs do Nginx

```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### 5.4. Testar no Navegador

- Acesse `https://seu-dominio.com`
- Verifique se o site carrega corretamente
- Verifique se CSS e JS estão carregando (F12 → Network)
- Teste rotas do backend (`/api/*`)

## 🔄 Passo 6: Atualizações Futuras

### 6.1. Usando o Script de Deploy (Recomendado)

O projeto inclui um script `deploy.sh` que automatiza todo o processo de deploy:

```bash
cd /home/seu-usuario/htdocs/seu-dominio.com

# Tornar o script executável (só precisa fazer uma vez)
chmod +x deploy.sh

# Executar o script de deploy
./deploy.sh
```

O script automaticamente:
- Faz `git pull`
- Limpa o build anterior (remove `.next`)
- Instala dependências
- Faz novo build
- Recria o link simbólico para arquivos estáticos
- Reinicia o PM2
- Mostra status e logs

### 6.2. Deploy Manual (Alternativa)

Se preferir fazer manualmente:

```bash
cd /home/seu-usuario/htdocs/seu-dominio.com

# Remover build anterior (evita conflitos)
rm -rf .next

# Fazer pull das mudanças
git pull origin main

# Instalar novas dependências (se houver)
npm install --production

# Fazer novo build
npm run build

# Recriar link simbólico para arquivos estáticos
mkdir -p .next/standalone/.next
rm -f .next/standalone/.next/static
ln -sf ../../static .next/standalone/.next/static

# Reiniciar PM2
pm2 restart nextjs-app

# Verificar logs
pm2 logs nextjs-app --lines 20
```

**Nota:** O link simbólico precisa ser recriado após cada build porque o Next.js gera novos arquivos estáticos com hashes diferentes.

## 🛠️ Comandos Úteis

### Gerenciamento do PM2

```bash
# Ver status
pm2 status

# Ver logs em tempo real
pm2 logs nextjs-app

# Ver logs com limite de linhas
pm2 logs nextjs-app --lines 50

# Reiniciar aplicação
pm2 restart nextjs-app

# Parar aplicação
pm2 stop nextjs-app

# Deletar aplicação
pm2 delete nextjs-app

# Ver uso de recursos
pm2 monit

# Salvar configuração atual
pm2 save
```

### Gerenciamento do Nginx

```bash
# Testar configuração
sudo nginx -t

# Recarregar configuração
sudo systemctl reload nginx

# Reiniciar nginx
sudo systemctl restart nginx

# Ver status
sudo systemctl status nginx

# Ver logs de erro
sudo tail -f /var/log/nginx/error.log

# Ver logs de acesso
sudo tail -f /var/log/nginx/access.log
```

### Verificação de Portas

```bash
# Ver todas as portas em uso
sudo netstat -tulpn | grep LISTEN
sudo ss -tulpn | grep LISTEN

# Verificar porta específica
sudo lsof -i :3000
sudo netstat -tulpn | grep :3000

# Testar se porta está livre
nc -zv localhost 3000
```

## 🐛 Troubleshooting

### Problema: Arquivos estáticos não carregam (404)

**Solução:**
```bash
# Verificar se o link simbólico existe
ls -la .next/standalone/.next/static

# Se não existir, criar:
mkdir -p .next/standalone/.next
ln -sf ../../static .next/standalone/.next/static

# Reiniciar PM2
pm2 restart nextjs-app
```

### Problema: Porta já em uso (EADDRINUSE)

**Solução:**
```bash
# Verificar quem está usando a porta
sudo lsof -i :3000

# Matar processo se necessário
sudo kill -9 <PID>

# Ou usar outra porta no ecosystem.config.js
```

### Problema: Next.js não inicia

**Solução:**
```bash
# Verificar logs
pm2 logs nextjs-app --lines 50

# Verificar se o build foi feito
ls -la .next/standalone/server.js

# Verificar se está no diretório correto
pwd

# Tentar iniciar manualmente para ver erros
node .next/standalone/server.js
```

### Problema: Nginx retorna 502 Bad Gateway

**Solução:**
```bash
# Verificar se o Next.js está rodando
pm2 status

# Verificar se está na porta correta
sudo lsof -i :3000

# Verificar logs do nginx
sudo tail -f /var/log/nginx/error.log

# Testar acesso direto
curl http://localhost:3000
```

### Problema: CSS/JS não carregam após deploy

**Solução:**
1. Limpar cache do navegador (Ctrl+Shift+R)
2. Verificar se o link simbólico existe
3. Verificar logs do PM2 para erros
4. Verificar configuração do nginx

### Problema: Erro no git pull - arquivos da pasta .next causam conflito

**Erro típico:**
```
error: The following untracked working tree files would be overwritten by merge:
        .next/server/app/[lang]/[slug]/page.js
        ...
Please move or remove them before you merge.
```

**Solução:**
```bash
# Remover a pasta .next inteira (será recriada no build)
rm -rf .next

# Fazer pull novamente
git pull origin main

# Executar o script de deploy
chmod +x deploy.sh
./deploy.sh
```

**Prevenção:** Certifique-se de que o `.gitignore` inclui `.next` para evitar este problema no futuro.

## 📝 Checklist de Deploy

### Configuração Inicial
- [ ] Node.js 18+ instalado
- [ ] PM2 instalado globalmente
- [ ] `next.config.js` configurado com `output: 'standalone'`
- [ ] `.gitignore` configurado com `.next` e `out`
- [ ] `ecosystem.config.js` criado e configurado
- [ ] `deploy.sh` criado e configurado
- [ ] Porta verificada e disponível

### Deploy Inicial
- [ ] Projeto clonado/uploadado no servidor
- [ ] `npm install --production` executado
- [ ] `npm run build` executado com sucesso
- [ ] Link simbólico criado: `.next/standalone/.next/static`
- [ ] PM2 iniciado e rodando
- [ ] PM2 configurado para iniciar no boot
- [ ] Nginx configurado como reverse proxy
- [ ] Nginx testado e recarregado
- [ ] Site acessível via HTTPS
- [ ] CSS e JS carregando corretamente
- [ ] Backend funcionando (`/api/*`)

### Deploy Futuro
- [ ] Script `deploy.sh` executável (`chmod +x deploy.sh`)
- [ ] Processo de deploy testado e funcionando

## 🔐 Segurança

### Firewall

```bash
# Permitir portas HTTP e HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Verificar status
sudo ufw status
```

### Variáveis de Ambiente

Para variáveis de ambiente sensíveis, use arquivos `.env` ou configure no CloudPanel:

```bash
# Criar arquivo .env.local (não versionar no Git)
nano .env.local

# Adicionar variáveis
NEXT_PUBLIC_API_URL=https://api.exemplo.com
DATABASE_URL=postgresql://...
```

## 📚 Referências

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Reverse Proxy](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)
- [CloudPanel Documentation](https://www.cloudpanel.io/docs/)

## 📞 Suporte

Em caso de problemas:
1. Verificar logs do PM2: `pm2 logs nextjs-app`
2. Verificar logs do Nginx: `sudo tail -f /var/log/nginx/error.log`
3. Verificar status do PM2: `pm2 status`
4. Testar acesso direto: `curl http://localhost:3000`

---

**Última atualização:** Novembro 2024
**Versão do Next.js:** 15.x
**Ambiente:** VPS Linux com Nginx e CloudPanel

