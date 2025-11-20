import HeroSection from '@/components/Hero/HeroSection'
import MainContent from '@/components/MainContent/MainContent'
import { fetchPosts } from '@/services/api'

export default async function Home() {
  const posts = await fetchPosts()

  return (
    <main>
      <HeroSection posts={posts} />
      <MainContent posts={posts} />
    </main>
  )
}

