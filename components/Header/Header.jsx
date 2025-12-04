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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [categorias, setCategorias] = useState([])
  //const pathname = usePathname()

  // Get language from context (always available since we're inside LanguageProvider)
  const { language } = useLanguage()

  // Buscar categorias sempre que o idioma mudar (direto da API externa)
  useEffect(() => {
    const loadCategorias = async () => {
      try {
        // Chamar API externa diretamente (mesmo comportamento dos posts)
        const response = await fetch('https://cms.ecwd.cloud/api/categorias')

        if (response.ok) {
          const data = await response.json()

          // Mapear categorias conforme o idioma (mesma lógica do services/api.js)
          const mappedCategorias = data.map(categoria => {
            const translation = categoria.translations?.find(t => t.idioma === language) || categoria.translations?.[0]
            const nome = translation?.nome || 'Categoria'
            const slug = nome
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/g, '')
            return {
              id: categoria.id,
              nome: nome,
              slug: slug || 'categoria',
              idioma: language
            }
          })

          setCategorias(mappedCategorias)
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

