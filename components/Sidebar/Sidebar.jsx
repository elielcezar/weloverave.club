'use client'

import React from 'react'
import { FaFacebookF, FaTwitter, FaPinterest, FaInstagram, FaYoutube, FaVimeoV } from 'react-icons/fa'
import './Sidebar.css'

const trendingPosts = [
  {
    id: 1,
    title: 'Top 10: DJs Mais Tocados nas Rádios em 2024',
    image: 'https://images.unsplash.com/photo-1574267432644-f9e90e96b6bb?w=300&q=80',
    date: 'Nov 18, 2024'
  },
  {
    id: 2,
    title: 'Swedish House Mafia Confirma Tour Mundial',
    image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=300&q=80',
    date: 'Nov 17, 2024'
  },
  {
    id: 3,
    title: 'Conheça os Novos Talentos do House Music',
    image: 'https://images.unsplash.com/photo-1571266028243-d220c6c1de29?w=300&q=80',
    date: 'Nov 17, 2024'
  }
]

const smallPosts = [
  {
    id: 1,
    title: 'As Melhores Playlists de Techno para Trabalhar',
    category: 'Playlists',
    date: 'Nov 18, 2024'
  },
  {
    id: 2,
    title: 'Como Produzir Música Eletrônica: Guia Completo',
    category: 'Tutoriais',
    date: 'Nov 17, 2024'
  },
  {
    id: 3,
    title: 'História do Trance: Das Origens ao Mainstream',
    category: 'História',
    date: 'Nov 17, 2024'
  },
  {
    id: 4,
    title: 'Equipamentos Essenciais para DJs Iniciantes',
    category: 'Equipamentos',
    date: 'Nov 16, 2024'
  }
]

const Sidebar = ({ posts = [] }) => {
  // Derive trending posts (e.g., first 3)
  const trendingPosts = posts.slice(0, 3);

  // Derive small posts (e.g., next 4)
  const smallPosts = posts.slice(3, 7);

  return (
    <div className="sidebar">
      {/* Featured Posts Widget */}
      <div className="widget">
        <h3 className="widget-title">Em Destaque</h3>
        <div className="trending-posts">
          {trendingPosts.map((post, index) => (
            <article key={post.id} className="trending-post">
              {index === 0 && (
                <>
                  <div className="trending-post__image-large">
                    <img src={post.image || 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80'} alt={post.title || 'Post'} />
                  </div>
                  <h4 className="trending-post__title-large">{post.title || 'Sem título'}</h4>
                  <span className="trending-post__date">{post.date || 'Data não disponível'}</span>
                </>
              )}
              {index > 0 && (
                <div className="trending-post__small">
                  <img src={post.image || 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80'} alt={post.title || 'Post'} className="trending-post__image-small" />
                  <div className="trending-post__content-small">
                    <h4 className="trending-post__title-small">{post.title || 'Sem título'}</h4>
                    <span className="trending-post__date">{post.date || 'Data não disponível'}</span>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Social Widget */}
      <div className="widget widget-social">
        <h3 className="widget-title">Redes Sociais</h3>
        <div className="social-stats">
          <a href="#" className="social-stat social-stat--facebook">
            <FaFacebookF className="social-stat__icon" />
            <div className="social-stat__info">
              <span className="social-stat__count">1.1K</span>
              <span className="social-stat__label">Curtidas</span>
            </div>
          </a>
          <a href="#" className="social-stat social-stat--twitter">
            <FaTwitter className="social-stat__icon" />
            <div className="social-stat__info">
              <span className="social-stat__count">68.9K</span>
              <span className="social-stat__label">Seguidores</span>
            </div>
          </a>
          <a href="#" className="social-stat social-stat--pinterest">
            <FaPinterest className="social-stat__icon" />
            <div className="social-stat__info">
              <span className="social-stat__count">10.7K</span>
              <span className="social-stat__label">Seguidores</span>
            </div>
          </a>
          <a href="#" className="social-stat social-stat--instagram">
            <FaInstagram className="social-stat__icon" />
            <div className="social-stat__info">
              <span className="social-stat__count">46.4K</span>
              <span className="social-stat__label">Seguidores</span>
            </div>
          </a>
          <a href="#" className="social-stat social-stat--youtube">
            <FaYoutube className="social-stat__icon" />
            <div className="social-stat__info">
              <span className="social-stat__count">105K</span>
              <span className="social-stat__label">Inscritos</span>
            </div>
          </a>
          <a href="#" className="social-stat social-stat--vimeo">
            <FaVimeoV className="social-stat__icon" />
            <div className="social-stat__info">
              <span className="social-stat__count">17.7K</span>
              <span className="social-stat__label">Seguidores</span>
            </div>
          </a>
        </div>
      </div>

      {/* Small Posts Widget */}
      <div className="widget">
        <h3 className="widget-title">Posts Recentes</h3>
        <div className="small-posts">
          {smallPosts.map(post => (
            <article key={post.id} className="small-post">
              <span className="small-post__category">{post.category || 'Geral'}</span>
              <h4 className="small-post__title">{post.title || 'Sem título'}</h4>
              <span className="small-post__date">{post.date || 'Data não disponível'}</span>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="widget widget-newsletter">
        <h3 className="widget-title">Newsletter</h3>
        <p className="widget-text">
          Receba as últimas notícias sobre música eletrônica direto no seu email.
        </p>
        <form className="newsletter-form">
          <input
            type="email"
            placeholder="Seu email..."
            className="newsletter-input"
          />
          <button type="submit" className="newsletter-btn">
            Inscrever-se
          </button>
        </form>
      </div>
    </div>
  )
}

export default Sidebar

