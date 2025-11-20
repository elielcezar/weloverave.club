import React from 'react'
import Link from 'next/link'
import { FaUser, FaClock, FaBookReader } from 'react-icons/fa'
import './PostCard.css'

const PostCard = ({ post }) => {
  return (
    <Link href={`/posts/${post.slug || post.id}`}>
      <article className="post-card">
        <div className="post-card__image-wrapper">
          <img 
            src={post.image} 
            alt={post.title}
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

