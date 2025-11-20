import React from 'react'
import Link from 'next/link'
import { fetchPosts, fetchCategorias } from '@/services/api'
import Sidebar from '@/components/Sidebar/Sidebar'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import { FaUser, FaClock, FaComment } from 'react-icons/fa'
import './posts.css'

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const categoria = resolvedSearchParams?.categoria

  if (categoria) {
    return {
      title: `${categoria.charAt(0).toUpperCase() + categoria.slice(1)} | EDM News`,
      description: `Confira todas as notícias sobre ${categoria.toLowerCase()} no mundo da música eletrônica`,
    }
  }

  return {
    title: 'Todas as Notícias | EDM News',
    description: 'Confira todas as notícias sobre música eletrônica, festivais, DJs e lançamentos',
  }
}

export default async function PostsPage({ searchParams }) {
  const posts = await fetchPosts()
  const categorias = await fetchCategorias('pt')
  const resolvedSearchParams = await searchParams
  const categoriaSlug = resolvedSearchParams?.categoria

  // Find the actual category name from the slug
  let categoriaNome = null
  if (categoriaSlug) {
    const categoriaEncontrada = categorias.find(cat => {
      const catSlug = cat.nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      return catSlug === categoriaSlug.toLowerCase()
    })
    categoriaNome = categoriaEncontrada?.nome || categoriaSlug
  }

  // Filter posts by category if specified
  // Normalize category for comparison (remove accents, convert to lowercase)
  const normalizeCategory = (cat) => {
    if (!cat) return ''
    return cat
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
  }

  // Filter posts by category if specified
  const filteredPosts = categoriaNome
    ? posts.filter(post => {
        if (!post.category) return false
        const postCategoryNormalized = normalizeCategory(post.category)
        const searchCategoryNormalized = normalizeCategory(categoriaNome)
        // Check if category name matches exactly or contains the search term
        const exactMatch = postCategoryNormalized === searchCategoryNormalized
        const containsMatch = postCategoryNormalized.includes(searchCategoryNormalized) || 
                             searchCategoryNormalized.includes(postCategoryNormalized)
        return exactMatch || containsMatch
      })
    : posts


  return (
    <main className="posts-page">
      {categoriaNome && (
        <div className="posts-page-hero">
          <div className="container-wide">
            <h1 className="posts-page-title">{categoriaNome}</h1>
            <p className="posts-page-subtitle">
              Confira todas as notícias sobre {categoriaNome.toLowerCase()} no mundo da música eletrônica
            </p>
          </div>
        </div>
      )}
      
      <div className="container-wide">
        <div className="posts-page-layout">
          <div className="posts-page-main">
            <SectionTitle 
              title={categoriaNome ? categoriaNome : "Últimas Notícias"} 
              subtitle={`${filteredPosts.length} ${filteredPosts.length === 1 ? 'Post' : 'Posts'}`} 
            />

            {filteredPosts.length > 0 ? (
              <div className="posts-list">
                {filteredPosts.map(post => (
                  <Link href={`/posts/${post.slug || post.id}`} key={post.id}>
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
                          {post.comments !== undefined && (
                            <span className="meta-item">
                              <FaComment /> {post.comments} comentários
                            </span>
                          )}
                        </div>

                        <p className="post-list-item__excerpt">{post.excerpt}</p>

                        {post.tags && post.tags.length > 0 && (
                          <div className="post-list-item__tags">
                            {post.tags.map((tag, index) => (
                              <span key={index} className="tag">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-posts">
                <p>Nenhum post encontrado para esta categoria.</p>
                <Link href="/posts" className="back-link">Ver todas as notícias</Link>
              </div>
            )}

            {/* Pagination */}
            <div className="pagination">
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <button className="pagination-btn">Próximo →</button>
            </div>
          </div>

          <aside className="posts-page-sidebar">
            <Sidebar posts={filteredPosts} />
          </aside>
        </div>
      </div>
    </main>
  )
}

