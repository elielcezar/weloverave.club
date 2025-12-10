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
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7864415239368120"
          crossOrigin="anonymous"
        />        
      </head>      
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
        {/* Metricool Tracker */}
        <Script id="metricool-tracker" strategy="afterInteractive">
          {`function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"a5add28b156761666fc4a4d68ebe5456"})});`}
        </Script>
        {/* Beehiiv Newsletter */}
        <Script 
          src="https://subscribe-forms.beehiiv.com/embed.js" 
          strategy="afterInteractive"
        />
       
        <LanguageProviderWrapper>
          <TopBar />          
          <Header />
          {children}
          <Footer />
        </LanguageProviderWrapper>

      </body>
    </html>
  )
}

