'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="header">
      <div className="container-wide">
        <div className="header-content">
          {/* Logo */}
          <Link href="/" className="logo-section">
            <div className="logo-subtitle">EDM</div>
            <div className="logo-main">NEWS</div>
            <div className="logo-tagline">Electronic Dance Music</div>
          </Link>

          {/* Navigation */}
          <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link href="/" className="nav-link active">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <a href="#" className="nav-link">Gêneros <span className="arrow">▼</span></a>
                <ul className="dropdown-menu">
                  <li><Link href="/generos/house">House</Link></li>
                  <li><Link href="/generos/techno">Techno</Link></li>
                  <li><Link href="/generos/trance">Trance</Link></li>
                  <li><Link href="/generos/dubstep">Dubstep</Link></li>
                  <li><Link href="/generos/drum-bass">Drum & Bass</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link href="/festivais" className="nav-link">Festivais</Link>
              </li>
              <li className="nav-item">
                <Link href="/djs" className="nav-link">DJs</Link>
              </li>
              <li className="nav-item">
                <Link href="/posts" className="nav-link">Notícias</Link>
              </li>
              <li className="nav-item">
                <Link href="/reviews" className="nav-link">Reviews</Link>
              </li>
              <li className="nav-item">
                <Link href="/contato" className="nav-link">Contato</Link>
              </li>
            </ul>
          </nav>

          {/* Search & Mobile Toggle */}
          <div className="header-actions">
            <button 
              className="search-toggle"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Buscar"
            >
              <FaSearch />
            </button>
            <button 
              className="mobile-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
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

