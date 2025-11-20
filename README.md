# EDM News - Portal de Notícias sobre Música Eletrônica

Um site moderno e responsivo sobre música eletrônica, construído com **Next.js 15**. Design inspirado no SmartMag GoodNews, adaptado para o universo EDM.

## 🎵 Características

- ✨ Design moderno e limpo seguindo fielmente o layout SmartMag GoodNews
- 🎨 Esquema de cores verde/turquesa (#00D9A5) com destaques coloridos
- 📱 Totalmente responsivo para todos os dispositivos
- 🎯 Hero section com grid de posts destacados
- 📰 Cards de posts com imagens, categorias e metadados
- 🔧 Sidebar com widgets (posts em destaque, redes sociais, newsletter)
- 🌙 Header sticky com menu dropdown
- ⚡ Performance otimizada com Next.js e Server Components
- 🎨 Animações e transições suaves

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js (versão 18 ou superior recomendada)
- npm ou yarn

### Instalação

1. Clone o repositório (ou navegue até a pasta do projeto)

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra o navegador em `http://localhost:3000`

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção otimizada
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa a verificação de linting

## 🏗️ Estrutura do Projeto

```
EDM News/
├── app/                    # App Router (Páginas e Layouts)
│   ├── posts/             # Rotas de posts
│   ├── globals.css        # Estilos globais
│   ├── layout.jsx         # Layout principal (Root Layout)
│   └── page.jsx           # Página inicial
├── components/             # Componentes Reutilizáveis
│   ├── Footer/
│   ├── Header/
│   ├── Hero/
│   ├── MainContent/
│   ├── PostCard/
│   ├── SectionTitle/
│   └── Sidebar/
├── data/                   # Dados mockados (JSON)
├── public/                 # Arquivos estáticos
├── services/               # Serviços de dados
├── package.json
└── README.md
```

## 🎨 Paleta de Cores

- **Primary Color:** #00D9A5 (Verde/Turquesa)
- **Secondary Color:** #00BFA5 (Verde escuro)
- **Dark Background:** #0A0A0A (Preto)
- **Text Dark:** #2C2C2C
- **Text Light:** #666666
- **Purple Tag:** #9146FF
- **Red Tag:** #FF4757
- **Blue Tag:** #3742FA
- **Pink Tag:** #FF6B9D

## 📱 Responsividade

O site é totalmente responsivo com breakpoints em:
- Mobile: < 640px
- Tablet: 768px
- Desktop: 1024px+

## 🔧 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **React 18** - Biblioteca JavaScript para interfaces
- **React Icons** - Biblioteca de ícones
- **CSS3** - Estilização com variáveis CSS e Flexbox/Grid

## ✨ Funcionalidades Implementadas

### Header
- Logo centralizado com tagline
- Menu de navegação com dropdowns
- Botões de Subscribe e Login
- Barra de busca expansível
- Menu mobile responsivo

### Hero Section
- Grid de 4 posts em destaque
- Imagens com overlay gradiente
- Tags de categoria coloridas
- Efeitos hover suaves

### Posts
- Cards com imagens horizontais
- Metadados (autor, data, comentários)
- Categorias coloridas
- Botão "Load More"

### Sidebar
- Posts em destaque
- Widget de redes sociais com estatísticas
- Posts recentes
- Newsletter com formulário

### Footer
- Grid com 4 colunas
- Links rápidos
- Posts populares
- Redes sociais
- Copyright e navegação inferior

## 🎯 Próximos Passos

- [ ] Integração com API backend real
- [ ] Sistema de busca funcional
- [ ] Paginação de posts via Server Actions
- [ ] Sistema de comentários
- [ ] Modo escuro/claro
- [ ] Filtros por categoria
- [ ] Player de música integrado

## 📄 Licença

Este projeto é um template educacional inspirado no SmartMag GoodNews.

## 👨‍💻 Desenvolvido com ❤️ usando Next.js
