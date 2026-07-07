'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useLanguage } from '@/lib/i18n/language-context'
import { getArticleBySlug, getArticles } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import {
  Clock,
  User,
  FileText,
  ArrowLeft,
  ChevronLeft,
  Share2,
  Calendar,
  Tag,
  Home,
} from 'lucide-react'
import type { Article } from '@/lib/types'

export default function BlogDetailPage() {
  const { t, language, dir } = useLanguage()
  const params = useParams()
  const slug = params?.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [related, setRelated] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getArticleBySlug(slug).then(res => {
      if (res.success && res.data) {
        setArticle(res.data)
        // Inject Article JSON-LD for SEO
        const existing = document.getElementById('article-ld-json')
        if (existing) existing.remove()
        const script = document.createElement('script')
        script.id = 'article-ld-json'
        script.type = 'application/ld+json'
        script.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: res.data.title,
          description: res.data.excerpt,
          author: { '@type': 'Person', name: res.data.author },
          datePublished: res.data.publishedAt,
          image: `${window.location.origin}/og-image.png`,
          publisher: {
            '@type': 'Organization',
            name: 'ArvandSmartControl',
            logo: { '@type': 'ImageObject', url: `${window.location.origin}/icon.svg` },
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': window.location.href },
        })
        document.head.appendChild(script)
        // Load related articles from same category
        getArticles().then(rel => {
          if (rel.success && rel.data) {
            setRelated(
              rel.data
                .filter(a => a.category === res.data!.category && a.id !== res.data!.id)
                .slice(0, 3)
            )
          }
        })
      }
      setLoading(false)
    })
  }, [slug])

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

  const getContent = (article: Article) =>
    language === 'fa' ? article.content :
    language === 'ar' ? article.content_ar || article.content :
    article.content_en || article.content

  const getTitle = (article: Article) =>
    language === 'fa' ? article.title :
    language === 'ar' ? article.title_ar || article.title :
    article.title_en || article.title

  const getExcerpt = (article: Article) =>
    language === 'fa' ? article.excerpt :
    language === 'ar' ? article.excerpt_ar || article.excerpt :
    article.excerpt_en || article.excerpt

  const getAuthor = (article: Article) =>
    language === 'fa' ? article.author :
    language === 'ar' ? article.author_ar || article.author :
    article.author_en || article.author

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: getTitle(article!), url })
    } else {
      await navigator.clipboard.writeText(url)
      alert(t('blog.share'))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground/50">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <FileText className="w-16 h-16 text-muted-foreground/20 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-3">{t('blog.notFound')}</h1>
          <p className="text-sm text-muted-foreground/70 mb-6">
            {t('common.noData')}
          </p>
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              {t('common.back')}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Nav */}
      <div className="border-b border-border/40 bg-background/70 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <ChevronLeft className="w-3.5 h-3.5 text-primary rtl:rotate-180" />
            </div>
            <span className="text-sm text-muted-foreground/70 group-hover:text-foreground transition-colors">
              {t('common.back')}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-xs text-muted-foreground/70 gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              {t('blog.share') || 'Share'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Category + Meta header */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
            <span className={`inline-block px-3 py-1 rounded-md text-[10px] data-text tracking-wider border ${getCategoryColor(article.category)}`}>
              {t(`articles.category.${article.category}`).toUpperCase()}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.publishedAt).toLocaleDateString(
                language === 'fa' ? 'fa-IR' : language === 'ar' ? 'ar-SA' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
              <Clock className="w-3.5 h-3.5" />
              {t('articles.readTime').replace('{minutes}', String(article.readTime))}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-4">
            {getTitle(article)}
          </h1>

          {/* Excerpt */}
          <p className="text-base sm:text-lg text-muted-foreground/70 leading-relaxed mb-6">
            {getExcerpt(article)}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 pb-8 mb-8 border-b border-border/30">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground/90">{getAuthor(article)}</p>
              <p className="text-[10px] data-text text-muted-foreground/40 tracking-wider">
                {t('blog.author')}
              </p>
            </div>
          </div>

          {/* Cover Image */}
          {article.coverImage && (
            <div className="mb-8 sm:mb-10 rounded-2xl overflow-hidden border border-border/20">
              <img
                src={article.coverImage}
                alt={getTitle(article)}
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-sm sm:prose-base max-w-none dark:prose-invert
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground/80 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground/90
              prose-ul:text-muted-foreground/80
              prose-ol:text-muted-foreground/80
              prose-li:my-1
              prose-code:text-xs prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-card prose-pre:border prose-pre:border-border/30
              prose-img:rounded-xl prose-img:border prose-img:border-border/20
              rtl:text-right"
            dir={dir}
            dangerouslySetInnerHTML={{ __html: getContent(article) }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-border/30">
              <Tag className="w-4 h-4 text-muted-foreground/40" />
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs bg-card border border-border/30 text-muted-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.article>

        {/* Related Articles */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 sm:mt-20"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6 sm:mb-8">
              {t('blog.related')}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {related.map((rel, i) => (
                <Link key={rel.id} href={`/blog/${rel.slug}`} className="block group">
                  <article className="card-command p-5 h-full flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <FileText className="w-4 h-4 text-muted-foreground/30" />
                      <span className={`px-2 py-0.5 rounded text-[9px] data-text tracking-wider border ${getCategoryColor(rel.category)}`}>
                        {t(`articles.category.${rel.category}`).toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {getTitle(rel)}
                    </h3>
                    <p className="text-xs text-muted-foreground/70 leading-relaxed line-clamp-2 flex-1">
                      {getExcerpt(rel)}
                    </p>
                    <div className="flex items-center justify-between text-[9px] data-text text-muted-foreground/40 pt-3 mt-3 border-t border-border/30 tracking-wider">
                      <span className="flex items-center gap-1">
                        <User className="w-2.5 h-2.5" />
                        {getAuthor(rel)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {t('articles.readTime').replace('{minutes}', String(rel.readTime))}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Back to blog */}
        <div className="text-center mt-12 sm:mt-16">
          <Link href="/blog">
            <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/5">
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              {t('blog.back')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/20 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <p className="text-[10px] sm:text-xs text-muted-foreground/40">
            &copy; {new Date().getFullYear()} ArvandSmartControl
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[10px] sm:text-xs text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/blog" className="text-[10px] sm:text-xs text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors">
              {t('blog.title')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
