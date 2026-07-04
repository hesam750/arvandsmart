'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, User, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import type { Article } from '@/lib/types'
import { getFeaturedArticles } from '@/lib/data-service'

export function ArticlesSection() {
  const { ref: scrollRef, rotateX, scale, y } = useScroll3D({ rotateRange: 5, scaleRange: [0.97, 1] })
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
    <section id="articles" className="relative section-py px-4 overflow-hidden" ref={scrollRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute top-1/3 right-0 w-px h-96 bg-gradient-to-b from-transparent via-accent/15 to-transparent" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <motion.div style={{ rotateX, scale, y }} className="section-glow max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16"
        >
          {/* <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] sm:text-xs data-text tracking-wider uppercase mb-4 sm:mb-6 text-primary/80">
            <span className="glow-dot text-chart-3" />
            {t('articles.badge')}
          </span> */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            <span className="text-foreground">{t('articles.title.part1')}</span>{' '}
            <span className="text-primary block sm:inline">{t('products.title.part2')}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono px-2 sm:px-0">
            {t('articles.subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        {articles.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {articles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="card-command p-5 sm:p-6 h-full flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all">
                    {/* Icon + Category */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground/30" />
                      <span className={`inline-block px-2 sm:px-2.5 py-1 rounded-md text-[9px] sm:text-[10px] data-text tracking-wider border ${getCategoryColor(article.category)}`}>
                        {t(`articles.category.${article.category}`).toUpperCase()}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2 text-foreground/90">
                      {language === 'fa' ? article.title : language === 'ar' ? article.title_ar || article.title : article.title_en || article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-muted-foreground/70 leading-relaxed mb-3 sm:mb-4 line-clamp-3 flex-1">
                      {language === 'fa' ? article.excerpt : language === 'ar' ? article.excerpt_ar || article.excerpt : article.excerpt_en || article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] data-text text-muted-foreground/40 pt-3 sm:pt-4 border-t border-border/30 tracking-wider">
                      <span className="flex items-center gap-1 sm:gap-1.5">
                        <User className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {language === 'fa' ? article.author : language === 'ar' ? article.author_ar || article.author : article.author_en || article.author}
                      </span>
                      <span className="flex items-center gap-1 sm:gap-1.5">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {t('articles.readTime').replace('{minutes}', String(article.readTime))}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground/50 data-text tracking-wider text-xs sm:text-sm">
            {t('articles.noArticles')}
          </div>
        )}

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/blog">
            <Button variant="outline" className="px-5 sm:px-6 py-2 text-xs sm:text-sm border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground">
              {t('articles.all')}
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ms-1.5 sm:ms-2 rtl:rotate-180" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
