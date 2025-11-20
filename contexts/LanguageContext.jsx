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
    
    // Try URL first
    const pathSegments = pathname?.split('/').filter(Boolean)
    const firstSegment = pathSegments[0]
    
    if (supportedLanguages.includes(firstSegment)) {
      return firstSegment
    } else if (pathname === '/' || !firstSegment) {
      // Root path → English (default)
      return defaultLanguage
    }
    
    if (typeof window !== 'undefined') {
      // Try localStorage as fallback
      const savedLang = localStorage.getItem('language')
      if (savedLang && supportedLanguages.includes(savedLang)) {
        return savedLang
      }
    }
    
    return defaultLanguage
  }
  
  const [language, setLanguage] = useState(getInitialLanguage)
  const [isLoading, setIsLoading] = useState(false)

  // Sync with URL changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Try to get from URL first
      const pathSegments = pathname?.split('/').filter(Boolean)
      const firstSegment = pathSegments[0]
      
      let detectedLang = defaultLanguage
      if (supportedLanguages.includes(firstSegment)) {
        detectedLang = firstSegment
      } else if (pathname === '/' || !firstSegment) {
        detectedLang = defaultLanguage
      }
      
      if (detectedLang !== language) {
        setLanguage(detectedLang)
        localStorage.setItem('language', detectedLang)
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
    // For English, use root path if it's home, otherwise use /en/ prefix
    let newPath
    if (newLang === 'en') {
      // If it's home (no path parts), use root
      if (pathParts.length === 0) {
        newPath = '/'
      } else {
        // Otherwise use /en/ prefix for posts
        newPath = `/${newLang}/${pathParts.join('/')}`
      }
    } else {
      // For pt/es, always use prefix
      newPath = `/${newLang}${pathParts.length > 0 ? '/' + pathParts.join('/') : ''}`
    }
    
    router.push(newPath)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}

