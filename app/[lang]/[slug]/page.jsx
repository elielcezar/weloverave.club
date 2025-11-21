import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchPostBySlug, fetchRelatedPosts } from '@/services/api'
import { notFound } from 'next/navigation'
import { FaUser, FaClock, FaFacebookF, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { getTranslation, getLanguageName, supportedLanguages } from '@/utils/translations'
import './post.css'

export async function generateMetadata({ params }) {
  const { lang, slug } = await params
  
  if (!supportedLanguages.includes(lang)) {
    return {
      title: 'Language not supported | WeLoveRave'
    }
  }

  const post = await fetchPostBySlug(slug, lang)

  if (!post) {
    return {
      title: 'Post not found | WeLoveRave'
    }
  }

  return {
    title: `${post.title} | WeLoveRave`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }) {
  const { lang, slug } = await params
  
  if (!supportedLanguages.includes(lang)) {
    notFound()
  }

  const post = await fetchPostBySlug(slug, lang)

  // Check if post exists in requested language
  if (!post) {
    // Try to find post in other languages
    let availableLanguages = []
    for (const l of supportedLanguages) {
      const p = await fetchPostBySlug(slug, l)
      if (p) {
        availableLanguages.push(l)
      }
    }

    if (availableLanguages.length === 0) {
      notFound()
    }

    // Show message with available languages
    return (
      <main className="single-post">
        <div className="container">
          <div className="post-not-available">
            <h1>{getTranslation('common.notAvailable.title', lang)}</h1>
            <p>
              {getTranslation('common.notAvailable.message', lang).replace('{language}', getLanguageName(lang))}
            </p>
            <div className="available-languages">
              <strong>{getTranslation('common.notAvailable.availableIn', lang)}</strong>
              <div className="language-links">
                {availableLanguages.map(l => (
                  <Link key={l} href={`/${l}/${slug}`} className="language-link">
                    {getLanguageName(l)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const relatedPosts = await fetchRelatedPosts(post.id, lang)
  const t = (key) => getTranslation(key, lang)

  return (
    <main className="single-post">    
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href={`/${lang}`}>{t('menu.home')}</Link>
          <span>/</span>
          <Link href={`/${lang}`}>{t('menu.news')}</Link>
          <span>/</span>
          <span>{post.category}</span>
        </nav>

        <div style={{ position: 'relative', width: '100%', height: '600px' }}>
              <Image 
                src={post.image} 
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                priority
                style={{ objectFit: 'cover' }}
                className="single-post__image"
              />
            </div>
                  
        
        <div className="single-post__layout">
        
          
          {/* Main Content */}
          <article className="single-post__content">
            {/* Post Header */}
            <header className="post-header">
              <span className={`post-category category-tag--${post.categoryColor}`}>
                {post.category}
              </span>

              <h1 className="post-title">{post.title}</h1>

              <div className="post-meta">
                <div className="post-author">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={50}
                    height={50}
                    className="post-author__image"
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                  />
                  <div className="post-author__info">
                    <span className="post-author__name">{t('post.by')} {post.author}</span>
                    <span className="post-author__date">{post.date}</span>
                  </div>
                </div>

                <div className="post-stats">
                  <span className="post-stat">
                    <FaClock /> {post.readTime}
                  </span>
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
                <strong>{t('common.tags')}:</strong>
                {post.tags.map((tag, index) => (
                  <span key={index} className="post-tag">{tag}</span>
                ))}
              </div>
            )}

            {/* Social Share */}
            <div className="post-share">
              <strong>{t('common.share')}:</strong>
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
              <Image
                src={post.authorImage}
                alt={post.author}
                width={80}
                height={80}
                className="author-bio__image"
                style={{ objectFit: 'cover', borderRadius: '50%' }}
              />
              <div className="author-bio__content">
                <h3 className="author-bio__name">{post.author}</h3>
                <p className="author-bio__description">
                  {lang === 'pt' && 'Jornalista especializado em música eletrônica com mais de 10 anos de experiência cobrindo os maiores festivais e eventos da cena EDM mundial.'}
                  {lang === 'en' && 'Journalist specialized in electronic music with over 10 years of experience covering the biggest festivals and events in the global EDM scene.'}
                  {lang === 'es' && 'Periodista especializado en música electrónica con más de 10 años de experiencia cubriendo los mayores festivales y eventos de la escena EDM mundial.'}
                </p>
              </div>
            </div>
          
          </article>

          {/* Sidebar */}
          <aside className="single-post__sidebar">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="sidebar-widget">
                <h3 className="sidebar-widget__title">{t('common.relatedPosts')}</h3>
                <div className="related-posts">
                  {relatedPosts.map(relatedPost => {
                    const postSlug = relatedPost.slug || `${lang}/${relatedPost.id}`
                    return (
                      <Link href={`/${lang}/${postSlug.replace(/^(pt|en|es)\//, '')}`} key={relatedPost.id}>
                        <article className="related-post">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            width={100}
                            height={80}
                            className="related-post__image"
                            style={{ objectFit: 'cover', borderRadius: '4px' }}
                          />
                          <div className="related-post__content">
                            <h4 className="related-post__title">{relatedPost.title}</h4>
                            <span className="related-post__date">{relatedPost.date}</span>
                          </div>
                        </article>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Newsletter */}
            <div className="sidebar-widget sidebar-widget--newsletter">
              <h3 className="sidebar-widget__title">{t('common.newsletter.title')}</h3>
              <p className="sidebar-widget__text">
                {t('common.newsletter.description')}
              </p>
              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder={t('common.newsletter.placeholder')}
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-button">
                  {t('common.newsletter.subscribe')}
                </button>
              </form>
            </div>

            {/* Popular Tags */}
            <div className="sidebar-widget">
              <h3 className="sidebar-widget__title">{t('common.tags')}</h3>
              <div className="popular-tags">
                <span className="popular-tag">House</span>
                <span className="popular-tag">Techno</span>
                <span className="popular-tag">Trance</span>
                <span className="popular-tag">Festival</span>
                <span className="popular-tag">DJs</span>
                <span className="popular-tag">Release</span>
                <span className="popular-tag">Review</span>
                <span className="popular-tag">Tutorial</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

