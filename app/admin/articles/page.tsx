'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/language-context'
import { getArticles, deleteArticle } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog'
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
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    const res = await getArticles()
    if (res.success && res.data) setArticles(res.data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    setDeleteTarget(null)
    await deleteArticle(id)
    load()
  }

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.slug.toLowerCase().includes(search.toLowerCase())
  )

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
          <p className="text-sm text-muted-foreground/70 font-mono">{t('admin.articles.description')}</p>
        </div>
        <Link href="/admin/articles/new">
          <Button className="bg-primary text-primary-foreground gap-2 hover:bg-primary/90 shadow-sm cursor-pointer">
            <Plus className="w-4 h-4" />
            {t('admin.articles.add')}
          </Button>
        </Link>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('admin.articles.search')}
          className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground/50 font-mono text-sm">{t('common.loading')}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground/50 font-mono text-sm">{t('common.noData')}</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="card-command p-4 sm:p-5 hover:bg-card/60 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider border ${getCategoryColor(article.category)}`}>
                      {article.category.toUpperCase()}
                    </span>
                    {article.featured && (
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                    )}
                  </div>
                  <h3 className="font-semibold truncate">
                    {language === 'fa' ? article.title : language === 'ar' ? article.title_ar || article.title : article.title_en || article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground/70 truncate mt-0.5">
                    {language === 'fa' ? article.excerpt : language === 'ar' ? article.excerpt_ar || article.excerpt : article.excerpt_en || article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground/50 font-mono">
                    <span>{language === 'fa' ? article.author : language === 'ar' ? article.author_ar || article.author : article.author_en || article.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime} min
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Link href={`/admin/articles/${article.id}/edit`}>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground/50 hover:text-foreground cursor-pointer">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive/50 hover:text-destructive" onClick={() => setDeleteTarget(article.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <DeleteConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        title={t('admin.articles.delete') + '?'}
        cancelLabel={t('common.cancel')}
        confirmLabel={t('common.delete')}
      />
    </div>
  )
}
