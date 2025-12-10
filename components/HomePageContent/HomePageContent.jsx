import React from 'react'
import Link from 'next/link'
import HeroSection from '@/components/Hero/HeroSection'
import MainContent from '@/components/MainContent/MainContent'
import Sidebar from '@/components/Sidebar/Sidebar'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import PostsList from '@/components/PostsList/PostsList'
import { fetchPosts, fetchCategorias } from '@/services/api'
import { getTranslation, getHomeUrl } from '@/utils/translations'
import '../../app/posts/posts.css'

export default async function HomePageContent({ lang, searchParams }) {
  const categoriaSlug = searchParams?.categoria

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
                <PostsList posts={filteredPosts} layout="list" lang={lang} />
              ) : (
                <div className="no-posts">
                  <p>{t('common.noPostsCategory')}</p>
                  <Link href={getHomeUrl(lang)} className="back-link">
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

