import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchPostBySlug, fetchRelatedPosts } from '@/services/api'
import { notFound } from 'next/navigation'
import { FaClock, FaFacebookF, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
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

  // Construir URL completa do post para compartilhamento
  const baseUrl = 'https://weloverave.club'
  const postUrl = `${baseUrl}/${lang}/${slug}`
  const shareTitle = encodeURIComponent(post.title)
  const shareUrl = encodeURIComponent(postUrl)

  // URLs de compartilhamento
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`
  }

  return (
    <main className="single-post">    
      <div className="container">       

        <div className="single-post__hero">
              <Image 
                src={post.image} 
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 200px"
                priority
                style={{ objectFit: 'cover' }}
                className="single-post__image"
              />
            </div>

            {/* Post Header */}
            <header className="post-header">
              <span className={`post-category category-tag--${post.categoryColor}`}>
                {post.category}
              </span>

              <h1 className="post-title">{post.title}</h1>

              <div className="post-excerpt">
                <p className="post-excerpt__text">{post.excerpt}</p>
              </div>
             
              <div className="post-meta">
                <div className="post-author">
                  <Image
                    src="/heart.png"
                    alt="WeLoveRave"
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

                {/* Social Share */}
                <div className="post-share">
                  <strong>{t('common.share')}:</strong>
                  <div className="share-buttons">
                    <a 
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn share-btn--facebook"
                      aria-label="Share on Facebook"
                    >
                      <FaFacebookF />
                    </a>
                    <a 
                      href={shareLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn share-btn--twitter"
                      aria-label="Share on Twitter"
                    >
                      <FaTwitter />
                    </a>
                    <a 
                      href={shareLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn share-btn--linkedin"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                    <a 
                      href={shareLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn share-btn--whatsapp"
                      aria-label="Share on WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>

              </div>
            </header>

                  
        
        <div className="single-post__layout">
        
          
          {/* Main Content */}
          <article className="single-post__content">            
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

            {/* Author Bio */}
            <div className="author-bio">
              <Image
                src="/heart.png"
                alt="WeLoveRave"
                width={80}
                height={80}
                className="author-bio__image"
                style={{ objectFit: 'cover', borderRadius: '50%' }}
              />
              <div className="author-bio__content">                
                <p className="author-bio__description">
                  {lang === 'pt' && 'Ajude a espalhar a música eletrônica para o mundo! O WeLoveRave publica conteúdos em Inglês, Português e Espanhol. Envie sua sugestão de notícia para contact@weloverave.club e veja seu conteúdo ser lido por todos!'}
                  {lang === 'en' && 'Help spread electronic music to the world! WeLoveRave publishes content in English, Portuguese and Spanish. Send your news suggestion to contact@weloverave.club and see your content read by everyone!'}
                  {lang === 'es' && 'Ayude a difundir la música electrónica al mundo! WeLoveRave publica contenido en Inglés, Portugués y Español. Envíe su sugerencia de noticia a contact@weloverave.club y vea su contenido leído por todos!'}
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
            {/*<div className="sidebar-widget sidebar-widget--newsletter">
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
            </div>*/}

            {/* Popular Tags */}
            {/*<div className="sidebar-widget">
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
            </div>*/}
          </aside>
        </div>
      </div>
    </main>
  )
}

