import { Inter } from 'next/font/google'
import TopBar from '@/components/Header/TopBar'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EDM News - Notícias sobre Música Eletrônica',
  description: 'Sua fonte definitiva para notícias, festivais, reviews e lançamentos de música eletrônica',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <TopBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

