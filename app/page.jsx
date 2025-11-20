import HomePageContent from '@/components/HomePageContent/HomePageContent'

export async function generateMetadata() {
  return {
    title: 'EDM News - Electronic Music News',
    description: 'Your definitive source for electronic music news, festivals, reviews and releases',
  }
}

export default async function RootPage({ searchParams }) {
  const resolvedSearchParams = await searchParams
  return <HomePageContent lang="en" searchParams={resolvedSearchParams} />
}

