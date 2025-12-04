import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    
    // Requisição server-to-server (sem CORS)
    const response = await fetch('https://cms.ecwd.cloud/api/categorias', {
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache no servidor por 1 hora
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      throw new Error(`CMS API returned ${response.status}`)
    }

    const data = await response.json()
    
    // Mapear categorias conforme o idioma
    const mappedData = data.map(categoria => {
      const translation = categoria.translations?.find(t => t.idioma === lang) || categoria.translations?.[0]
      const nome = translation?.nome || 'Categoria'
      const slug = nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      return {
        id: categoria.id,
        nome: nome,
        slug: slug || 'categoria',
        idioma: lang
      }
    })

    return NextResponse.json(mappedData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Error fetching categorias:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categorias', details: error.message },
      { status: 500 }
    )
  }
}

