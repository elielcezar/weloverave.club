'use client'

import { LanguageProvider } from '@/contexts/LanguageContext'
import { usePathname } from 'next/navigation'
import { supportedLanguages, defaultLanguage } from '@/utils/translations'

export default function LanguageProviderWrapper({ children }) {
  const pathname = usePathname()
  
  // Extract language from URL synchronously (works on both server and client)
  // Logic: / → en, /pt → pt, /es → es, /pt/slug → pt, /es/slug → es, /en/slug → en
  let initialLang = defaultLanguage
  
  if (typeof window !== 'undefined') {
    // Client-side: Try URL first, then localStorage
    const pathSegments = pathname?.split('/').filter(Boolean)
    const firstSegment = pathSegments[0]
    
    if (supportedLanguages.includes(firstSegment)) {
      initialLang = firstSegment
    } else if (pathname === '/' || !firstSegment) {
      // Root path or empty → English (default)
      initialLang = defaultLanguage
    } else {
      // Try localStorage as fallback
      const savedLang = localStorage.getItem('language')
      if (savedLang && supportedLanguages.includes(savedLang)) {
        initialLang = savedLang
      }
    }
  } else {
    // Server-side: Try to extract from pathname
    const pathSegments = pathname?.split('/').filter(Boolean)
    const firstSegment = pathSegments[0]
    
    if (supportedLanguages.includes(firstSegment)) {
      initialLang = firstSegment
    } else if (pathname === '/' || !firstSegment) {
      initialLang = defaultLanguage
    }
  }

  return (
    <LanguageProvider initialLang={initialLang}>
      {children}
    </LanguageProvider>
  )
}

