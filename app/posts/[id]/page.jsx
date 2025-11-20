import React from 'react'
import Link from 'next/link'
import { fetchPostBySlug, fetchRelatedPosts } from '@/services/api'
import { notFound } from 'next/navigation'
import { FaUser, FaClock, FaComment, FaFacebookF, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import './post.css'

export async function generateMetadata({ params }) {
  const { id: slug } = await params
  const post = await fetchPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post não encontrado | EDM News'
    }
  }

  return {
    title: `${post.title} | EDM News`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }) {
  const { id: slug } = await params
  const post = await fetchPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await fetchRelatedPosts(post.id)

  return (
    <main className="single-post">    

      <div className="container">

        {/* Breadcrumb */}
          <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/posts">Notícias</Link>
                <span>/</span>
                <span>{post.category}</span>
              </nav>
                      
             
        <div className="single-post__layout">
          
          {/* Main Content */}
          <article className="single-post__content">
          
            <img src={post.image} alt={post.title} className="single-post__image" />

            {/* Post Header */}
            <header className="post-header">
              <span className={`post-category category-tag--${post.categoryColor}`}>
                {post.category}
              </span>

              <h1 className="post-title">{post.title}</h1>

              <div className="post-meta">
                <div className="post-author">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="post-author__image"
                  />
                  <div className="post-author__info">
                    <span className="post-author__name">Por {post.author}</span>
                    <span className="post-author__date">{post.date}</span>
                  </div>
                </div>

                <div className="post-stats">
                  <span className="post-stat">
                    <FaClock /> {post.readTime}
                  </span>
                  {/*<span className="post-stat">
                    <FaComment /> {post.comments} comentários
                  </span>*/}
                </div>
              </div>
            </header>

            {/* Post Body */}
            <div
              className="post-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Post Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                <strong>Tags:</strong>
                {post.tags.map((tag, index) => (
                  <span key={index} className="post-tag">{tag}</span>
                ))}
              </div>
            )}

            {/* Social Share */}
            <div className="post-share">
              <strong>Compartilhe:</strong>
              <div className="share-buttons">
                <a href="#" className="share-btn share-btn--facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className="share-btn share-btn--twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="share-btn share-btn--linkedin">
                  <FaLinkedin />
                </a>
                <a href="#" className="share-btn share-btn--whatsapp">
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            {/* Author Bio */}
            <div className="author-bio">
              <img
                src={post.authorImage}
                alt={post.author}
                className="author-bio__image"
              />
              <div className="author-bio__content">
                <h3 className="author-bio__name">{post.author}</h3>
                <p className="author-bio__description">
                  Jornalista especializado em música eletrônica com mais de 10 anos de experiência
                  cobrindo os maiores festivais e eventos da cena EDM mundial.
                </p>
              </div>
            </div>
          
          </article>

          {/* Sidebar */}
          <aside className="single-post__sidebar">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="sidebar-widget">
                <h3 className="sidebar-widget__title">Posts Relacionados</h3>
                <div className="related-posts">
                  {relatedPosts.map(relatedPost => (
                    <Link href={`/posts/${relatedPost.slug || relatedPost.id}`} key={relatedPost.id}>
                      <article className="related-post">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="related-post__image"
                        />
                        <div className="related-post__content">
                          <h4 className="related-post__title">{relatedPost.title}</h4>
                          <span className="related-post__date">{relatedPost.date}</span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter */}
            <div className="sidebar-widget sidebar-widget--newsletter">
              <h3 className="sidebar-widget__title">Newsletter</h3>
              <p className="sidebar-widget__text">
                Receba as últimas notícias direto no seu email
              </p>
              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder="Seu email..."
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-button">
                  Inscrever-se
                </button>
              </form>
            </div>

            {/* Popular Tags */}
            <div className="sidebar-widget">
              <h3 className="sidebar-widget__title">Tags Populares</h3>
              <div className="popular-tags">
                <span className="popular-tag">House</span>
                <span className="popular-tag">Techno</span>
                <span className="popular-tag">Trance</span>
                <span className="popular-tag">Festivais</span>
                <span className="popular-tag">DJs</span>
                <span className="popular-tag">Lançamentos</span>
                <span className="popular-tag">Reviews</span>
                <span className="popular-tag">Tutoriais</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

