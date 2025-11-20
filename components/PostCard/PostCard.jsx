import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaUser, FaClock, FaBookReader } from 'react-icons/fa'
import './PostCard.css'

const PostCard = ({ post, lang = 'en' }) => {
  // Extract slug without language prefix
  const slug = post.slug ? post.slug.replace(/^(pt|en|es)\//, '') : post.id
  
  return (
    <Link href={`/${lang}/${slug}`}>
      <article className="post-card">
        <div className="post-card__image-wrapper">
          <Image 
            src={post.image} 
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            style={{ objectFit: 'cover' }}
            className="post-card__image"
          />
          <span className={`post-card__category category-tag--${post.categoryColor}`}>
            {post.category}
          </span>
        </div>
        
        <div className="post-card__content">
          <h3 className="post-card__title">{post.title}</h3>
          
          <div className="post-card__meta">           
            <span className="post-card__meta-item">
              <FaClock /> {post.date || 'Data não disponível'}
            </span>
            {post.readTime && (
              <span className="post-card__meta-item">
                <FaBookReader /> {post.readTime}
              </span>
            )}
          </div>
          
          <p className="post-card__excerpt">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  )
}

export default PostCard

