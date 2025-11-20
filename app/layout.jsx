import { Inter } from 'next/font/google'
import TopBar from '@/components/Header/TopBar'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { fetchCategorias } from '@/services/api'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EDM News - Notícias sobre Música Eletrônica',
  description: 'Sua fonte definitiva para notícias, festivais, reviews e lançamentos de música eletrônica',
}

export default async function RootLayout({ children }) {
  // Fetch categorias on the server side to avoid CORS issues
  const categorias = await fetchCategorias('pt')
  
  // Map categorias to extract the Portuguese translation and create slugs
  const categoriasMapped = categorias.map(categoria => {
    const nome = categoria.nome || 'Categoria'
    const slug = nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    return {
      id: categoria.id,
      nome: nome,
      slug: slug || 'categoria'
    }
  })

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <TopBar />
        <Header categorias={categoriasMapped} />
        {children}
        <Footer />
      </body>
    </html>
  )
}

