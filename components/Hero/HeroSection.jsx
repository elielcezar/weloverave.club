import React from 'react'
import Link from 'next/link'
import './HeroSection.css'

const HeroSection = ({ posts = [], categoria = null, showCategoryTitle = false }) => {
  // Normalize category for comparison (remove accents, convert to lowercase)
  const normalizeCategory = (cat) => {
    if (!cat) return ''
    return cat
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
  }

  let filteredPosts = posts;

  // Filter by category if specified
  if (categoria) {
    const searchCategoryNormalized = normalizeCategory(categoria)
    filteredPosts = posts.filter(p => {
      if (!p.category) return false
      const postCategoryNormalized = normalizeCategory(p.category)
      return postCategoryNormalized.includes(searchCategoryNormalized) || 
             searchCategoryNormalized.includes(postCategoryNormalized)
    })
  }

  // Take the first 3 posts for the hero section
  let heroPosts = filteredPosts.filter(p => p.featured).slice(0, 3);

  // If not enough featured posts, fill with latest from the filtered posts
  if (heroPosts.length < 3) {
    const remaining = 3 - heroPosts.length;
    const morePosts = filteredPosts
      .filter(p => !heroPosts.find(hp => hp.id === p.id))
      .slice(0, remaining);
    heroPosts.push(...morePosts);
  }

  // If still not enough, fall back to all posts
  if (heroPosts.length < 3 && categoria) {
    const remaining = 3 - heroPosts.length;
    const fallbackPosts = posts
      .filter(p => !heroPosts.find(hp => hp.id === p.id))
      .slice(0, remaining);
    heroPosts.push(...fallbackPosts);
  }

  if (heroPosts.length === 0) return null;

  return (
    <section className="hero-section">
      {showCategoryTitle && categoria && (
        <div className="hero-category-title">
          <div className="container-wide">
            <h1 className="hero-category-heading">{categoria}</h1>
            <p className="hero-category-subtitle">
              Descubra tudo sobre {categoria.toLowerCase()} no mundo da música eletrônica
            </p>
          </div>
        </div>
      )}
      <div className="hero-grid">
        {heroPosts.map((item) => (
          <Link href={`/posts/${item.slug || item.id}`} key={item.id}>
            <article className="hero-card">
              <div className="hero-card__image">
                <img src={item.image} alt={item.title} />
                <div className="hero-card__overlay"></div>
              </div>
              <div className="hero-card__content">
                <span className={`category-tag category-tag--${item.categoryColor || 'blue'}`}>
                  {item.category || 'News'}
                </span>              
                <h2 className="hero-card__title">{item.title || 'Sem título'}</h2>
                <div className="hero-card__meta">
                  <span className="hero-card__author">{item.author || 'Admin'}</span>
                  <span className="hero-card__separator">—</span>
                  <span className="hero-card__date">{item.date || 'Data não disponível'}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default HeroSection
