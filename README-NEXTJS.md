# EDM News - Next.js 15 ✨

Portal de notícias sobre música eletrônica construído com **Next.js 15**, usando **App Router** e **React Server Components**.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **React 18** - Biblioteca JavaScript
- **React Icons** - Ícones
- **CSS Modules** - Estilização

## 📁 Estrutura do Projeto

```
EDM News/
├── app/
│   ├── layout.jsx           # Layout principal
│   ├── page.jsx             # Home page
│   ├── globals.css          # Estilos globais
│   └── posts/
│       ├── page.jsx         # Página de listagem de posts
│       ├── posts.css        # Estilos da listagem
│       └── [id]/
│           ├── page.jsx     # Página individual do post
│           └── post.css     # Estilos do post
├── components/
│   ├── Header/              # Componentes do cabeçalho
│   ├── Hero/                # Hero section
│   ├── MainContent/         # Conteúdo principal
│   ├── PostCard/            # Card de post
│   ├── Sidebar/             # Barra lateral
│   ├── SectionTitle/        # Título de seção
│   └── Footer/              # Rodapé
├── data/
│   └── postsData.js         # Base de dados de posts
├── public/                  # Arquivos estáticos
├── next.config.js           # Configuração do Next.js
└── package.json
```

## 🎯 Páginas Criadas

### 1. Home (`/`)
- Hero section com grid de posts destacados
- Hot news (4 cards pequenos)
- Latest posts com sidebar
- Totalmente responsivo

### 2. Listagem de Posts (`/posts`)
- **Página interna com lista completa de posts**
- Hero com título e descrição
- Cards horizontais com imagem, categoria, tags
- Metadata do post (autor, data, comentários)
- Paginação
- Sidebar com widgets
- Design limpo e profissional

### 3. Post Individual (`/posts/[id]`)
- **Página de post completo com layout profissional**
- Hero image full-width
- Breadcrumb navigation
- Informações do autor com foto
- Conteúdo completo do post (HTML renderizado)
- Tags do post
- Botões de compartilhamento social
- Bio do autor
- Seção de comentários
- Sidebar com:
  - Posts relacionados
  - Newsletter
  - Tags populares
- Design elegante e legível

## 🚀 Como Executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar em desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

### 3. Build para produção

```bash
npm run build
npm start
```

## 📱 Rotas Disponíveis

- `/` - Home page
- `/posts` - Listagem de todos os posts
- `/posts/1` - Post individual (ID 1)
- `/posts/2` - Post individual (ID 2)
- ... (todos os posts de 1 a 6)

## 🎨 Recursos Implementados

### Pages

✅ **Home Page**
- Hero section com 4 posts em destaque
- Hot news section
- Latest posts com sidebar
- Totalmente responsivo

✅ **Posts Listing Page (`/posts`)**
- Hero com título da página
- Lista completa de posts
- Cards horizontais com:
  - Imagem featured
  - Categoria colorida
  - Título e excerpt
  - Metadata (autor, data, comentários)
  - Tags do post
- Paginação funcional
- Sidebar fixa
- Layout responsivo

✅ **Single Post Page (`/posts/[id]`)**
- Hero image full-width com overlay
- Breadcrumb navigation
- Header do post com:
  - Categoria
  - Título principal
  - Info do autor com avatar
  - Tempo de leitura
  - Número de comentários
- Conteúdo HTML completo
- Tags interativas
- Social sharing buttons
- Bio do autor expandida
- Sistema de comentários
- Sidebar com:
  - Posts relacionados (mesma categoria)
  - Newsletter signup
  - Tags populares
- SEO otimizado com metadata dinâmica

### Componentes

✅ **Header** - Navegação com dropdowns e busca
✅ **TopBar** - Redes sociais e botões de ação
✅ **Hero** - Grid de posts destacados
✅ **PostCard** - Card reutilizável de post
✅ **Sidebar** - Widgets modulares
✅ **Footer** - Footer completo com links
✅ **SectionTitle** - Título de seção estilizado

### Features Next.js

✅ **App Router** - Estrutura moderna de rotas
✅ **Dynamic Routes** - `/posts/[id]` para posts dinâmicos
✅ **Server Components** - Renderização no servidor
✅ **Client Components** - Interatividade onde necessário
✅ **Metadata API** - SEO otimizado
✅ **Image Optimization** - Suporte a next/image
✅ **CSS Modules** - Estilos isolados por componente

## 📊 Base de Dados

Os posts estão em `data/postsData.js` com funções úteis:

```javascript
// Importar
import { getAllPosts, getPostById, getPostBySlug, getRelatedPosts } from '@/data/postsData'

// Usar
const posts = getAllPosts()              // Todos os posts
const post = getPostById(1)              // Post por ID
const post = getPostBySlug('slug-here')  // Post por slug
const related = getRelatedPosts(1, 3)    // Posts relacionados
```

Cada post contém:
- `id` - ID único
- `slug` - URL amigável
- `title` - Título
- `excerpt` - Resumo
- `content` - Conteúdo HTML completo
- `image` - Imagem featured
- `category` - Categoria
- `categoryColor` - Cor da categoria (purple, pink, blue, red)
- `author` - Nome do autor
- `authorImage` - Foto do autor
- `date` - Data de publicação
- `readTime` - Tempo de leitura
- `comments` - Número de comentários
- `tags` - Array de tags

## 🎨 Customização

### Alterar Cores

Edite `app/globals.css`:

```css
:root {
  --primary-color: #00d9a5;     /* Verde/Turquesa */
  --secondary-color: #00bfa5;   /* Verde escuro */
  --purple-tag: #9146ff;
  --red-tag: #ff4757;
  --blue-tag: #3742fa;
  --pink-tag: #ff6b9d;
}
```

### Adicionar Novo Post

Edite `data/postsData.js` e adicione ao array `allPosts`:

```javascript
{
  id: 7,
  slug: 'meu-novo-post',
  title: 'Meu Novo Post',
  excerpt: 'Resumo do post...',
  content: `<p>Conteúdo HTML...</p>`,
  image: 'URL_DA_IMAGEM',
  category: 'Categoria',
  categoryColor: 'blue',
  author: 'Seu Nome',
  authorImage: 'URL_FOTO',
  date: 'Nov 18, 2024',
  readTime: '5 min',
  comments: 0,
  tags: ['Tag1', 'Tag2']
}
```

### Criar Nova Página

```bash
# Criar pasta na app/
mkdir app/nova-pagina

# Criar page.jsx
touch app/nova-pagina/page.jsx
```

```jsx
// app/nova-pagina/page.jsx
export const metadata = {
  title: 'Nova Página | EDM News',
}

export default function NovaPagina() {
  return (
    <main>
      <h1>Nova Página</h1>
    </main>
  )
}
```

## 🔗 Links Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

## 📦 Scripts

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm start        # Executar produção
npm run lint     # Verificar código
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload da pasta .next
```

## ✅ Checklist de Qualidade

- ✅ Design fiel ao SmartMag GoodNews
- ✅ App Router do Next.js 15
- ✅ Server Components otimizados
- ✅ Rotas dinâmicas funcionais
- ✅ Página de listagem completa
- ✅ Página de post individual profissional
- ✅ SEO otimizado com metadata
- ✅ Responsivo em todos os tamanhos
- ✅ Performance otimizada
- ✅ Código limpo e organizado

## 🎉 Pronto para Usar!

O projeto está 100% funcional com:
- ✅ Home page
- ✅ Página de listagem de posts (`/posts`)
- ✅ Página individual de post (`/posts/[id]`)
- ✅ Todos os componentes convertidos para Next.js
- ✅ Roteamento dinâmico funcionando
- ✅ Base de dados de exemplo com 6 posts completos

**Desenvolvido com ❤️ usando Next.js 15 + React 18**

