'use client'

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
//import { usePathname } from 'next/navigation'
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation, getHomeUrl } from '@/utils/translations'
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector'
import './Header.css'

const Header = ({ categorias: initialCategorias = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [categorias, setCategorias] = useState(initialCategorias)
  //const pathname = usePathname()
  
  // Get language from context (always available since we're inside LanguageProvider)
  const { language } = useLanguage()
  
  // Buscar categorias sempre que o idioma mudar (via API route para evitar CORS)
  useEffect(() => {
    const loadCategorias = async () => {
      try {
        // Usar API route local (mesmo domínio, sem CORS)
        const baseUrl = typeof window !== 'undefined' 
          ? window.location.origin 
          : ''
        
        const response = await fetch(`${baseUrl}/api/categorias?lang=${language}`)
        
        if (response.ok) {
          const categoriasData = await response.json()
          setCategorias(categoriasData)
        } else {
          console.error('Error loading categorias:', response.status)
          // Em caso de erro, usar categorias iniciais como fallback
          if (initialCategorias.length > 0) {
            setCategorias(initialCategorias)
          }
        }
      } catch (error) {
        console.error('Error loading categorias:', error)
        // Em caso de erro, usar categorias iniciais como fallback
        if (initialCategorias.length > 0) {
          setCategorias(initialCategorias)
        }
      }
    }
    
    // Buscar categorias sempre que o idioma mudar
    if (language) {
      loadCategorias()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

