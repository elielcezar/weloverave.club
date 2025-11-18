import React from 'react'
import PostCard from '@/components/PostCard/PostCard'
import Sidebar from '@/components/Sidebar/Sidebar'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import './MainContent.css'

const postsData = [
  {
    id: 1,
    title: 'Calvin Harris Revela Novo Album "Funk Wav Bounces Vol. 3" para 2024',
    excerpt: 'O DJ escocês Calvin Harris anunciou oficialmente o terceiro volume de sua aclamada série Funk Wav Bounces...',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
    category: 'Lançamentos',
    categoryColor: 'red',
    author: 'Ricardo Silva',
    date: 'Nov 18, 2024',
    comments: 3
  },
  {
    id: 2,
    title: 'Ultra Music Festival Miami 2024: Line-up Completo Revelado',
    excerpt: 'O Ultra Music Festival acaba de divulgar o line-up completo para a edição de 2024, que promete ser histórica...',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80',
    category: 'Festivais',
    categoryColor: 'pink',
    author: 'Maria Santos',
    date: 'Nov 18, 2024',
    comments: 5
  },
  {
    id: 3,
    title: 'David Guetta Anuncia Residência em Ibiza para Temporada 2024',
    excerpt: 'O icônico DJ francês David Guetta confirmou sua residência no Hï Ibiza para mais uma temporada de verão...',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
    category: 'DJs',
    categoryColor: 'blue',
    author: 'João Pedro',
    date: 'Nov 17, 2024',
    comments: 7
  },
  {
    id: 4,
    title: 'Techno Ganha Espaço nas Principais Paradas Musicais Mundiais',
    excerpt: 'Pela primeira vez em décadas, o techno europeu está dominando as paradas de música eletrônica...',
    image: 'https://images.unsplash.com/photo-1571266028243-d220c6c1de29?w=600&q=80',
    category: 'Notícias',
    categoryColor: 'purple',
    author: 'Ana Costa',
    date: 'Nov 17, 2024',
    comments: 4
  }
]

const featuredPosts = [
  {
    id: 5,
    title: 'Remember! Bad Habits That Make a Big Impact on Your Lifestyle',
    date: 'Nov 16, 2024'
  },
  {
    id: 6,
    title: 'The Right Morning Routine Can Keep You Energized & Happy',
    date: 'Nov 16, 2024'
  },
  {
    id: 7,
    title: 'How to Make Perfume Last Longer Than Before',
    date: 'Nov 15, 2024'
  },
  {
    id: 8,
    title: 'Stay off Social Media and Still Keep an Online Social Life',
    date: 'Nov 15, 2024'
  }
]

const MainContent = () => {
  return (
    <main className="main-content">
      <div className="container-wide">
        {/* Small Featured Grid */}
        <section className="small-featured-section">
          <SectionTitle title="Hot News" />
          <div className="small-featured-grid">
            {featuredPosts.map(post => (
              <article key={post.id} className="small-featured-card">
                <img 
                  src={`https://images.unsplash.com/photo-${1470229722913 + post.id}?w=400&q=80`} 
                  alt={post.title}
                  className="small-featured-card__image"
                />
                <div className="small-featured-card__content">
                  <h3 className="small-featured-card__title">{post.title}</h3>
                  <span className="small-featured-card__date">{post.date}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Main Layout: Posts + Sidebar */}
        <div className="content-layout">
          <div className="posts-section">
            <SectionTitle title="Latest in Tech" subtitle="Demo" />
            
            <div className="posts-grid">
              {postsData.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="load-more-container">
              <button className="btn-load-more">Load More</button>
            </div>
          </div>

          <aside className="sidebar-section">
            <Sidebar />
          </aside>
        </div>
      </div>
    </main>
  )
}

export default MainContent

