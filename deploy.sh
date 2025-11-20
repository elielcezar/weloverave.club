#!/bin/bash

# Script de Deploy para Next.js no VPS
# Este script automatiza o processo de deploy após git pull

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Diretório do projeto (ajustar se necessário)
PROJECT_DIR="/home/weloverave/htdocs/weloverave.club"
PM2_APP_NAME="nextjs-app"

echo -e "${YELLOW}🚀 Iniciando deploy...${NC}"

# Navegar para o diretório do projeto
cd "$PROJECT_DIR" || {
    echo -e "${RED}❌ Erro: Não foi possível acessar o diretório $PROJECT_DIR${NC}"
    exit 1
}

echo -e "${GREEN}✓ Diretório: $(pwd)${NC}"

# Fazer pull do Git
echo -e "${YELLOW}📥 Fazendo pull do Git...${NC}"
git pull origin main || {
    echo -e "${RED}❌ Erro ao fazer pull do Git${NC}"
    exit 1
}
echo -e "${GREEN}✓ Git pull concluído${NC}"

# Instalar dependências
echo -e "${YELLOW}📦 Instalando dependências...${NC}"
npm install --production || {
    echo -e "${RED}❌ Erro ao instalar dependências${NC}"
    exit 1
}
echo -e "${GREEN}✓ Dependências instaladas${NC}"

# Fazer build
echo -e "${YELLOW}🔨 Fazendo build do projeto...${NC}"
npm run build || {
    echo -e "${RED}❌ Erro ao fazer build${NC}"
    exit 1
}
echo -e "${GREEN}✓ Build concluído${NC}"

# Recriar link simbólico para arquivos estáticos
echo -e "${YELLOW}🔗 Recriando link simbólico para arquivos estáticos...${NC}"
mkdir -p .next/standalone/.next
rm -f .next/standalone/.next/static
ln -sf ../../static .next/standalone/.next/static

# Verificar se o link foi criado
if [ -L ".next/standalone/.next/static" ]; then
    echo -e "${GREEN}✓ Link simbólico criado com sucesso${NC}"
else
    echo -e "${RED}❌ Erro ao criar link simbólico${NC}"
    exit 1
fi

# Reiniciar PM2
echo -e "${YELLOW}🔄 Reiniciando PM2...${NC}"
pm2 restart "$PM2_APP_NAME" || {
    echo -e "${RED}❌ Erro ao reiniciar PM2${NC}"
    exit 1
}
echo -e "${GREEN}✓ PM2 reiniciado${NC}"

# Verificar status
echo -e "${YELLOW}📊 Status do PM2:${NC}"
pm2 status "$PM2_APP_NAME"

echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
echo -e "${YELLOW}📋 Últimas linhas dos logs:${NC}"
pm2 logs "$PM2_APP_NAME" --lines 10 --nostream

