'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, User, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n/language-context'
import type { Article } from '@/lib/types'
import { getFeaturedArticles } from '@/lib/data-service'

export function ArticlesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { t, language } = useLanguage()
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    getFeaturedArticles().then(res => {
      if (res.success && res.data) {
        setArticles(res.data.slice(0, 3))
      }
    })
  }, [])

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      technology: 'bg-primary/10 text-primary border-primary/20',
      maintenance: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
      industry: 'bg-chart-3/10 text-chart-3 border-chart-3/20',
      tutorial: 'bg-chart-2/10 text-chart-2 border-chart-2/20',
      news: 'bg-chart-5/10 text-chart-5 border-chart-5/20',
    }
    return colors[cat] || 'bg-primary/10 text-primary border-primary/20'
  }

  return (
    <section id="articles" className="relative section-py px-4 overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute top-1/3 right-0 w-px h-96 bg-gradient-to-b from-transparent via-accent/15 to-transparent" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="section-glow max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs data-text tracking-wider uppercase mb-6 text-primary/80">
            <span className="glow-dot text-chart-3" />
            {t('articles.badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
            {t('articles.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed font-mono">
            {t('articles.subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {articles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="card-command p-6 h-full flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all">
                    {/* Icon + Category */}
                    <div className="flex items-center justify-between mb-4">
                      <FileText className="w-5 h-5 text-muted-foreground/30" />
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] data-text tracking-wider border ${getCategoryColor(article.category)}`}>
                        {(language === 'fa' ? article.category : article.category).toUpperCase()}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2 text-foreground/90">
                      {language === 'fa' ? article.title : article.title_en}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground/70 leading-relaxed mb-4 line-clamp-3 flex-1">
                      {language === 'fa' ? article.excerpt : article.excerpt_en}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-[10px] data-text text-muted-foreground/40 pt-4 border-t border-border/30 tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3 h-3" />
                        {language === 'fa' ? article.author : article.author_en}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {t('articles.readTime').replace('{minutes}', String(article.readTime))}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground/50 data-text tracking-wider text-sm">
            {t('articles.noArticles')}
          </div>
        )}

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/blog">
            <Button variant="outline" className="px-6 border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground">
              {t('articles.all')}
              <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
