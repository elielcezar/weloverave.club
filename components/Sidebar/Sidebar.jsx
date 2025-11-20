'use client'

import React from 'react'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaPinterest, FaInstagram, FaYoutube, FaVimeoV } from 'react-icons/fa'
import { getTranslation } from '@/utils/translations'
import './Sidebar.css'

const Sidebar = ({ posts = [], lang = 'en' }) => {
  const t = (key) => getTranslation(key, lang)
  
  // Derive trending posts (e.g., first 3)
  const trendingPosts = posts.slice(0, 3);

  // Derive small posts (e.g., next 4)
  const smallPosts = posts.slice(3, 7);

  return (
    <div className="sidebar">
      

      {/* Social Widget */}
      <div className="widget widget-social">
        <h3 className="widget-title">{t('footer.socialMedia')}</h3>
        <div className="social-stats">
          <a href="#" className="social-stat social-stat--facebook">
            <FaFacebookF className="social-stat__icon" />
            <div className="social-stat__info">
              <span className="social-stat__count">1.1K</span>
              <span className="social-stat__label">
                {lang === 'pt' ? 'Curtidas' : lang === 'en' ? 'Likes' : 'Me gusta'}
              </span>
            </div>
          </a>
          <a href="#" className="social-stat social-stat--twitter">
            <FaTwitter className="social-stat__icon" />
            <div className="social-stat__info">
              <span className="social-stat__count">68.9K</span>
              <span className="social-stat__label">
                {lang === 'pt' ? 'Seguidores' : lang === 'en' ? 'Followers' : 'Seguidores'}
              </span>
            </div>
          </a>
          <a href="#" className="social-stat social-stat--pinterest">
            <FaPinterest className="social-stat__icon" />
            <div className="social-stat__info">
              <span className="social-stat__count">10.7K</span>
              <span className="social-stat__label">
                {lang === 'pt' ? 'Seguidores' : lang === 'en' ? 'Followers' : 'Seguidores'}
              </span>
            </div>
          </a>
          <a href="#" className="social-stat social-stat--instagram">
            <FaInstagram className="social-stat__icon" />
            <div className="social-stat__info">
              <span className="social-stat__count">46.4K</span>
              <span className="social-stat__label">
                {lang === 'pt' ? 'Seguidores' : lang === 'en' ? 'Followers' : 'Seguidores'}
              </span>
            </div>
          </a>
          <a href="#" className="social-stat social-stat--youtube">
            <FaYoutube className="social-stat__icon" />
            <div className="social-stat__info">
              <span className="social-stat__count">105K</span>
              <span className="social-stat__label">
                {lang === 'pt' ? 'Inscritos' : lang === 'en' ? 'Subscribers' : 'Suscriptores'}
              </span>
            </div>
          </a>
          <a href="#" className="social-stat social-stat--vimeo">
            <FaVimeoV className="social-stat__icon" />
            <div className="social-stat__info">
              <span className="social-stat__count">17.7K</span>
              <span className="social-stat__label">
                {lang === 'pt' ? 'Seguidores' : lang === 'en' ? 'Followers' : 'Seguidores'}
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="widget widget-newsletter">
        <h3 className="widget-title">{t('common.newsletter.title')}</h3>
        <p className="widget-text">
          {t('common.newsletter.description')}
        </p>
        <form className="newsletter-form">
          <input
            type="email"
            placeholder={t('common.newsletter.placeholder')}
            className="newsletter-input"
          />
          <button type="submit" className="newsletter-btn">
            {t('common.newsletter.subscribe')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Sidebar

