'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/language-context'
import { getArticleById, updateArticle } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { PersianDatePicker } from '@/components/ui/persian-date-picker'
import type { Article, ArticleCategory } from '@/lib/types'

type LangTab = 'fa' | 'en' | 'ar'

const categories: { value: ArticleCategory; labelKey: string }[] = [
  { value: 'technology', labelKey: 'articles.category.technology' },
  { value: 'maintenance', labelKey: 'articles.category.maintenance' },
  { value: 'industry', labelKey: 'articles.category.industry' },
  { value: 'tutorial', labelKey: 'articles.category.tutorial' },
  { value: 'news', labelKey: 'articles.category.news' },
]

export default function EditArticle() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { t, language } = useLanguage()
  const [langTab, setLangTab] = useState<LangTab>(language === 'fa' ? 'fa' : language === 'ar' ? 'ar' : 'en')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notFound, setNotFound] = useState(false)

  const [form, setForm] = useState({
    title: '',
    title_en: '',
    title_ar: '',
    slug: '',
    excerpt: '',
    excerpt_en: '',
    excerpt_ar: '',
    content: '',
    content_en: '',
    content_ar: '',
    category: 'technology' as ArticleCategory,
    tags: '',
    author: '',
    author_en: '',
    author_ar: '',
    readTime: 5,
    featured: false,
    publishedAt: '',
    coverImage: '',
  })

  useEffect(() => {
    const load = async () => {
      const res = await getArticleById(id)
      if (!res.success || !res.data) {
        setNotFound(true)
        setLoading(false)
        return
      }
      const a = res.data
      setForm({
        title: a.title || '',
        title_en: a.title_en || '',
        title_ar: a.title_ar || '',
        slug: a.slug || '',
        excerpt: a.excerpt || '',
        excerpt_en: a.excerpt_en || '',
        excerpt_ar: a.excerpt_ar || '',
        content: a.content || '',
        content_en: a.content_en || '',
        content_ar: a.content_ar || '',
        category: a.category || 'technology',
        tags: (a.tags || []).join(', '),
        author: a.author || '',
        author_en: a.author_en || '',
        author_ar: a.author_ar || '',
        readTime: a.readTime || 5,
        featured: a.featured || false,
        publishedAt: a.publishedAt ? a.publishedAt.slice(0, 10) : '',
        coverImage: a.coverImage || '',
      })
      setLoading(false)
    }
    load()
  }, [id])

  const update = (field: string, value: string | number | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const tags = form.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    const res = await updateArticle(id, {
      slug: form.slug,
      title: form.title,
      title_en: form.title_en,
      title_ar: form.title_ar,
      excerpt: form.excerpt,
      excerpt_en: form.excerpt_en,
      excerpt_ar: form.excerpt_ar,
      content: form.content,
      content_en: form.content_en,
      content_ar: form.content_ar,
      category: form.category,
      tags,
      author: form.author,
      author_en: form.author_en,
      author_ar: form.author_ar,
      readTime: Number(form.readTime) || 1,
      featured: form.featured,
      publishedAt: new Date(form.publishedAt).toISOString(),
      coverImage: form.coverImage || undefined,
    })

    if (res.success) {
      router.push('/admin/articles')
    } else {
      setError(res.error || 'Failed to update article')
      setSaving(false)
    }
  }

  const renderLangInput = (base: string, label: string, type: 'text' | 'textarea' = 'text') => {
    const isTextarea = type === 'textarea'
    const inputClass = `w-full rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30 ${isTextarea ? 'px-4 py-3 min-h-[120px] resize-y' : 'px-4 py-2.5'}`

    const getVal = (l: LangTab) => {
      if (l === 'fa') return form[base as keyof typeof form] as string
      if (l === 'ar') return form[`${base}_ar` as keyof typeof form] as string
      return form[`${base}_en` as keyof typeof form] as string
    }

    const setVal = (l: LangTab, val: string) => {
      const field = l === 'fa' ? base : l === 'ar' ? `${base}_ar` : `${base}_en`
      update(field, val)
    }

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">{label}</label>
        <div className="flex gap-1 mb-1">
          {(['fa', 'en', 'ar'] as LangTab[]).map(l => (
            <button
              key={l}
              type="button"
              onClick={() => setLangTab(l)}
              className={`px-2.5 py-1 text-[10px] font-mono rounded-lg border transition-colors ${
                langTab === l
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'text-muted-foreground/50 border-transparent hover:text-foreground/70'
              }`}
            >
              {l === 'fa' ? 'FA' : l === 'en' ? 'EN' : 'AR'}
            </button>
          ))}
        </div>
        {(['fa', 'en', 'ar'] as LangTab[]).map(l => (
          <div key={l} className={`${langTab === l ? 'block' : 'hidden'}`}>
            {isTextarea ? (
              <textarea
                value={getVal(l)}
                onChange={e => setVal(l, e.target.value)}
                className={inputClass}
                placeholder={l === 'fa' ? 'متن فارسی' : l === 'en' ? `${label} (English)` : `${label} (العربية)`}
                dir={l === 'fa' || l === 'ar' ? 'rtl' : 'ltr'}
              />
            ) : (
              <input
                type="text"
                value={getVal(l)}
                onChange={e => setVal(l, e.target.value)}
                className={inputClass}
                placeholder={l === 'fa' ? 'متن فارسی' : l === 'en' ? `${label} (English)` : `${label} (العربية)`}
                dir={l === 'fa' || l === 'ar' ? 'rtl' : 'ltr'}
              />
            )}
          </div>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground/50 font-mono text-sm">{t('blog.notFound')}</p>
        <Link href="/admin/articles" className="mt-4 inline-block">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('common.back')}
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Link href="/admin/articles">
            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground/50 hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">{t('admin.articles.edit')}</h1>
            <p className="text-sm text-muted-foreground/70 font-mono">{t('admin.articles.description')}</p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="card-command p-6 space-y-6"
      >
        {error && (
          <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive">
            {error}
          </div>
        )}

        {renderLangInput('title', t('admin.articles.titleField'))}

        {/* Slug */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">{t('admin.articles.slug')}</label>
          <input
            type="text"
            value={form.slug}
            onChange={e => update('slug', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30 font-mono"
            dir="ltr"
          />
        </div>

        {renderLangInput('excerpt', 'Excerpt', 'textarea')}
        {renderLangInput('content', t('admin.articles.content'), 'textarea')}

        {/* Category & Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">{t('admin.articles.category')}</label>
            <select
              value={form.category}
              onChange={e => update('category', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{t(cat.labelKey)}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">{t('admin.articles.readTime')}</label>
            <input
              type="number"
              min={1}
              max={120}
              value={form.readTime}
              onChange={e => update('readTime', parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {renderLangInput('author', t('admin.articles.author'))}

        {/* Tags */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">{t('admin.articles.tags')}</label>
          <input
            type="text"
            value={form.tags}
            onChange={e => update('tags', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
            dir="ltr"
          />
        </div>

        {/* Publish Date — Persian */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">{t('admin.articles.publishedAt')}</label>
          <PersianDatePicker
            value={form.publishedAt}
            onChange={iso => update('publishedAt', iso)}
          />
        </div>

        {/* Cover Image */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">Cover Image URL</label>
          <input
            type="url"
            value={form.coverImage}
            onChange={e => update('coverImage', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
            dir="ltr"
          />
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={form.featured}
            onChange={e => update('featured', e.target.checked)}
            className="w-4 h-4 rounded border-border/40 text-primary focus:ring-primary bg-background/50"
          />
          <label htmlFor="featured" className="text-sm font-medium text-foreground/80 cursor-pointer">
            {t('admin.articles.featured')}
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-border/30">
          <Button type="submit" disabled={saving} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Saving...' : t('common.save')}
          </Button>
          <Link href="/admin/articles">
            <Button type="button" variant="outline" className="border-border/40">
              {t('common.cancel')}
            </Button>
          </Link>
        </div>
      </motion.form>
    </div>
  )
}
