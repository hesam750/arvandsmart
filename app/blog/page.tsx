'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/language-context'
import { getArticles } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import {
  Clock,
  User,
  FileText,
  ArrowLeft,
  Search,
  ChevronLeft,
  Calendar,
} from 'lucide-react'
import type { Article } from '@/lib/types'

export default function BlogPage() {
  const { t, language, dir } = useLanguage()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    getArticles().then(res => {
      if (res.success && res.data) setArticles(res.data)
      setLoading(false)
    })
  }, [])

  // Dynamic page title + meta description for SEO
  useEffect(() => {
    document.title = `${t('blog.title')} | ArvandSmartControl`
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', t('blog.subtitle'))
    // Inject BlogPosting JSON-LD for the listing page
    const existing = document.getElementById('blog-listing-ld-json')
    if (existing) existing.remove()
    const script = document.createElement('script')
    script.id = 'blog-listing-ld-json'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: t('blog.title'),
      description: t('blog.subtitle'),
      url: window.location.href,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: articles.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${window.location.origin}/blog/${a.slug}`,
        })),
      },
      publisher: {
        '@type': 'Organization',
        name: 'ArvandSmartControl',
        url: window.location.origin,
      },
    })
    document.head.appendChild(script)
  }, [articles, t])

  const categories = [
    { id: 'all', label: t('common.viewAll') },
    { id: 'technology', label: t('articles.category.technology') },
    { id: 'maintenance', label: t('articles.category.maintenance') },
    { id: 'industry', label: t('articles.category.industry') },
    { id: 'tutorial', label: t('articles.category.tutorial') },
    { id: 'news', label: t('articles.category.news') },
  ]

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      technology: 'bg-primary/10 text-primary border-primary/20',
      maintenance: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
      industry: 'bg-chart-3/10 text-chart-3 border-chart-3/20',
      tutorial: 'bg-chart-2/10 text-chart-2 border-chart-2/20',
      news: 'bg-destructive/10 text-destructive border-destructive/20',
    }
    return colors[cat] || 'bg-primary/10 text-primary border-primary/20'
  }

  const filtered = articles.filter(a => {
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.title_en || '').toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selectedCategory === 'all' || a.category === selectedCategory
    return matchSearch && matchCategory
  })

  const getTitle = (article: Article) => language === 'fa' ? article.title : language === 'ar' ? article.title_ar || article.title : article.title_en || article.title
  const getExcerpt = (article: Article) => language === 'fa' ? article.excerpt : language === 'ar' ? article.excerpt_ar || article.excerpt : article.excerpt_en || article.excerpt
  const getAuthor = (article: Article) => language === 'fa' ? article.author : language === 'ar' ? article.author_ar || article.author : article.author_en || article.author
  const getContent = (article: Article) => language === 'fa' ? article.content : language === 'ar' ? article.content_ar || article.content : article.content_en || article.content

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <div className="border-b border-border/40 bg-background/70 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <FileText className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-bold text-sm text-foreground/80">{t('blog.title')}</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground/70 gap-1.5">
              <ChevronLeft className="w-3.5 h-3.5" />
              {t('common.back')}
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground/70 leading-relaxed">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 sm:mb-10"
        >
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('common.search')}
              className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-border/40 bg-card text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-card border border-border/40 text-muted-foreground/70 hover:text-foreground hover:border-border'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-muted-foreground/50">{t('common.loading')}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground/50">{t('articles.noArticles')}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/blog/${article.slug}`} className="block group">
                  <article className="card-command p-5 sm:p-6 h-full flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all">
                    {/* Category badge */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground/30" />
                      <span className={`inline-block px-2 sm:px-2.5 py-1 rounded-md text-[9px] sm:text-[10px] data-text tracking-wider border ${getCategoryColor(article.category)}`}>
                        {t(`articles.category.${article.category}`).toUpperCase()}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2 text-foreground/90">
                      {getTitle(article)}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-muted-foreground/70 leading-relaxed mb-3 sm:mb-4 line-clamp-3 flex-1">
                      {getExcerpt(article)}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] data-text text-muted-foreground/40 pt-3 sm:pt-4 border-t border-border/30 tracking-wider">
                      <span className="flex items-center gap-1 sm:gap-1.5">
                        <User className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {getAuthor(article)}
                      </span>
                      <span className="flex items-center gap-1 sm:gap-1.5">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {t('articles.readTime').replace('{minutes}', String(article.readTime))}
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <p className="text-[10px] sm:text-xs text-muted-foreground/40">
            &copy; {new Date().getFullYear()} ArvandSmartControl
          </p>
          <Link href="/" className="text-[10px] sm:text-xs text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors">
            {t('nav.home')}
          </Link>
        </div>
      </footer>
    </div>
  )
}
