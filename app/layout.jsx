import { Inter } from 'next/font/google'
import Script from 'next/script'
import TopBar from '@/components/Header/TopBar'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import LanguageProviderWrapper from '@/components/LanguageProviderWrapper'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WeLoveRave - Electronic Music News',
  description: 'Your definitive source for electronic music news, festivals, reviews and releases',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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

          {/* Header carrega categorias dinamicamente baseado no idioma atual */}
          <Header />

          {children}

          <Footer />

        </LanguageProviderWrapper>
      </body>
    </html>
  )
}

