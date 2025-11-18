# 🎨 Guia Rápido de Customização

## Como Personalizar o EDM News

---

## 🎨 Alterar Cores do Site

Edite o arquivo `src/index.css`:

```css
:root {
  /* Cor principal (botões, links, destaques) */
  --primary-color: #00d9a5;  /* Altere aqui */
  
  /* Cor secundária (hover em botões) */
  --secondary-color: #00bfa5;  /* Altere aqui */
  
  /* Background escuro (header/footer) */
  --dark-bg: #0a0a0a;
  
  /* Cores das tags de categoria */
  --purple-tag: #9146ff;
  --red-tag: #ff4757;
  --blue-tag: #3742fa;
  --pink-tag: #ff6b9d;
}
```

---

## 📝 Alterar Logo e Nome do Site

### Logo no Header

Edite `src/components/Header/Header.jsx`:

```jsx
<div className="logo-section">
  <div className="logo-subtitle">SEU TEXTO</div>
  <div className="logo-main">SEU LOGO</div>
  <div className="logo-tagline">Seu slogan</div>
</div>
```

### Logo no Footer

Edite `src/components/Footer/Footer.jsx`:

```jsx
<div className="footer-logo-text">SEU LOGO</div>
```

---

## 🔗 Adicionar/Remover Itens do Menu

Edite `src/components/Header/Header.jsx`:

```jsx
<nav className="main-nav">
  <ul className="nav-list">
    <li className="nav-item">
      <a href="#" className="nav-link">Novo Item</a>
    </li>
    {/* Adicione mais items aqui */}
  </ul>
</nav>
```

Para adicionar submenu (dropdown):

```jsx
<li className="nav-item dropdown">
  <a href="#" className="nav-link">
    Item com Dropdown <span className="arrow">▼</span>
  </a>
  <ul className="dropdown-menu">
    <li><a href="#">Subitem 1</a></li>
    <li><a href="#">Subitem 2</a></li>
  </ul>
</li>
```

---

## 📰 Adicionar Mais Posts

### Opção 1: Editar Mock Data

Edite `src/data/mockData.js` e adicione novos posts:

```javascript
export const latestPosts = [
  {
    id: 999,
    title: 'Seu Título Aqui',
    excerpt: 'Resumo do post...',
    image: 'URL_DA_IMAGEM',
    category: 'Categoria',
    categoryColor: 'blue', // purple, pink, red, blue
    author: 'Nome do Autor',
    date: 'Nov 18, 2024',
    comments: 5
  },
  // ... mais posts
]
```

### Opção 2: Integrar com API

Substitua os dados estáticos por fetch de API:

```javascript
// Em MainContent.jsx
const [posts, setPosts] = useState([])

useEffect(() => {
  fetch('https://sua-api.com/posts')
    .then(res => res.json())
    .then(data => setPosts(data))
}, [])
```

---

## 🖼️ Alterar Imagens

### Usar suas próprias imagens:

1. Crie uma pasta `src/assets/images/`
2. Adicione suas imagens
3. Importe e use:

```jsx
import minhaImagem from '../assets/images/foto.jpg'

<img src={minhaImagem} alt="Descrição" />
```

### Ou use URLs externas:

```jsx
<img src="https://seusite.com/imagem.jpg" alt="Descrição" />
```

---

## 📱 Alterar Redes Sociais

### TopBar (Header)

Edite `src/components/Header/TopBar.jsx`:

```jsx
<div className="social-icons">
  <a href="https://facebook.com/seuperfil">
    <FaFacebookF />
  </a>
  {/* Adicione mais redes */}
</div>
```

### Sidebar - Estatísticas

Edite `src/components/Sidebar/Sidebar.jsx`:

```jsx
<a href="URL_DA_SUA_PAGINA" className="social-stat social-stat--facebook">
  <FaFacebookF />
  <div className="social-stat__info">
    <span className="social-stat__count">SUA_CONTAGEM</span>
    <span className="social-stat__label">Seguidores</span>
  </div>
</a>
```

### Footer

Edite `src/components/Footer/Footer.jsx`:

```jsx
<div className="footer-social">
  <a href="URL">
    <FaFacebookF />
  </a>
  {/* Mais ícones */}
</div>
```

---

## ✉️ Configurar Newsletter

Edite `src/components/Sidebar/Sidebar.jsx`:

```jsx
<form className="newsletter-form" onSubmit={handleSubmit}>
  <input 
    type="email" 
    placeholder="Seu email..." 
  />
  <button type="submit">Inscrever-se</button>
</form>
```

Adicione função de envio:

```javascript
const handleSubmit = (e) => {
  e.preventDefault()
  const email = e.target.elements[0].value
  
  // Enviar para seu serviço de newsletter
  fetch('https://sua-api.com/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email })
  })
}
```

---

## 🔍 Implementar Busca Funcional

Edite `src/components/Header/Header.jsx`:

```jsx
const [searchQuery, setSearchQuery] = useState('')

const handleSearch = (e) => {
  if (e.key === 'Enter') {
    // Redirecionar para página de resultados
    window.location.href = `/busca?q=${searchQuery}`
    
    // Ou filtrar posts localmente
    const results = posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }
}

<input 
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyPress={handleSearch}
/>
```

---

## 📏 Ajustar Layout e Espaçamentos

### Largura Máxima do Site

Edite `src/index.css`:

```css
.container-wide {
  max-width: 1400px; /* Altere aqui */
  margin: 0 auto;
  padding: 0 20px;
}
```

### Espaçamentos entre Seções

Edite os arquivos CSS dos componentes:

```css
.main-content {
  padding: 40px 0 60px; /* top/bottom */
}

.hero-section {
  padding: 30px 0; /* Altere conforme necessário */
}
```

---

## 🎯 Adicionar Rating/Avaliação nos Posts

Edite `src/components/PostCard/PostCard.jsx`:

```jsx
const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      {/* ... conteúdo existente ... */}
      
      {post.rating && (
        <div className="post-rating">
          <span className="rating-value">{post.rating}</span>
        </div>
      )}
    </article>
  )
}
```

Adicione CSS em `PostCard.css`:

```css
.post-rating {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--primary-color);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 18px;
}
```

---

## 🌙 Adicionar Modo Escuro

1. Adicione variáveis de tema escuro em `index.css`:

```css
[data-theme="dark"] {
  --light-bg: #1a1a1a;
  --gray-bg: #0f0f0f;
  --text-dark: #ffffff;
  --text-light: #b0b0b0;
  --border-color: #333333;
}
```

2. Adicione toggle no Header:

```jsx
const [theme, setTheme] = useState('light')

const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
  document.documentElement.setAttribute('data-theme', newTheme)
}

<button onClick={toggleTheme}>
  {theme === 'light' ? '🌙' : '☀️'}
</button>
```

---

## 📧 Informações de Contato

Edite `src/components/Footer/Footer.jsx`:

```jsx
<p className="footer-text">
  <strong>Email:</strong> seu@email.com<br />
  <strong>Telefone:</strong> +55 11 9999-9999<br />
  <strong>Endereço:</strong> Sua Rua, 123
</p>
```

---

## 🎬 Adicionar Vídeos nos Posts

```jsx
// Em PostCard.jsx
{post.videoUrl && (
  <div className="post-video">
    <iframe
      width="100%"
      height="315"
      src={post.videoUrl}
      frameBorder="0"
      allowFullScreen
    />
  </div>
)}
```

---

## 📊 Integrar Google Analytics

Adicione no `index.html`:

```html
<head>
  <!-- ... outros tags ... -->
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=SEU-ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'SEU-ID');
  </script>
</head>
```

---

## 🚀 Deploy do Site

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Faça upload da pasta 'dist' no Netlify
```

### GitHub Pages

```bash
npm run build
# Configure o repositório GitHub
```

---

## 💡 Dicas Finais

1. **Sempre teste** as mudanças em diferentes tamanhos de tela
2. **Use imagens otimizadas** (WebP, compressão)
3. **Mantenha a consistência** visual em todo o site
4. **Comente seu código** para facilitar manutenção futura
5. **Use Git** para controle de versão

---

**Dúvidas?** Consulte o `README.md` e `INSTRUCOES.md`

**Bom desenvolvimento! 🎉**

