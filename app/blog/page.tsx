import { Metadata } from 'next'
import articlesData from '@/data/articles.json'
import { BlogListClient } from './blog-list-client'
import type { Article } from '@/lib/types'

const BASE_URL = 'https://arvandsmart.vercel.app'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles and insights about chiller monitoring, HVAC optimization, predictive maintenance, and IoT building management from ArvandSmartControl.',
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog | ArvandSmartControl',
    description:
      'Articles and insights about chiller monitoring, HVAC optimization, predictive maintenance, and IoT building management.',
    url: `${BASE_URL}/blog`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | ArvandSmartControl',
    description:
      'Articles and insights about chiller monitoring, HVAC optimization, predictive maintenance, and IoT building management.',
  },
}

export default function BlogPage() {
  const initialArticles = (articlesData.articles as Article[]) || []

  return (
    <>
      {/* Server-side CollectionPage JSON-LD (SEO) */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Blog | ArvandSmartControl',
            description:
              'Articles and insights about chiller monitoring, HVAC optimization, predictive maintenance, and IoT building management.',
            url: `${BASE_URL}/blog`,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: initialArticles.map((a, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${BASE_URL}/blog/${a.slug}`,
                name: a.title,
              })),
            },
            publisher: {
              '@type': 'Organization',
              name: 'ArvandSmartControl',
              url: BASE_URL,
            },
          }),
        }}
      />
      <BlogListClient initialArticles={initialArticles} />
    </>
  )
}
