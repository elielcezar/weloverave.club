'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getLanguageName, supportedLanguages } from '@/utils/translations'
import './LanguageSelector.css'

// Componente de Bandeira do Brasil
const BrazilFlag = ({ className }) => (
  <svg className={className} viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" fill="#009739"/>
    <path d="M10 0L20 7L10 14L0 7Z" fill="#FEDD00"/>
    <circle cx="10" cy="7" r="3.5" fill="#012169"/>
    <path d="M10 5.2L9.2 6.5L10 7.8L10.8 6.5L10 5.2Z" fill="#FEDD00"/>
  </svg>
)

// Componente de Bandeira dos Estados Unidos
const USAFlag = ({ className }) => (
  <svg className={className} viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
    {/* Listras vermelhas e brancas */}
    <rect width="20" height="14" fill="#B22234"/>
    <rect width="20" height="1" y="1" fill="#FFFFFF"/>
    <rect width="20" height="1" y="3" fill="#FFFFFF"/>
    <rect width="20" height="1" y="5" fill="#FFFFFF"/>
    <rect width="20" height="1" y="7" fill="#FFFFFF"/>
    <rect width="20" height="1" y="9" fill="#FFFFFF"/>
    <rect width="20" height="1" y="11" fill="#FFFFFF"/>
    {/* Cantão azul */}
    <rect width="8" height="7" fill="#3C3B6E"/>
    {/* Estrelas simplificadas */}
    <circle cx="2" cy="1.5" r="0.4" fill="#FFFFFF"/>
    <circle cx="4" cy="1.5" r="0.4" fill="#FFFFFF"/>
    <circle cx="6" cy="1.5" r="0.4" fill="#FFFFFF"/>
    <circle cx="2" cy="3" r="0.4" fill="#FFFFFF"/>
    <circle cx="4" cy="3" r="0.4" fill="#FFFFFF"/>
    <circle cx="6" cy="3" r="0.4" fill="#FFFFFF"/>
    <circle cx="2" cy="4.5" r="0.4" fill="#FFFFFF"/>
    <circle cx="4" cy="4.5" r="0.4" fill="#FFFFFF"/>
    <circle cx="6" cy="4.5" r="0.4" fill="#FFFFFF"/>
    <circle cx="2" cy="6" r="0.4" fill="#FFFFFF"/>
    <circle cx="4" cy="6" r="0.4" fill="#FFFFFF"/>
    <circle cx="6" cy="6" r="0.4" fill="#FFFFFF"/>
  </svg>
)

// Componente de Bandeira da Espanha
const SpainFlag = ({ className }) => (
  <svg className={className} viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="3.5" fill="#AA151B"/>
    <rect width="20" height="7" y="3.5" fill="#F1BF00"/>
    <rect width="20" height="3.5" y="10.5" fill="#AA151B"/>
  </svg>
)

// Função para obter o componente de bandeira baseado no idioma
const getFlagComponent = (lang) => {
  switch (lang) {
    case 'pt':
      return BrazilFlag
    case 'en':
      return USAFlag
    case 'es':
      return SpainFlag
    default:
      return USAFlag
  }
}

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (lang) => {
    changeLanguage(lang)
    setIsOpen(false)
  }

  const CurrentFlag = getFlagComponent(language)

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="language-selector__button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <CurrentFlag className="language-selector__flag" />
        <span className="language-selector__arrow">▼</span>
      </button>

      {isOpen && (
        <ul className="language-selector__dropdown">
          {supportedLanguages.map((lang) => {
            const FlagComponent = getFlagComponent(lang)
            return (
              <li key={lang}>
                <button
                  className={`language-selector__option ${
                    lang === language ? 'active' : ''
                  }`}
                  onClick={() => handleLanguageChange(lang)}
                >
                  <div className="language-selector__flag-wrapper">
                    <FlagComponent className="language-selector__flag" />
                    <span className="language-selector__name">{getLanguageName(lang)}</span>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default LanguageSelector

