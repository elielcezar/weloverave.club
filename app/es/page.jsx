import HomePageContent from '@/components/HomePageContent/HomePageContent'
import { getTranslation } from '@/utils/translations'

export async function generateMetadata() {
  const t = (key) => getTranslation(key, 'es')
  return {
    title: 'EDM News - Noticias sobre Música Electrónica',
    description: 'Tu fuente definitiva para noticias sobre música electrónica, festivales, reviews y lanzamientos',
  }
}

export default async function HomePageES({ searchParams }) {
  const resolvedSearchParams = await searchParams
  return <HomePageContent lang="es" searchParams={resolvedSearchParams} />
}

