import { Inter } from 'next/font/google'
import TopBar from '@/components/Header/TopBar'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import LanguageProviderWrapper from '@/components/LanguageProviderWrapper'
import { fetchCategorias } from '@/services/api'
import { defaultLanguage } from '@/utils/translations'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EDM News - Electronic Music News',
  description: 'Your definitive source for electronic music news, festivals, reviews and releases',
}

export default async function RootLayout({ children }) {
  // Fetch categorias on the server side to avoid CORS issues
  // Use default language for initial load
  const categorias = await fetchCategorias(defaultLanguage)
  
  // Map categorias to extract the translation and create slugs
  const categoriasMapped = categorias.map(categoria => {
    const nome = categoria.nome || 'Category'
    const slug = nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    return {
      id: categoria.id,
      nome: nome,
      slug: slug || 'category'
    }
  })

  return (
    <html lang={defaultLanguage}>
      <body className={inter.className}>
        <LanguageProviderWrapper>
          <TopBar />
          <Header categorias={categoriasMapped} />
          {children}
          <Footer />
        </LanguageProviderWrapper>
      </body>
    </html>
  )
}

