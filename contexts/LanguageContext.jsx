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

  const changeLanguage = async (newLang) => {
    if (!supportedLanguages.includes(newLang)) {
      console.warn(`Unsupported language: ${newLang}`)
      return
    }

    const previousLang = language // Save current language before changing
    setLanguage(newLang)
    localStorage.setItem('language', newLang)

    // Update URL to reflect new language
    const currentPath = pathname || ''
    const pathParts = currentPath.split('/').filter(Boolean)

    // Remove old language prefix if exists
    if (supportedLanguages.includes(pathParts[0])) {
      pathParts.shift()
    }

    // Check if we're on a category page (/category/slug)
    let newPath
    if (pathParts[0] === 'category' && pathParts[1]) {
      const currentCategorySlug = pathParts[1]
      let translatedSlug = currentCategorySlug

      try {
        // Fetch categories in previous language to find the category ID
        const currentResponse = await fetch(`/api/categorias?lang=${previousLang}`)

        if (currentResponse.ok) {
          const currentCategorias = await currentResponse.json()
          const currentCategoria = currentCategorias.find(c => c.slug === currentCategorySlug)

          if (currentCategoria) {
            // Fetch categories in new language to get the translated slug
            const newResponse = await fetch(`/api/categorias?lang=${newLang}`)

            if (newResponse.ok) {
              const newCategorias = await newResponse.json()
              const newCategoria = newCategorias.find(c => c.id === currentCategoria.id)

              if (newCategoria) {
                translatedSlug = newCategoria.slug
              }
            }
          }
        }
      } catch (error) {
        console.error('Error translating category:', error)
      }

      // Build new category path (always with language prefix)
      newPath = `/${newLang}/category/${translatedSlug}`
    } else if (pathParts.length > 0) {
      // Post page - translate the slug
      const currentPostSlug = pathParts[0]
      let translatedSlug = currentPostSlug

      try {
        // Use the translate-slug API to get the translated slug
        const response = await fetch(`/api/translate-slug?slug=${encodeURIComponent(currentPostSlug)}&from=${previousLang}&to=${newLang}`)

        if (response.ok) {
          const data = await response.json()
          if (data.translatedSlug) {
            translatedSlug = data.translatedSlug
          }
        }
      } catch (error) {
        console.error('Error translating post slug:', error)
      }

      newPath = `/${newLang}/${translatedSlug}`
    } else {
      // Home page
      newPath = `/${newLang}`
    }

    // Navigate without scrolling to top
    router.push(newPath, { scroll: false })
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}
