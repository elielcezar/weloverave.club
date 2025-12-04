import { Inter } from 'next/font/google'
import Script from 'next/script'
import TopBar from '@/components/Header/TopBar'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import LanguageProviderWrapper from '@/components/LanguageProviderWrapper'
import { fetchCategorias } from '@/services/api'
import { defaultLanguage } from '@/utils/translations'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WeLoveRave - Electronic Music News',
  description: 'Your definitive source for electronic music news, festivals, reviews and releases',
}

export default async function RootLayout({ children, params }) {
  // Tentar extrair idioma de params (pode não estar disponível no layout raiz)
  // Se não estiver disponível, usar defaultLanguage
  let language = defaultLanguage
  
  try {
    const resolvedParams = await params
    if (resolvedParams?.lang) {
      language = resolvedParams.lang
    }
  } catch (error) {
    // params pode não estar disponível no layout raiz
    language = defaultLanguage
  }

  // Buscar categorias no servidor (sem CORS)
  const categorias = await fetchCategorias(language)
  
  // Map categorias to extract the translation and create slugs
  /*const categoriasMapped = categorias.map(categoria => {
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
  })*/

  return (
    <html lang={language}>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-816RLJY366"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-816RLJY366');
          `}
        </Script>
        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7864415239368120"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          async
        />
        <LanguageProviderWrapper>
          
          <TopBar />
          
          <Header categorias={categorias} />
          
          {children}
          
          <Footer />
        
        </LanguageProviderWrapper>
      </body>
    </html>
  )
}

