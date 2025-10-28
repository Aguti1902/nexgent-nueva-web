import { useState, useEffect } from 'react'

export interface BlogArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  date: string
  read_time: string
  image_url: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export function useBlogArticles(publishedOnly = true) {
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchArticles()
  }, [publishedOnly])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const url = `/api/blog?published=${publishedOnly}`
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }

      const data = await response.json()
      setArticles(data.articles || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching articles:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  const createArticle = async (articleData: Partial<BlogArticle>) => {
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData)
      })

      if (!response.ok) {
        throw new Error('Failed to create article')
      }

      const data = await response.json()
      await fetchArticles() // Refresh list
      return data.article
    } catch (err) {
      console.error('Error creating article:', err)
      throw err
    }
  }

  const updateArticle = async (id: string, articleData: Partial<BlogArticle>) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData)
      })

      if (!response.ok) {
        throw new Error('Failed to update article')
      }

      const data = await response.json()
      await fetchArticles() // Refresh list
      return data.article
    } catch (err) {
      console.error('Error updating article:', err)
      throw err
    }
  }

  const togglePublishStatus = async (id: string, published: boolean) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published })
      })

      if (!response.ok) {
        throw new Error('Failed to update article status')
      }

      await fetchArticles() // Refresh list
    } catch (err) {
      console.error('Error updating article status:', err)
      throw err
    }
  }

  const deleteArticle = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete article')
      }

      await fetchArticles() // Refresh list
    } catch (err) {
      console.error('Error deleting article:', err)
      throw err
    }
  }

  return {
    articles,
    loading,
    error,
    fetchArticles,
    createArticle,
    updateArticle,
    togglePublishStatus,
    deleteArticle
  }
}

