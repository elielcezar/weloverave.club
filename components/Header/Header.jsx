'use client'

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation, getHomeUrl } from '@/utils/translations'
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [categorias, setCategorias] = useState([])

  // Get language from context
  const { language } = useLanguage()

  // Buscar categorias sempre que o idioma mudar (via API route local)
  useEffect(() => {
    const loadCategorias = async () => {
      try {
        // Usar API route local para evitar CORS
        // O Next.js faz a requisição server-to-server para o CMS
        const response = await fetch(`/api/categorias?lang=${language}`)

        if (response.ok) {
          const categoriasData = await response.json()
          setCategorias(categoriasData)
        } else {
          console.error('Error loading categorias:', response.status)
        }
      } catch (error) {
        console.error('Error loading categorias:', error)
      }
    }

    // Buscar categorias sempre que o idioma mudar
    if (language) {
      loadCategorias()
    }
  }, [language])

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

          <div className="social-icons">
            <a href="#" className="social-link" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>

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
