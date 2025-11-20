'use client'

import { LanguageProvider } from '@/contexts/LanguageContext'
import { usePathname } from 'next/navigation'
import { supportedLanguages, defaultLanguage } from '@/utils/translations'

export default function LanguageProviderWrapper({ children }) {
  const pathname = usePathname()
  
  // Extract language from URL synchronously (works on both server and client)
  let initialLang = defaultLanguage
  
  if (typeof window !== 'undefined') {
    // Client-side: Try URL first, then localStorage
    const pathLang = pathname?.split('/')[1]
    if (supportedLanguages.includes(pathLang)) {
      initialLang = pathLang
    } else {
      const savedLang = localStorage.getItem('language')
      if (savedLang && supportedLanguages.includes(savedLang)) {
        initialLang = savedLang
      }
    }
  } else {
    // Server-side: Try to extract from pathname
    const pathLang = pathname?.split('/')[1]
    if (supportedLanguages.includes(pathLang)) {
      initialLang = pathLang
    }
  }

  return (
    <LanguageProvider initialLang={initialLang}>
      {children}
    </LanguageProvider>
  )
}

