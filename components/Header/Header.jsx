'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'
import './Header.css'

const Header = ({ categorias = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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
                <Link href="/" className="nav-link active">HOME</Link>
              </li>
              {categorias.length > 0 ? (
                categorias.map((categoria) => (
                  <li key={categoria.id} className="nav-item">
                    <Link 
                      href={`/posts?categoria=${categoria.slug}`} 
                      className="nav-link"
                    >
                      {categoria.nome.toUpperCase()}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="nav-item">
                  <Link href="/posts" className="nav-link">NOTÍCIAS</Link>
                </li>
              )}
              <li className="nav-item">
                <Link href="/posts" className="nav-link">TODAS AS NOTÍCIAS</Link>
              </li>
            </ul>
          </nav>

          {/* Search & Theme (Right) */}
          <div className="header-actions">
            <button className="theme-toggle" aria-label="Toggle Theme">
              🌙
            </button>
            <button
              className="search-toggle"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Buscar"
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
              placeholder="Digite para buscar e pressione Enter..."
              className="search-input"
            />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

