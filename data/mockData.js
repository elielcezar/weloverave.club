// Mock data para posts, categorias e outros conteúdos
// Use este arquivo para adicionar mais conteúdo ao site facilmente

export const categories = [
  { id: 1, name: 'Festivais', slug: 'festivais', color: 'pink' },
  { id: 2, name: 'DJs', slug: 'djs', color: 'blue' },
  { id: 3, name: 'Lançamentos', slug: 'lancamentos', color: 'red' },
  { id: 4, name: 'Reviews', slug: 'reviews', color: 'purple' },
  { id: 5, name: 'Notícias', slug: 'noticias', color: 'purple' },
]

export const heroFeaturedPosts = [
  {
    id: 1,
    title: 'Tomorrowland 2024: Line-up Completo Revelado com Surpresas',
    excerpt: 'O maior festival de música eletrônica do mundo anuncia lineup histórico',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
    category: 'Festivais',
    categoryColor: 'pink',
    author: 'Maria Santos',
    date: 'Nov 18, 2024',
    comments: 12,
    featured: true
  },
  {
    id: 2,
    title: 'Martin Garrix Anuncia Residência em Las Vegas',
    excerpt: 'DJ holandês confirma série de shows na cidade do entretenimento',
    image: 'https://images.unsplash.com/photo-1571266028243-d220c6c1de29?w=800&q=80',
    category: 'DJs',
    categoryColor: 'blue',
    author: 'João Pedro',
    date: 'Nov 18, 2024',
    comments: 8
  },
  {
    id: 3,
    title: 'Calvin Harris Revela Novo Album "Funk Wav Bounces Vol. 3"',
    excerpt: 'Terceiro volume da série promete colaborações explosivas',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    category: 'Lançamentos',
    categoryColor: 'red',
    author: 'Ricardo Silva',
    date: 'Nov 17, 2024',
    comments: 15
  },
  {
    id: 4,
    title: 'Techno em Alta: Gênero Domina Paradas Mundiais',
    excerpt: 'Análise do crescimento exponencial do techno europeu',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
    category: 'Notícias',
    categoryColor: 'purple',
    author: 'Ana Costa',
    date: 'Nov 17, 2024',
    comments: 6
  }
]

export const latestPosts = [
  {
    id: 5,
    title: 'David Guetta Lança Novo Single em Parceria com Bebe Rexha',
    excerpt: 'A dupla volta a trabalhar junta após o sucesso de "I\'m Good (Blue)"...',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
    category: 'Lançamentos',
    categoryColor: 'red',
    author: 'Paula Mendes',
    date: 'Nov 18, 2024',
    comments: 9
  },
  {
    id: 6,
    title: 'Ultra Music Festival Miami 2024: Tudo o Que Você Precisa Saber',
    excerpt: 'Guia completo com dicas, line-up e informações sobre ingressos...',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80',
    category: 'Festivais',
    categoryColor: 'pink',
    author: 'Carlos Eduardo',
    date: 'Nov 18, 2024',
    comments: 22
  },
  {
    id: 7,
    title: 'The Chainsmokers Revelam Bastidores de Nova Turnê Mundial',
    excerpt: 'Duo americano compartilha detalhes exclusivos sobre produção do show...',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80',
    category: 'DJs',
    categoryColor: 'blue',
    author: 'Juliana Souza',
    date: 'Nov 17, 2024',
    comments: 11
  },
  {
    id: 8,
    title: 'Review: Novo Album de Amelie Lens Define Futuro do Techno',
    excerpt: 'DJ belga entrega obra-prima que redefine os limites do gênero...',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    category: 'Reviews',
    categoryColor: 'purple',
    author: 'Roberto Lima',
    date: 'Nov 17, 2024',
    comments: 7,
    rating: 9.2
  },
  {
    id: 9,
    title: 'Ibiza 2024: Guia Completo das Melhores Festas da Temporada',
    excerpt: 'Descubra os eventos imperdíveis da ilha branca nesta temporada...',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80',
    category: 'Festivais',
    categoryColor: 'pink',
    author: 'Fernanda Costa',
    date: 'Nov 16, 2024',
    comments: 18
  },
  {
    id: 10,
    title: 'Como Produzir Progressive House: Tutorial Completo',
    excerpt: 'Aprenda técnicas profissionais dos melhores produtores do gênero...',
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600&q=80',
    category: 'Tutoriais',
    categoryColor: 'blue',
    author: 'Marcos Vieira',
    date: 'Nov 16, 2024',
    comments: 31
  }
]

export const sidebarTrendingPosts = [
  {
    id: 11,
    title: 'Top 10: DJs Mais Tocados nas Rádios em 2024',
    image: 'https://images.unsplash.com/photo-1574267432644-f9e90e96b6bb?w=300&q=80',
    date: 'Nov 18, 2024'
  },
  {
    id: 12,
    title: 'Swedish House Mafia: Retorno Triunfal aos Palcos',
    image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=300&q=80',
    date: 'Nov 17, 2024'
  },
  {
    id: 13,
    title: 'Novos Talentos do House Music para Ficar de Olho',
    image: 'https://images.unsplash.com/photo-1571266028243-d220c6c1de29?w=300&q=80',
    date: 'Nov 17, 2024'
  }
]

export const socialMediaStats = [
  { platform: 'Facebook', icon: 'FaFacebookF', count: '12.5K', label: 'Curtidas', color: '#3b5998' },
  { platform: 'Twitter', icon: 'FaTwitter', count: '89.2K', label: 'Seguidores', color: '#1da1f2' },
  { platform: 'Pinterest', icon: 'FaPinterest', count: '15.3K', label: 'Seguidores', color: '#e60023' },
  { platform: 'Instagram', icon: 'FaInstagram', count: '156K', label: 'Seguidores', color: '#e4405f' },
  { platform: 'YouTube', icon: 'FaYoutube', count: '245K', label: 'Inscritos', color: '#ff0000' },
  { platform: 'Vimeo', icon: 'FaVimeoV', count: '23.8K', label: 'Seguidores', color: '#1ab7ea' }
]

export const footerPopularPosts = [
  {
    id: 14,
    title: 'Calvin Harris Anuncia Novo Album para 2024',
    date: 'Nov 18, 2024'
  },
  {
    id: 15,
    title: 'Tomorrowland Revela Line-up Completo',
    date: 'Nov 17, 2024'
  },
  {
    id: 16,
    title: 'Guia Completo: Como Produzir House Music',
    date: 'Nov 16, 2024'
  }
]

export const menuItems = [
  { id: 1, label: 'Home', link: '/' },
  {
    id: 2,
    label: 'Gêneros',
    link: '/generos',
    submenu: [
      { label: 'House', link: '/generos/house' },
      { label: 'Techno', link: '/generos/techno' },
      { label: 'Trance', link: '/generos/trance' },
      { label: 'Dubstep', link: '/generos/dubstep' },
      { label: 'Drum & Bass', link: '/generos/drum-bass' }
    ]
  },
  { id: 3, label: 'Festivais', link: '/festivais' },
  { id: 4, label: 'DJs', link: '/djs' },
  { id: 5, label: 'Lançamentos', link: '/lancamentos' },
  { id: 6, label: 'Reviews', link: '/reviews' },
  { id: 7, label: 'Contato', link: '/contato' }
]

