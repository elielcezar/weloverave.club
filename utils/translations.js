import ptTranslations from '@/locales/pt.json'
import enTranslations from '@/locales/en.json'
import esTranslations from '@/locales/es.json'

const translations = {
  pt: ptTranslations,
  en: enTranslations,
  es: esTranslations
}

export const getTranslation = (key, lang = 'en') => {
  const keys = key.split('.')
  let value = translations[lang] || translations.en
  
  for (const k of keys) {
    value = value?.[k]
    if (value === undefined) {
      // Fallback to English if translation not found
      value = translations.en
      for (const k2 of keys) {
        value = value?.[k2]
        if (value === undefined) return key
      }
      break
    }
  }
  
  return value || key
}

export const getLanguageName = (lang) => {
  const names = {
    pt: 'Português',
    en: 'English',
    es: 'Español'
  }
  return names[lang] || lang
}

export const supportedLanguages = ['pt', 'en', 'es']
export const defaultLanguage = 'en'

// Helper function to get home URL based on language
export const getHomeUrl = (lang) => {
  if (lang === 'en') return '/'
  return `/${lang}`
}

