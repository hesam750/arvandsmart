import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import articlesData from '@/data/articles.json'
import { BlogDetailClient } from './blog-detail-client'
import type { Article } from '@/lib/types'

const BASE_URL = 'https://arvandsmart.vercel.app'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = (articlesData.articles as Article[]).find((a) => a.slug === slug)
  if (!article) return {}

  const title = article.title
  const description = article.excerpt || (article as any).excerpt_en
  const imageUrl = article.coverImage || `${BASE_URL}/og-image.png`

  return {
    title,
    description,
    keywords: article.tags,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      authors: [article.author],
      url: `${BASE_URL}/blog/${slug}`,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = (articlesData.articles as Article[]).find((a) => a.slug === slug)
  if (!article) notFound()

  const imageUrl = article.coverImage || `${BASE_URL}/og-image.png`
  const timeRequired = `PT${article.readTime}M`

  return (
    <>
      {/* Article breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
              { '@type': 'ListItem', position: 3, name: article.title, item: `${BASE_URL}/blog/${slug}` },
            ],
          }),
        }}
      />
      {/* Server-side Article JSON-LD (BlogPosting) — ensures indexing engines see structured data in initial HTML */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.excerpt,
            articleSection: article.category,
            keywords: article.tags.join(', '),
            timeRequired: timeRequired,
            author: {
              '@type': 'Person',
              name: article.author,
            },
            datePublished: article.publishedAt,
            image: {
              '@type': 'ImageObject',
              url: imageUrl,
              width: 1200,
              height: 630,
            },
            publisher: {
              '@type': 'Organization',
              name: 'ArvandSmartControl',
              logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/icon.svg`,
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${BASE_URL}/blog/${slug}`,
            },
          }),
        }}
      />
      <BlogDetailClient initialArticle={article} slug={slug} />
    </>
  )
}
