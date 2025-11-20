export const fetchCategorias = async (lang = 'pt') => {
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
            return {
                id: categoria.id,
                nome: translation?.nome || 'Categoria',
                slug: translation?.nome?.toLowerCase().replace(/\s+/g, '-') || 'categoria',
                idioma: lang
            };
        });
    } catch (error) {
        console.error('Error fetching categorias:', error);
        return [];
    }
};

export const fetchPosts = async () => {
    try {
        const response = await fetch('https://cms.ecwd.cloud/api/posts?lang=pt', {
            next: { revalidate: 60 } // Revalidate every 60 seconds
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        return data.map(mapPost);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
};

export const fetchPostById = async (id) => {
    try {
        const posts = await fetchPosts();
        const post = posts.find(p => p.id === parseInt(id));
        return post || null;
    } catch (error) {
        console.error('Error fetching post by id:', error);
        return null;
    }
};

export const fetchPostBySlug = async (slug) => {
    try {
        const posts = await fetchPosts();
        // Remove 'pt/' prefix if present and normalize slug
        const normalizedSlug = slug.replace(/^pt\//, '').trim();
        const post = posts.find(p => {
            if (!p.slug) return false;
            // Remove 'pt/' prefix from post slug if present
            const postSlug = p.slug.replace(/^pt\//, '').trim();
            return postSlug === normalizedSlug || p.slug === slug;
        });
        return post || null;
    } catch (error) {
        console.error('Error fetching post by slug:', error);
        return null;
    }
};

export const fetchRelatedPosts = async (currentPostId, limit = 3) => {
    try {
        const posts = await fetchPosts();
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

const mapPost = (apiPost) => {
    // Extract the first image if available, otherwise use a placeholder
    let image = 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80'; // Default fallback
    if (apiPost.imagens && apiPost.imagens.length > 0) {
        image = apiPost.imagens[0];
    }

    // Map category - categorias is an array
    let category = 'Geral';
    let categoryColor = 'blue';
    
    if (apiPost.categorias && apiPost.categorias.length > 0) {
        category = apiPost.categorias[0].nome;
        // Map category color based on category name
        const categoryLower = category.toLowerCase();
        if (categoryLower.includes('festival') || categoryLower.includes('festivais')) {
            categoryColor = 'pink';
        } else if (categoryLower.includes('dj') || categoryLower.includes('djs')) {
            categoryColor = 'blue';
        } else if (categoryLower.includes('lançamento') || categoryLower.includes('release')) {
            categoryColor = 'red';
        } else if (categoryLower.includes('notícia') || categoryLower.includes('news') || categoryLower.includes('noticias')) {
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

    // Format date
    let date = 'Data não disponível';
    if (apiPost.dataPublicacao) {
        const dateObj = new Date(apiPost.dataPublicacao);
        const formatted = dateObj.toLocaleDateString('pt-BR', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
        // Capitalize first letter of month
        date = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }

    // Calculate read time (approximate: 200 words per minute)
    const wordCount = apiPost.conteudo ? apiPost.conteudo.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
        id: apiPost.id,
        title: apiPost.titulo || 'Sem título',
        excerpt: apiPost.chamada || '',
        content: apiPost.conteudo || '',
        image: image,
        category: category,
        categoryColor: categoryColor,
        author: 'WeLoveRave Team',
        authorImage: 'https://i.pravatar.cc/150?img=12',
        date: date,
        slug: apiPost.urlAmigavel ? apiPost.urlAmigavel.replace(/^pt\//, '') : '',
        featured: apiPost.destaque || false,
        tags: tags,
        comments: 0, // API doesn't provide comments count
        readTime: `${readTime} min`,
        status: apiPost.status || 'PUBLICADO'
    };
};
