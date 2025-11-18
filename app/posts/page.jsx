import React from 'react'
import Link from 'next/link'
import { getAllPosts } from '@/data/postsData'
import Sidebar from '@/components/Sidebar/Sidebar'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import { FaUser, FaClock, FaComment } from 'react-icons/fa'
import './posts.css'

export const metadata = {
  title: 'Todas as Notícias | EDM News',
  description: 'Confira todas as notícias sobre música eletrônica, festivais, DJs e lançamentos',
}

export default function PostsPage() {
  const posts = getAllPosts()

  return (
    <main className="posts-page">
      <div className="posts-page-hero">
        <div className="container-wide">
          <h1 className="posts-page-title">Todas as Notícias</h1>
          <p className="posts-page-subtitle">
            Fique por dentro de tudo que acontece no mundo da música eletrônica
          </p>
        </div>
      </div>

      <div className="container-wide">
        <div className="posts-page-layout">
          <div className="posts-page-main">
            <SectionTitle title="Últimas Notícias" subtitle={`${posts.length} Posts`} />
            
            <div className="posts-list">
              {posts.map(post => (
                <Link href={`/posts/${post.id}`} key={post.id}>
                  <article className="post-list-item">
                    <div className="post-list-item__image">
                      <img src={post.image} alt={post.title} />
                      <span className={`post-list-item__category category-tag--${post.categoryColor}`}>
                        {post.category}
                      </span>
                    </div>
                    
                    <div className="post-list-item__content">
                      <h2 className="post-list-item__title">{post.title}</h2>
                      
                      <div className="post-list-item__meta">
                        <span className="meta-item">
                          <FaUser /> {post.author}
                        </span>
                        <span className="meta-item">
                          <FaClock /> {post.date}
                        </span>
                        <span className="meta-item">
                          <FaComment /> {post.comments} comentários
                        </span>
                      </div>
                      
                      <p className="post-list-item__excerpt">{post.excerpt}</p>
                      
                      <div className="post-list-item__tags">
                        {post.tags.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <button className="pagination-btn">Próximo →</button>
            </div>
          </div>

          <aside className="posts-page-sidebar">
            <Sidebar />
          </aside>
        </div>
      </div>
    </main>
  )
}

