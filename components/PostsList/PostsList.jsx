'use client'

import { useState } from 'react'
import Link from 'next/link'
import PostCard from '@/components/PostCard/PostCard'
import { FaClock, FaBookReader } from 'react-icons/fa'
import { getTranslation } from '@/utils/translations'
import './PostsList.css'

const POSTS_PER_PAGE = 10

const PostsList = ({ posts = [], layout = 'grid', lang = 'en', useRootLinks = false }) => {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)
  const t = (key) => getTranslation(key, lang)
  
  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = visibleCount < posts.length

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + POSTS_PER_PAGE)
  }

  // Gera a URL do post baseada nas configurações
  const getPostUrl = (slug) => {
    if (useRootLinks) {
      return `/${slug}`
    }
    return `/${lang}/${slug}`
  }

  if (posts.length === 0) {
    return null
  }

  // Layout Grid (para home page)
  if (layout === 'grid') {
    return (
      <>
        <div className="posts-grid">
          {visiblePosts.map(post => (
            <PostCard key={post.id} post={post} lang={lang} useRootLinks={useRootLinks} />
          ))}
        </div>
        {hasMore && (
          <div className="load-more-container">
            <button 
              className="btn-load-more" 
              onClick={handleLoadMore}
              aria-label={t('common.loadMore')}
            >
              {t('common.loadMore')}
            </button>
          </div>
        )}
      </>
    )
  }

  // Layout List (para categorias e busca)
  return (
    <>
      <div className="posts-list">
        {visiblePosts.map(post => {
          const slug = post.slug ? post.slug.replace(/^(pt|en|es)\//, '') : post.id
          return (
            <Link href={getPostUrl(slug)} key={post.id}>
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
                      <FaClock /> {post.date}
                    </span>
                    {post.readTime && (
                      <span className="meta-item">
                        <FaBookReader /> {post.readTime}
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
          )
        })}
      </div>
      {hasMore && (
        <div className="load-more-container">
          <button 
            className="btn-load-more" 
            onClick={handleLoadMore}
            aria-label={t('common.loadMore')}
          >
            {t('common.loadMore')}
          </button>
        </div>
      )}
    </>
  )
}

export default PostsList

