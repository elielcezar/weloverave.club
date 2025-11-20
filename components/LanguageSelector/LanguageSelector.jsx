'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getLanguageName, supportedLanguages } from '@/utils/translations'
import './LanguageSelector.css'

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

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="language-selector__button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="language-selector__current">
          {language.toUpperCase()}
        </span>
        <span className="language-selector__arrow">▼</span>
      </button>

      {isOpen && (
        <ul className="language-selector__dropdown">
          {supportedLanguages.map((lang) => (
            <li key={lang}>
              <button
                className={`language-selector__option ${
                  lang === language ? 'active' : ''
                }`}
                onClick={() => handleLanguageChange(lang)}
              >
                <span className="language-selector__code">{lang.toUpperCase()}</span>
                <span className="language-selector__name">{getLanguageName(lang)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LanguageSelector

