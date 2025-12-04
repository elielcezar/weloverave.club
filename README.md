# WeLoveRave - Portal de Notícias sobre Música Eletrônica

Um site moderno e responsivo sobre música eletrônica, construído com **Next.js 15**. 

## 🎵 Características

- ✨ Design moderno inspirado no SmartMag GoodNews
- 🌍 **Multilíngue** (Português, English, Español) com tradução completa de URLs
- 📱 Totalmente responsivo para todos os dispositivos
- 🎯 Hero section com grid de posts destacados
- 📰 Cards de posts com imagens, categorias e metadados
- 🔧 Sidebar com widgets (posts em destaque, redes sociais, newsletter)
- 🌙 Header sticky com menu dinâmico
- ⚡ Performance otimizada com Next.js e Server Components

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

```bash
npm install
npm run dev
```

Abra o navegador em `http://localhost:3000`

## 📦 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm start` - Servidor de produção
- `npm run lint` - Verificação de linting

## 🏗️ Estrutura do Projeto

```
weloverave.club/
├── app/
│   ├── [lang]/                 # Rotas internacionalizadas
│   │   ├── [slug]/            # Páginas de posts
│   │   ├── category/[slug]/   # Páginas de categorias
│   │   └── page.jsx           # Home por idioma
│   ├── api/
│   │   ├── categorias/        # API de categorias
│   │   └── translate-slug/    # API de tradução de slugs
│   ├── posts/                 # Posts (legacy)
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx               # Home (EN)
├── components/
│   ├── Header/                # Header com menu dinâmico
│   ├── Footer/
│   ├── Hero/
│   ├── LanguageSelector/      # Seletor de idiomas
│   ├── MainContent/
│   ├── Sidebar/
│   └── ...
├── contexts/
│   └── LanguageContext.jsx    # Contexto de idiomas
├── locales/                   # Arquivos de tradução
│   ├── en.json
│   ├── pt.json
│   └── es.json
├── services/
│   └── api.js                 # Integração com CMS
├── utils/
│   └── translations.js        # Utilitários de tradução
└── DOCS/
    └── DEPLOY.md              # Guia de deploy
```

## 🌍 Estrutura de URLs

| Tipo | Português | English | Español |
|------|-----------|---------|---------|
| Home | `/pt` | `/en` ou `/` | `/es` |
| Categoria | `/pt/category/eventos` | `/en/category/events` | `/es/category/eventos` |
| Post | `/pt/titulo-do-post` | `/en/post-title` | `/es/titulo-del-post` |

### Tradução Automática de URLs

Ao trocar de idioma:
- URLs de categorias são traduzidas automaticamente
- Slugs de posts são traduzidos para o idioma selecionado
- A posição de scroll é mantida

## 🔧 Tecnologias

- **Next.js 15** - Framework React com App Router
- **React 18** - Biblioteca JavaScript
- **React Icons** - Ícones
- **CSS3** - Estilização

## 🌐 Integração com CMS

O site consome APIs externas do CMS:
- `https://cms.ecwd.cloud/api/posts` - Posts
- `https://cms.ecwd.cloud/api/categorias` - Categorias

## 📄 Deploy

Consulte o guia completo em [DOCS/DEPLOY.md](./DOCS/DEPLOY.md)

```bash
# Deploy rápido
./deploy.sh
```

## 📄 Licença

Este projeto é um template educacional.
