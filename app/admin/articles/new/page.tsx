'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { useLanguage } from '@/lib/i18n/language-context'
import { createArticle } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { PersianDatePicker } from '@/components/ui/persian-date-picker'
import type { ArticleCategory } from '@/lib/types'

type LangTab = 'fa' | 'en' | 'ar'

const categories: { value: ArticleCategory; labelKey: string }[] = [
  { value: 'technology', labelKey: 'articles.category.technology' },
  { value: 'maintenance', labelKey: 'articles.category.maintenance' },
  { value: 'industry', labelKey: 'articles.category.industry' },
  { value: 'tutorial', labelKey: 'articles.category.tutorial' },
  { value: 'news', labelKey: 'articles.category.news' },
]

export default function NewArticle() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [langTab, setLangTab] = useState<LangTab>(language === 'fa' ? 'fa' : language === 'ar' ? 'ar' : 'en')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

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
    publishedAt: new Date().toISOString().slice(0, 10),
    coverImage: '',
  })

  const update = (field: string, value: string | number | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const autoSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

  const handleTitleChange = (val: string, lang: LangTab) => {
    update(lang === 'fa' ? 'title' : lang === 'ar' ? 'title_ar' : 'title_en', val)
    // Auto-generate slug from English title, or fallback to fa title
    if (lang === 'en' && !form.slug) {
      update('slug', autoSlug(val))
    } else if (lang === 'fa' && !form.slug && !form.title_en) {
      update('slug', autoSlug(val))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const tags = form.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    const res = await createArticle({
      slug: form.slug || autoSlug(form.title_en || form.title),
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
      setError(res.error || 'Failed to create article')
      setSaving(false)
    }
  }

  const langFields = (base: string) => {
    const f = base as keyof typeof form
    const fEn = `${base}_en` as keyof typeof form
    const fAr = `${base}_ar` as keyof typeof form
    return { fa: form[f] as string, en: form[fEn] as string, ar: form[fAr] as string }
  }

  const renderLangInput = (base: string, label: string, type: 'text' | 'textarea' = 'text') => {
    const fields = langFields(base)
    const isTextarea = type === 'textarea'
    const inputClass = `w-full rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30 ${isTextarea ? 'px-4 py-3 min-h-[120px] resize-y' : 'px-4 py-2.5'}`

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
                value={fields[l]}
                onChange={e => update(
                  l === 'fa' ? base : l === 'ar' ? `${base}_ar` : `${base}_en`,
                  e.target.value
                )}
                className={inputClass}
                placeholder={l === 'fa' ? 'متن فارسی' : l === 'en' ? `${label} (English)` : `${label} (العربية)`}
                dir={l === 'fa' || l === 'ar' ? 'rtl' : 'ltr'}
              />
            ) : (
              <input
                type="text"
                value={fields[l]}
                onChange={e => {
                  const val = e.target.value
                  const field = l === 'fa' ? base : l === 'ar' ? `${base}_ar` : `${base}_en`
                  if (base === 'title') {
                    handleTitleChange(val, l)
                  } else {
                    update(field, val)
                  }
                }}
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
            <h1 className="text-xl font-bold">{t('admin.articles.add')}</h1>
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

        {/* Multi-language Title */}
        {renderLangInput('title', t('admin.articles.titleField'))}

        {/* Slug */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">{t('admin.articles.slug')}</label>
          <input
            type="text"
            value={form.slug}
            onChange={e => update('slug', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30 font-mono"
            placeholder="article-slug"
            dir="ltr"
          />
        </div>

        {/* Excerpt */}
        {renderLangInput('excerpt', 'Excerpt', 'textarea')}

        {/* Content */}
        {renderLangInput('content', t('admin.articles.content'), 'textarea')}

        {/* Category & Meta row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category */}
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

          {/* Read Time */}
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

        {/* Author */}
        {renderLangInput('author', t('admin.articles.author'))}

        {/* Tags */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">{t('admin.articles.tags')}</label>
          <input
            type="text"
            value={form.tags}
            onChange={e => update('tags', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
            placeholder="technology, iot, energy (comma separated)"
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
            placeholder="https://example.com/image.jpg"
            dir="ltr"
          />
        </div>

        {/* Featured toggle */}
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
            {saving ? t('common.saving') : t('common.save')}
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
