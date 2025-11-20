import React from 'react'
import PostCard from '@/components/PostCard/PostCard'
import Sidebar from '@/components/Sidebar/Sidebar'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import './MainContent.css'

const MainContent = ({ posts = [] }) => {

  // Use the rest for the main list, or all of them if needed
  const mainPosts = posts;

  return (
    <main className="main-content">
      <div className="container-wide">

        {/* FUTURA ENTRADA DE BANNER */}

        {/* ------------------------ */}

        {/* Main Layout: Posts + Sidebar */}
        <div className="content-layout">
          <div className="posts-section">
            <SectionTitle title="Latest in Tech" subtitle="Demo" />

            <div className="posts-grid">
              {mainPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="load-more-container">
              <button className="btn-load-more">Load More</button>
            </div>
          </div>

          <aside className="sidebar-section">
            <Sidebar posts={posts} />
          </aside>
        </div>
      </div>
    </main>
  )
}

export default MainContent

