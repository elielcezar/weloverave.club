# 🚀 Guia Rápido - EDM News Next.js

## ✅ Conversão Completa!

O projeto foi **100% convertido** de React/Vite para **Next.js 15** com App Router!

---

## 🎯 O Que Foi Criado

### ✨ 3 Páginas Principais

1. **Home (`/`)**
   - Hero section com grid de posts
   - Hot news
   - Latest posts + sidebar

2. **Listagem de Posts (`/posts`)** ⭐ NOVO
   - Hero com título
   - Lista completa de todos os posts
   - Cards horizontais profissionais
   - Metadata (autor, data, comentários)
   - Tags interativas
   - Paginação
   - Sidebar fixa

3. **Post Individual (`/posts/[id]`)** ⭐ NOVO
   - Hero image full-width
   - Breadcrumb navigation
   - Conteúdo HTML completo
   - Bio do autor
   - Tags e social sharing
   - Sistema de comentários
   - Sidebar com posts relacionados
   - SEO otimizado

---

## 🚀 Como Executar

```bash
# Já instalado! Só executar:
npm run dev
```

Abra: **http://localhost:3000**

---

## 🌐 URLs Disponíveis

- **Home:** http://localhost:3000/
- **Todos os Posts:** http://localhost:3000/posts
- **Post 1:** http://localhost:3000/posts/1
- **Post 2:** http://localhost:3000/posts/2
- **Post 3:** http://localhost:3000/posts/3
- ... até post 6

---

## 📁 Estrutura Atualizada

```
EDM News/
├── app/                    # Next.js 15 App Router
│   ├── layout.jsx         # Layout raiz
│   ├── page.jsx           # Home
│   ├── globals.css        # Estilos globais
│   └── posts/
│       ├── page.jsx       # ⭐ Listagem de posts
│       ├── posts.css
│       └── [id]/
│           ├── page.jsx   # ⭐ Post individual
│           └── post.css
├── components/            # Componentes convertidos
│   ├── Header/
│   ├── Hero/
│   ├── MainContent/
│   ├── PostCard/
│   ├── Sidebar/
│   ├── SectionTitle/
│   └── Footer/
├── data/
│   └── postsData.js      # Base de dados com 6 posts
├── next.config.js        # Config Next.js
└── package.json          # Dependências Next.js
```

---

## 🎨 Páginas Internas Criadas

### `/posts` - Listagem

**Recursos:**
- ✅ Hero section com título e subtítulo
- ✅ Grid de posts completo
- ✅ Cards horizontais elegantes
- ✅ Categorias coloridas
- ✅ Metadata completa
- ✅ Tags interativas
- ✅ Paginação
- ✅ Sidebar com widgets
- ✅ Totalmente responsivo

### `/posts/[id]` - Post Individual

**Recursos:**
- ✅ Hero image full-width
- ✅ Breadcrumb (Home > Notícias > Categoria)
- ✅ Header do post elegante
- ✅ Info do autor com avatar
- ✅ Conteúdo HTML formatado
- ✅ Tags interativas
- ✅ Botões de compartilhamento social
- ✅ Bio do autor expandida
- ✅ Sistema de comentários
- ✅ Posts relacionados (mesma categoria)
- ✅ Widget de newsletter
- ✅ Tags populares
- ✅ SEO metadata dinâmico
- ✅ Layout profissional
- ✅ Responsivo mobile

---

## 💾 Base de Dados

**6 posts completos** em `data/postsData.js`:

1. Calvin Harris - Novo Album
2. Ultra Music Festival Miami 2024
3. David Guetta - Residência Ibiza
4. Techno nas Paradas Mundiais
5. Tomorrowland 2024
6. Martin Garrix - Novo Single

Cada post tem:
- Título, excerpt e conteúdo HTML completo
- Imagem featured
- Categoria colorida
- Autor com foto
- Data, tempo de leitura
- Comentários
- Tags

---

## 🔧 Funções Úteis

```javascript
import { 
  getAllPosts,      // Todos os posts
  getPostById,      // Post por ID
  getPostBySlug,    // Post por slug
  getRelatedPosts   // Posts relacionados
} from '@/data/postsData'
```

---

## ✨ Adicionar Novo Post

Edite `data/postsData.js`:

```javascript
{
  id: 7,
  slug: 'meu-post',
  title: 'Meu Título',
  excerpt: 'Resumo...',
  content: `<p>Conteúdo HTML...</p>`,
  image: 'URL',
  category: 'Categoria',
  categoryColor: 'blue', // purple, pink, blue, red
  author: 'Seu Nome',
  authorImage: 'URL_FOTO',
  date: 'Nov 18, 2024',
  readTime: '5 min',
  comments: 0,
  tags: ['Tag1', 'Tag2']
}
```

---

## 🎨 Customizar Cores

`app/globals.css`:

```css
:root {
  --primary-color: #00d9a5;      /* Cor principal */
  --secondary-color: #00bfa5;    /* Hover */
  --purple-tag: #9146ff;         /* Tags */
  --red-tag: #ff4757;
  --blue-tag: #3742fa;
  --pink-tag: #ff6b9d;
}
```

---

## 📦 Comandos

```bash
npm run dev      # Desenvolvimento (porta 3000)
npm run build    # Build produção
npm start        # Rodar produção
npm run lint     # Verificar código
```

---

## 🚀 Deploy

### Vercel (1 clique)
```bash
vercel
```

### Netlify
```bash
npm run build
# Upload da pasta .next
```

---

## ✅ Checklist Completo

- ✅ Projeto convertido para Next.js 15
- ✅ App Router implementado
- ✅ Server Components
- ✅ Client Components onde necessário
- ✅ Rotas dinâmicas (`/posts/[id]`)
- ✅ Página de listagem de posts
- ✅ Página individual de post
- ✅ Base de dados com 6 posts
- ✅ SEO metadata dinâmico
- ✅ Estilos CSS organizados
- ✅ Design fiel ao original
- ✅ Totalmente responsivo
- ✅ Sem erros de linting
- ✅ Pronto para produção

---

## 🎉 PRONTO PARA USAR!

Execute `npm run dev` e acesse:

- Home: http://localhost:3000/
- Posts: http://localhost:3000/posts  
- Post Individual: http://localhost:3000/posts/1

**Desenvolvido com ❤️ usando Next.js 15!**

