import React from 'react'
import Link from 'next/link'
import HeroSection from '@/components/Hero/HeroSection'
import MainContent from '@/components/MainContent/MainContent'
import Sidebar from '@/components/Sidebar/Sidebar'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import { fetchPosts, fetchCategorias } from '@/services/api'
import { supportedLanguages, defaultLanguage, getTranslation } from '@/utils/translations'
import { notFound } from 'next/navigation'
import { FaClock, FaBookReader } from 'react-icons/fa'
import '../posts/posts.css'

export async function generateMetadata({ params }) {
  const { lang } = await params
  
  if (!supportedLanguages.includes(lang)) {
    return {
      title: 'Language not supported | EDM News'
    }
  }

  return {
    title: `EDM News - Electronic Music News`,
    description: 'Your definitive source for electronic music news, festivals, reviews and releases',
  }
}

export default async function HomePage({ params, searchParams }) {
  const { lang } = await params
  
  if (!supportedLanguages.includes(lang)) {
    notFound()
  }

  const resolvedSearchParams = await searchParams
  const categoriaSlug = resolvedSearchParams?.categoria

  const posts = await fetchPosts(lang)
  const categorias = await fetchCategorias(lang)

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
  const normalizeCategory = (cat) => {
    if (!cat) return ''
    return cat
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
  }

  const filteredPosts = categoriaNome
    ? posts.filter(post => {
        if (!post.category) return false
        const postCategoryNormalized = normalizeCategory(post.category)
        const searchCategoryNormalized = normalizeCategory(categoriaNome)
        const exactMatch = postCategoryNormalized === searchCategoryNormalized
        const containsMatch = postCategoryNormalized.includes(searchCategoryNormalized) || 
                             searchCategoryNormalized.includes(postCategoryNormalized)
        return exactMatch || containsMatch
      })
    : posts

  const t = (key) => getTranslation(key, lang)

  return (
    <main className={categoriaNome ? 'posts-page' : ''}>
      <HeroSection 
        posts={posts} 
        categoria={categoriaNome}
        showCategoryTitle={!!categoriaNome}
        lang={lang}
      />
      {categoriaNome ? (
        <div className="container-wide">
          <div className="posts-page-layout">
            <div className="posts-page-main">
              <SectionTitle 
                title={categoriaNome} 
                subtitle={`${filteredPosts.length} ${filteredPosts.length === 1 ? (lang === 'pt' ? 'Post' : lang === 'en' ? 'Post' : 'Publicación') : (lang === 'pt' ? 'Posts' : lang === 'en' ? 'Posts' : 'Publicaciones')}`} 
              />
              {filteredPosts.length > 0 ? (
                <div className="posts-list">
                  {filteredPosts.map(post => {
                    const slug = post.slug ? post.slug.replace(/^(pt|en|es)\//, '') : post.id
                    return (
                      <Link href={`/${lang}/${slug}`} key={post.id}>
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
              ) : (
                <div className="no-posts">
                  <p>{t('common.noPostsCategory')}</p>
                  <Link href={`/${lang}`} className="back-link">
                    {t('common.backToAll')}
                  </Link>
                </div>
              )}
            </div>
            <aside className="posts-page-sidebar">
              <Sidebar posts={filteredPosts} lang={lang} />
            </aside>
          </div>
        </div>
      ) : (
        <MainContent 
          posts={filteredPosts}
          lang={lang}
        />
      )}
    </main>
  )
}

