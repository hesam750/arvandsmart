import type { MetadataRoute } from 'next'
import articlesData from '@/data/articles.json'

const BASE_URL = 'https://arvandsmart.com'

export default function sitemap(): MetadataRoute.Sitemap {
  // Dynamic blog slugs from data
  const blogPages: MetadataRoute.Sitemap = articlesData.articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.1 },
  ]

  return [...staticPages, ...blogPages]
}
