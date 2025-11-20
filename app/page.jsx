import { redirect } from 'next/navigation'
import { defaultLanguage } from '@/utils/translations'

export default function RootPage() {
  // Redirect to default language
  redirect(`/${defaultLanguage}`)
}

