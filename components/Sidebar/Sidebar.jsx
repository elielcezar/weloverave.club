'use client'

import React from 'react'
import { FaFacebookF, FaTwitter, FaPinterest, FaInstagram, FaYoutube, FaVimeoV } from 'react-icons/fa'
import './Sidebar.css'



const Sidebar = ({ posts = [] }) => {
  // Derive trending posts (e.g., first 3)
  const trendingPosts = posts.slice(0, 3);

  // Derive small posts (e.g., next 4)
  const smallPosts = posts.slice(3, 7);

  return (
    <div className="sidebar">
      

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

