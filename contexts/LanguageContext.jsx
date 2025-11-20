'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { defaultLanguage, supportedLanguages } from '@/utils/translations'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children, initialLang = null }) => {
  const router = useRouter()
  const pathname = usePathname()
  
  // Initialize with a valid language immediately
  const getInitialLanguage = () => {
    if (initialLang && supportedLanguages.includes(initialLang)) {
      return initialLang
    }
    
    if (typeof window !== 'undefined') {
      // Try localStorage first on client
      const savedLang = localStorage.getItem('language')
      if (savedLang && supportedLanguages.includes(savedLang)) {
        return savedLang
      }
    }
    
    // Try URL
    const pathLang = pathname?.split('/')[1]
    if (supportedLanguages.includes(pathLang)) {
      return pathLang
    }
    
    return defaultLanguage
  }
  
  const [language, setLanguage] = useState(getInitialLanguage)
  const [isLoading, setIsLoading] = useState(false)

  // Sync with URL changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Try to get from URL first
      const pathLang = pathname?.split('/')[1]
      if (supportedLanguages.includes(pathLang) && pathLang !== language) {
        setLanguage(pathLang)
        localStorage.setItem('language', pathLang)
        return
      }

      // Ensure localStorage is synced
      if (language && supportedLanguages.includes(language)) {
        localStorage.setItem('language', language)
      }
    }
  }, [pathname, language])

  const changeLanguage = (newLang) => {
    if (!supportedLanguages.includes(newLang)) {
      console.warn(`Unsupported language: ${newLang}`)
      return
    }

    setLanguage(newLang)
    localStorage.setItem('language', newLang)

    // Update URL to reflect new language
    const currentPath = pathname || ''
    const pathParts = currentPath.split('/').filter(Boolean)
    
    // Remove old language prefix if exists
    if (supportedLanguages.includes(pathParts[0])) {
      pathParts.shift()
    }

    // Build new path with new language
    const newPath = `/${newLang}${pathParts.length > 0 ? '/' + pathParts.join('/') : ''}`
    
    router.push(newPath)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}

