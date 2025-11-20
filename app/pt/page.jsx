import HomePageContent from '@/components/HomePageContent/HomePageContent'
import { getTranslation } from '@/utils/translations'

export async function generateMetadata() {
  const t = (key) => getTranslation(key, 'pt')
  return {
    title: 'EDM News - Notícias sobre Música Eletrônica',
    description: 'Sua fonte definitiva para notícias sobre música eletrônica, festivais, reviews e lançamentos',
  }
}

export default async function HomePagePT({ searchParams }) {
  const resolvedSearchParams = await searchParams
  return <HomePageContent lang="pt" searchParams={resolvedSearchParams} />
}

