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

