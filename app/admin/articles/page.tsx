'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/language-context'
import { getArticles, deleteArticle } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Plus,
  Edit3,
  Trash2,
  Search,
  Sparkles,
  Clock,
} from 'lucide-react'
import type { Article } from '@/lib/types'

export default function AdminArticles() {
  const { t, language } = useLanguage()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const load = async () => {
    setLoading(true)
    const res = await getArticles()
    if (res.success && res.data) setArticles(res.data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return
    await deleteArticle(id)
    load()
  }

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.slug.toLowerCase().includes(search.toLowerCase())
  )

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      technology: 'bg-primary/20 text-primary',
      maintenance: 'bg-accent/20 text-accent',
      industry: 'bg-glow-cyan/20 text-glow-cyan',
      tutorial: 'bg-glow-green/20 text-glow-green',
      news: 'bg-destructive/20 text-destructive',
    }
    return colors[cat] || 'bg-primary/20 text-primary'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold">{t('admin.articles.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('admin.articles.description')}</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground gap-2 glow-primary">
          <Plus className="w-4 h-4" />
          {t('admin.articles.add')}
        </Button>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('admin.articles.search')}
          className="w-full ps-10 pe-4 py-2.5 rounded-xl glass glass-border bg-transparent text-sm outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">{t('common.loading')}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">{t('common.noData')}</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-xl glass glass-border p-4 sm:p-5 hover:bg-secondary/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    {article.featured && (
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                    )}
                  </div>
                  <h3 className="font-semibold truncate">
                    {language === 'fa' ? article.title : article.title_en}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">
                    {language === 'fa' ? article.excerpt : article.excerpt_en}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{language === 'fa' ? article.author : article.author_en}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime} min
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive" onClick={() => handleDelete(article.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
