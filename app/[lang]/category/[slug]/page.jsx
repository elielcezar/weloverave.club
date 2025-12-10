import React from 'react'
import Link from 'next/link'
import HeroSection from '@/components/Hero/HeroSection'
import Sidebar from '@/components/Sidebar/Sidebar'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import PostsList from '@/components/PostsList/PostsList'
import { fetchPosts, fetchCategorias } from '@/services/api'
import { supportedLanguages, getTranslation, getHomeUrl } from '@/utils/translations'
import { notFound } from 'next/navigation'
import '../../../posts/posts.css'

export async function generateMetadata({ params }) {
    const { lang, slug } = await params

    if (!supportedLanguages.includes(lang)) {
        return { title: 'Not Found' }
    }

    const categorias = await fetchCategorias(lang)
    const categoria = categorias.find(c => c.slug === slug)
    const categoryName = categoria?.nome || slug

    return {
        title: `${categoryName} | WeLoveRave`,
        description: `Electronic music news about ${categoryName}`,
    }
}

export default async function CategoryPage({ params }) {
    const { lang, slug } = await params

    if (!supportedLanguages.includes(lang)) {
        notFound()
    }

    const posts = await fetchPosts(lang)
    const categorias = await fetchCategorias(lang)

    // Find the category by slug
    const categoria = categorias.find(c => c.slug === slug)
    const categoriaNome = categoria?.nome || slug

    // Normalize function for comparison
    const normalizeCategory = (cat) => {
        if (!cat) return ''
        return cat
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
    }

    // Filter posts by category
    const filteredPosts = posts.filter(post => {
        if (!post.category) return false
        const postCategoryNormalized = normalizeCategory(post.category)
        const searchCategoryNormalized = normalizeCategory(categoriaNome)
        const exactMatch = postCategoryNormalized === searchCategoryNormalized
        const containsMatch = postCategoryNormalized.includes(searchCategoryNormalized) ||
            searchCategoryNormalized.includes(postCategoryNormalized)
        return exactMatch || containsMatch
    })

    const t = (key) => getTranslation(key, lang)

    return (
        <main className="posts-page">
            <HeroSection
                posts={posts}
                categoria={categoriaNome}
                showCategoryTitle={true}
                lang={lang}
            />
            <div className="container-wide">
                <div className="posts-page-layout">
                    <div className="posts-page-main">
                        <SectionTitle
                            title={categoriaNome}
                            subtitle={`${filteredPosts.length} ${filteredPosts.length === 1 ? 'Post' : 'Posts'}`}
                        />
                        {filteredPosts.length > 0 ? (
                            <PostsList posts={filteredPosts} layout="list" lang={lang} />
                        ) : (
                            <div className="no-posts">
                                <p>{t('common.noPostsCategory')}</p>
                                <Link href={getHomeUrl(lang)} className="back-link">
                                    {t('common.backToAll')}
                                </Link>
                            </div>
                        )}
                    </div>
                    <aside className="posts-page-sidebar">
                        <Sidebar posts={filteredPosts} lang={lang} />
                    </aside>
                </div>
            </div>
        </main>
    )
}
