export const fetchCategorias = async (lang = 'en') => {
    try {
        const response = await fetch('https://cms.ecwd.cloud/api/categorias', {
            next: { revalidate: 3600 } // Revalidate every hour (categories don't change often)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch categorias');
        }

        const data = await response.json();
        
        // Map categorias to extract the translation for the specified language
        return data.map(categoria => {
            const translation = categoria.translations?.find(t => t.idioma === lang) || categoria.translations?.[0];
            const nome = translation?.nome || 'Categoria';
            // Create slug: lowercase, replace spaces with hyphens, remove accents
            const slug = nome
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '');
            return {
                id: categoria.id,
                nome: nome,
                slug: slug || 'categoria',
                idioma: lang
            };
        });
    } catch (error) {
        console.error('Error fetching categorias:', error);
        return [];
    }
};

export const fetchPosts = async (lang = 'en') => {
    try {
        const response = await fetch(`https://cms.ecwd.cloud/api/posts?lang=${lang}`, {
            next: { revalidate: 60 } // Revalidate every 60 seconds
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        return data.map(post => mapPost(post, lang));
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
};

export const fetchPostById = async (id, lang = 'en') => {
    try {
        const posts = await fetchPosts(lang);
        const post = posts.find(p => p.id === parseInt(id));
        return post || null;
    } catch (error) {
        console.error('Error fetching post by id:', error);
        return null;
    }
};

export const fetchPostBySlug = async (slug, lang = 'en') => {
    try {
        // Normalize slug from URL - remove language prefix if present
        const normalizedSlug = slug.replace(/^(pt|en|es)\//, '').trim().toLowerCase();
        
        // First, try to find in the requested language
        // The API returns slugs with language prefix like "es/slug-here"
        let posts = await fetchPosts(lang);
        
        let post = posts.find(p => {
            if (!p.slug) return false;
            
            // Remove language prefix from API slug and normalize
            const postSlugNormalized = p.slug
                .replace(/^(pt|en|es)\//, '')
                .trim()
                .toLowerCase();
            
            // Exact match after normalization (most common case)
            if (postSlugNormalized === normalizedSlug) {
                return true;
            }
            
            // Try with language prefix match
            // If slug from URL has prefix, try exact match
            if (p.slug.toLowerCase() === `${lang}/${normalizedSlug}`) {
                return true;
            }
            
            // Try original slug match (case insensitive)
            if (p.slug.toLowerCase() === slug.toLowerCase() || 
                p.slug.toLowerCase() === `${lang}/${slug}`.toLowerCase()) {
                return true;
            }
            
            return false;
        });
        
        // If not found in requested language, try other languages
        // This handles cases where user accesses a post with slug from another language
        // Example: /es/ultra-buenos-aires-announces... (slug em inglês na rota espanhola)
        if (!post) {
            let foundPostId = null;
            
            // First, find the post in any language by slug to get the ID
            for (const otherLang of ['pt', 'en', 'es']) {
                if (otherLang === lang) continue;
                
                const otherPosts = await fetchPosts(otherLang);
                const foundPost = otherPosts.find(p => {
                    if (!p.slug) return false;
                    
                    // Remove language prefix from API slug and normalize
                    const postSlugNormalized = p.slug
                        .replace(/^(pt|en|es)\//, '')
                        .trim()
                        .toLowerCase();
                    
                    // Exact match after normalization
                    if (postSlugNormalized === normalizedSlug) {
                        return true;
                    }
                    
                    // Try with language prefix match
                    if (p.slug.toLowerCase() === `${otherLang}/${normalizedSlug}`) {
                        return true;
                    }
                    
                    // Try original slug match
                    if (p.slug.toLowerCase() === slug.toLowerCase() || 
                        p.slug.toLowerCase() === `${otherLang}/${slug}`.toLowerCase()) {
                        return true;
                    }
                    
                    return false;
                });
                
                if (foundPost) {
                    foundPostId = foundPost.id;
                    break;
                }
            }
            
            // If we found the post in another language, try to find it in requested language by ID
            if (foundPostId) {
                post = posts.find(p => p.id === foundPostId);
            }
        }
        
        return post || null;
    } catch (error) {
        console.error('Error fetching post by slug:', error);
        return null;
    }
};

export const fetchRelatedPosts = async (currentPostId, lang = 'en', limit = 3) => {
    try {
        const posts = await fetchPosts(lang);
        const currentPost = posts.find(p => p.id === currentPostId);

        if (!currentPost) return [];

        return posts
            .filter(post => post.id !== currentPostId && post.category === currentPost.category)
            .slice(0, limit);
    } catch (error) {
        console.error('Error fetching related posts:', error);
        return [];
    }
};

const mapPost = (apiPost, lang = 'en') => {
    // Extract the first image if available, otherwise use a placeholder
    let image = 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80'; // Default fallback
    if (apiPost.imagens && apiPost.imagens.length > 0) {
        image = apiPost.imagens[0];
    }

    // Map category - categorias is an array
    let category = 'General';
    let categoryColor = 'blue';
    
    if (apiPost.categorias && apiPost.categorias.length > 0) {
        category = apiPost.categorias[0].nome;
        // Map category color based on category name
        const categoryLower = category.toLowerCase();
        if (categoryLower.includes('festival') || categoryLower.includes('festivais')) {
            categoryColor = 'pink';
        } else if (categoryLower.includes('dj') || categoryLower.includes('djs')) {
            categoryColor = 'blue';
        } else if (categoryLower.includes('lançamento') || categoryLower.includes('release') || categoryLower.includes('lanzamiento')) {
            categoryColor = 'red';
        } else if (categoryLower.includes('notícia') || categoryLower.includes('news') || categoryLower.includes('noticias') || categoryLower.includes('noticia')) {
            categoryColor = 'purple';
        } else if (categoryLower.includes('review') || categoryLower.includes('reviews')) {
            categoryColor = 'purple';
        } else {
            categoryColor = 'blue';
        }
    }

    // Map tags - tags is an array of objects with {id, nome}
    const tags = apiPost.tags && apiPost.tags.length > 0 
        ? apiPost.tags.map(tag => tag.nome || tag)
        : [];

    // Format date based on language
    let date = 'Date not available';
    const dateFormats = {
        pt: 'pt-BR',
        en: 'en-US',
        es: 'es-ES'
    };
    
    if (apiPost.dataPublicacao) {
        const dateObj = new Date(apiPost.dataPublicacao);
        const locale = dateFormats[lang] || 'en-US';
        const formatted = dateObj.toLocaleDateString(locale, { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
        // Capitalize first letter
        date = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }

    // Calculate read time (approximate: 200 words per minute)
    const wordCount = apiPost.conteudo ? apiPost.conteudo.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    // Keep slug with language prefix as it comes from API
    const slug = apiPost.urlAmigavel || '';

    return {
        id: apiPost.id,
        title: apiPost.titulo || 'No title',
        excerpt: apiPost.chamada || '',
        content: apiPost.conteudo || '',
        image: image,
        category: category,
        categoryColor: categoryColor,
        author: 'WeLoveRave Team',
        authorImage: 'https://i.pravatar.cc/150?img=12',
        date: date,
        slug: slug,
        featured: apiPost.destaque || false,
        tags: tags,
        comments: 0, // API doesn't provide comments count
        readTime: `${readTime} min`,
        status: apiPost.status || 'PUBLICADO',
        translationsAvailable: apiPost.translationsAvailable || [],
        language: lang
    };
};
