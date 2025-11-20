'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation, getHomeUrl } from '@/utils/translations'
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector'
import './Header.css'

const Header = ({ categorias = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  
  // Get language from context (always available since we're inside LanguageProvider)
  const { language } = useLanguage()
  
  const t = (key) => getTranslation(key, language)

  return (
    <header className="header">
      <div className="container-wide">
        <div className="header-content">
          {/* Mobile Toggle (Left) */}
          <button
            className="mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation (Center) */}
          <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link href={getHomeUrl(language)} className="nav-link active">
                  {t('menu.home')}
                </Link>
              </li>
              {categorias.length > 0 ? (
                categorias.map((categoria) => (
                  <li key={categoria.id} className="nav-item">
                    <Link 
                      href={`${getHomeUrl(language)}?categoria=${categoria.slug}`} 
                      className="nav-link"
                    >
                      {categoria.nome.toUpperCase()}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="nav-item">
                  <Link href={getHomeUrl(language)} className="nav-link">
                    {t('menu.news')}
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link href={getHomeUrl(language)} className="nav-link">
                  {t('menu.allNews')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Search & Language (Right) */}
          <div className="header-actions">
            <LanguageSelector />
            <button
              className="search-toggle"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label={t('common.search.placeholder')}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="search-bar">
            <input
              type="text"
              placeholder={t('common.search.placeholder')}
              className="search-input"
            />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

