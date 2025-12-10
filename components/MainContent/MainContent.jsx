import React from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import PostsList from '@/components/PostsList/PostsList'
import { getTranslation } from '@/utils/translations'
import './MainContent.css'

const MainContent = ({ posts = [], lang = 'en' }) => {
  const t = (key) => getTranslation(key, lang)
  // Pula os 3 primeiros posts que já aparecem no Hero
  const postsWithoutHero = posts.slice(3)

  return (
    <main className="main-content">
      <div className="container-wide">

        {/* FUTURA ENTRADA DE BANNER */}

        {/* ------------------------ */}

        {/* Main Layout: Posts + Sidebar */}
        <div className="content-layout">
          <div className="posts-section">
            
            <SectionTitle title={t('categories.latest')} />

            <PostsList posts={postsWithoutHero} layout="grid" lang={lang} />
          </div>

          <aside className="sidebar-section">
            <Sidebar posts={posts} lang={lang} />
          </aside>
        </div>
      </div>
    </main>
  )
}

export default MainContent

