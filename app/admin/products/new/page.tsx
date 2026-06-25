'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/language-context'
import { createProduct } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import type { ProductSpec } from '@/lib/types'

type LangTab = 'fa' | 'en' | 'ar'

export default function NewProduct() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [langTab, setLangTab] = useState<LangTab>(language === 'fa' ? 'fa' : language === 'ar' ? 'ar' : 'en')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    tagline: '',
    tagline_en: '',
    tagline_ar: '',
    description: '',
    description_en: '',
    description_ar: '',
    capacity: '',
    order: 0,
    image: '',
    features: [] as string[],
    features_en: [] as string[],
    features_ar: [] as string[],
  })

  const [specs, setSpecs] = useState<ProductSpec[]>([
    { label: '', label_en: '', label_ar: '', value: '', value_en: '', value_ar: '' },
  ])

  const [featInput, setFeatInput] = useState('')

  const update = (field: string, value: string | number) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const updateSpec = (idx: number, field: keyof ProductSpec, val: string) => {
    setSpecs(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], [field]: val }
      return next
    })
  }

  const addSpec = () => {
    setSpecs(prev => [...prev, { label: '', label_en: '', label_ar: '', value: '', value_en: '', value_ar: '' }])
  }

  const removeSpec = (idx: number) => {
    setSpecs(prev => prev.filter((_, i) => i !== idx))
  }

  const addFeature = () => {
    if (!featInput.trim()) return
    setForm(prev => ({ ...prev, features: [...prev.features, featInput.trim()] }))
    setFeatInput('')
  }

  const removeFeature = (idx: number) => {
    setForm(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== idx) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const res = await createProduct({
      name: form.name,
      tagline: form.tagline,
      tagline_en: form.tagline_en,
      tagline_ar: form.tagline_ar,
      description: form.description,
      description_en: form.description_en,
      description_ar: form.description_ar,
      specs: specs.filter(s => s.label || s.label_en),
      features: form.features,
      features_en: form.features_en,
      features_ar: form.features_ar,
      capacity: form.capacity,
      image: form.image || undefined,
      order: Number(form.order) || 0,
    })

    if (res.success) {
      router.push('/admin/products')
    } else {
      setError(res.error || 'Failed to create product')
      setSaving(false)
    }
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
          <Link href="/admin/products">
            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground/50 hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">{t('admin.products.add')}</h1>
            <p className="text-sm text-muted-foreground/70 font-mono">{t('admin.products.description')}</p>
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

        {/* Name (single, not multilingual) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">{t('admin.products.name')}</label>
          <input
            type="text"
            value={form.name}
            onChange={e => update('name', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
            placeholder="Arvand HC-500"
          />
        </div>

        {/* Language tabs for multi-lang fields */}
        <div className="flex gap-1 mb-2">
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

        {/* Tagline */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">Tagline</label>
          {(['fa', 'en', 'ar'] as LangTab[]).map(l => (
            <div key={l} className={`${langTab === l ? 'block' : 'hidden'}`}>
              <input
                type="text"
                value={l === 'fa' ? form.tagline : l === 'ar' ? form.tagline_ar : form.tagline_en}
                onChange={e => {
                  const val = e.target.value
                  if (l === 'fa') update('tagline', val)
                  else if (l === 'ar') update('tagline_ar', val)
                  else update('tagline_en', val)
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
                placeholder={l === 'fa' ? 'متن فارسی' : l === 'en' ? 'Tagline (English)' : 'Tagline (العربية)'}
                dir={l === 'fa' || l === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">Description</label>
          {(['fa', 'en', 'ar'] as LangTab[]).map(l => (
            <div key={l} className={`${langTab === l ? 'block' : 'hidden'}`}>
              <textarea
                value={l === 'fa' ? form.description : l === 'ar' ? form.description_ar : form.description_en}
                onChange={e => {
                  const val = e.target.value
                  if (l === 'fa') update('description', val)
                  else if (l === 'ar') update('description_ar', val)
                  else update('description_en', val)
                }}
                className="w-full px-4 py-3 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30 min-h-[100px] resize-y"
                placeholder={l === 'fa' ? 'متن فارسی' : l === 'en' ? 'Description (English)' : 'Description (العربية)'}
                dir={l === 'fa' || l === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>
          ))}
        </div>

        {/* Capacity & Order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">{t('admin.products.capacity')}</label>
            <input
              type="text"
              value={form.capacity}
              onChange={e => update('capacity', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors"
              placeholder="50-100 Ton"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">{t('admin.products.order')}</label>
            <input
              type="number"
              min={0}
              value={form.order}
              onChange={e => update('order', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">Image URL</label>
          <input
            type="url"
            value={form.image}
            onChange={e => update('image', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
            placeholder="https://example.com/product.jpg"
            dir="ltr"
          />
        </div>

        {/* Specs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground/80">Specifications</label>
            <Button type="button" variant="outline" size="sm" onClick={addSpec} className="gap-1.5 text-xs h-8 border-border/40">
              <Plus className="w-3 h-3" />
              Add Spec
            </Button>
          </div>
          {specs.map((spec, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2 items-start p-3 rounded-xl border border-border/30 bg-background/30">
              {/* Label fields */}
              <div className="col-span-5 space-y-1">
                <span className="text-[10px] font-mono text-muted-foreground/50">Label</span>
                {(['fa', 'en', 'ar'] as LangTab[]).map(l => (
                  <div key={l} className={`${langTab === l ? 'block' : 'hidden'}`}>
                    <input
                      type="text"
                      value={l === 'fa' ? spec.label : l === 'ar' ? spec.label_ar || '' : spec.label_en}
                      onChange={e => updateSpec(idx, l === 'fa' ? 'label' : l === 'ar' ? 'label_ar' : 'label_en', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-border/30 bg-background/50 text-xs outline-none focus:border-primary/50 transition-colors"
                      placeholder={l === 'fa' ? 'برچسب' : l === 'en' ? 'Label' : 'تسمية'}
                      dir={l === 'fa' || l === 'ar' ? 'rtl' : 'ltr'}
                    />
                  </div>
                ))}
              </div>
              {/* Value fields */}
              <div className="col-span-6 space-y-1">
                <span className="text-[10px] font-mono text-muted-foreground/50">Value</span>
                {(['fa', 'en', 'ar'] as LangTab[]).map(l => (
                  <div key={l} className={`${langTab === l ? 'block' : 'hidden'}`}>
                    <input
                      type="text"
                      value={l === 'fa' ? spec.value : l === 'ar' ? spec.value_ar || '' : spec.value_en || spec.value}
                      onChange={e => updateSpec(idx, l === 'fa' ? 'value' : l === 'ar' ? 'value_ar' : 'value_en', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-border/30 bg-background/50 text-xs outline-none focus:border-primary/50 transition-colors font-mono"
                      placeholder={l === 'fa' ? 'مقدار' : l === 'en' ? 'Value' : 'القيمة'}
                      dir="ltr"
                    />
                  </div>
                ))}
              </div>
              {/* Remove */}
              <div className="col-span-1 flex items-end justify-center pb-1">
                {specs.length > 1 && (
                  <button type="button" onClick={() => removeSpec(idx)} className="text-destructive/50 hover:text-destructive p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground/80">Features</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={featInput}
              onChange={e => setFeatInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature() } }}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
              placeholder="Add a feature and press Enter"
            />
            <Button type="button" variant="outline" size="sm" onClick={addFeature} className="h-auto border-border/40">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {form.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.features.map((feat, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary">
                  {feat}
                  <button type="button" onClick={() => removeFeature(idx)} className="text-primary/50 hover:text-primary">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
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
          <Link href="/admin/products">
            <Button type="button" variant="outline" className="border-border/40">
              {t('common.cancel')}
            </Button>
          </Link>
        </div>
      </motion.form>
    </div>
  )
}
