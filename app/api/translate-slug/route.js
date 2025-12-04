import { fetchPosts } from '@/services/api'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// API route to find a post's ID by slug and get the translated slug for another language
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const slug = searchParams.get('slug')
        const fromLang = searchParams.get('from')
        const toLang = searchParams.get('to')

        if (!slug || !fromLang || !toLang) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
        }

        // Normalize slug from URL - remove language prefix if present
        const normalizedSlug = slug.replace(/^(pt|en|es)\//, '').trim().toLowerCase()

        // Fetch posts in source language to find the post by slug
        const sourcePosts = await fetchPosts(fromLang)

        const sourcePost = sourcePosts.find(p => {
            if (!p.slug) return false
            const postSlugNormalized = p.slug
                .replace(/^(pt|en|es)\//, '')
                .trim()
                .toLowerCase()
            return postSlugNormalized === normalizedSlug
        })

        if (!sourcePost) {
            return NextResponse.json({ error: 'Post not found', translatedSlug: null }, { status: 404 })
        }

        // Fetch posts in target language to find the translated version
        const targetPosts = await fetchPosts(toLang)

        const targetPost = targetPosts.find(p => p.id === sourcePost.id)

        if (!targetPost) {
            return NextResponse.json({ error: 'Translation not found', translatedSlug: null }, { status: 404 })
        }

        // Return the translated slug (without language prefix)
        const translatedSlug = targetPost.slug
            ? targetPost.slug.replace(/^(pt|en|es)\//, '').trim()
            : null

        return NextResponse.json({
            sourceId: sourcePost.id,
            translatedSlug: translatedSlug
        })

    } catch (error) {
        console.error('Error translating post slug:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
