import React from 'react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar/Sidebar'
import PostsList from '@/components/PostsList/PostsList'
import { fetchPosts, searchPosts } from '@/services/api'
import { getTranslation } from '@/utils/translations'
import { FaSearch } from 'react-icons/fa'
import '../posts/posts.css'
import '../[lang]/search/search.css'

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams?.q || ''

  const t = (key) => getTranslation(key, 'en')

  return {
    title: query 
      ? `${t('common.search.resultsFor')} "${query}" | WeLoveRave`
      : `${t('common.search.title')} | WeLoveRave`,
    description: `Search results for electronic music news`,
  }
}

export default async function SearchPage({ searchParams }) {
  const lang = 'en'
  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams?.q || ''

  const posts = await fetchPosts(lang)
  const filteredPosts = searchPosts(posts, query)

  const t = (key) => getTranslation(key, lang)

  return (
    <main className="posts-page search-page">
      {/* Search Header */}
      <div className="search-page-hero">
        <div className="container-wide">         
          <h1 className="search-page-title">
            {query ? t('common.search.resultsFor') : t('common.search.title')}

            {query && (
              <strong className="search-page-query"> {query}</strong>
            )}
          </h1>
          <p className="search-page-count">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'result found' : 'results found'}
          </p>
        </div>
      </div>

      <div className="container-wide">
        <div className="posts-page-layout">
          <div className="posts-page-main">
            {filteredPosts.length > 0 ? (
              <PostsList posts={filteredPosts} layout="list" lang={lang} />
            ) : (
              <div className="no-posts">
                <div className="no-results-icon">
                  <FaSearch />
                </div>
                <p>{t('common.search.noResults')}</p>
                {query && (
                  <p className="no-results-suggestion">{t('common.search.suggestion')}</p>
                )}
                <Link href="/" className="back-link">
                  {t('common.backToAll')}
                </Link>
              </div>
            )}
          </div>
          <aside className="posts-page-sidebar">
            <Sidebar posts={posts.slice(0, 5)} lang={lang} />
          </aside>
        </div>
      </div>
    </main>
  )
}

