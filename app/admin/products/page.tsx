'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/language-context'
import { getProducts, deleteProduct } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import {
  Package,
  Plus,
  Edit3,
  Trash2,
  Search,
  Monitor,
} from 'lucide-react'
import type { Product } from '@/lib/types'

export default function AdminProducts() {
  const { t, language } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const load = async () => {
    setLoading(true)
    const res = await getProducts()
    if (res.success && res.data) setProducts(res.data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    await deleteProduct(id)
    load()
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold">{t('admin.products.title')}</h1>
          <p className="text-sm text-muted-foreground/70 font-mono">{t('admin.products.description')}</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-primary text-primary-foreground gap-2 hover:bg-primary/90 shadow-sm cursor-pointer">
            <Plus className="w-4 h-4" />
            {t('admin.products.add')}
          </Button>
        </Link>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('admin.products.search')}
          className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground/50 font-mono text-sm">{t('common.loading')}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground/50 font-mono text-sm">{t('common.noData')}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-command p-6 hover:bg-card/60 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-xs text-muted-foreground/60 font-mono">{product.capacity}</p>
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                {product.specs.slice(0, 3).map(spec => (
                  <div key={spec.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground/60">{language === 'fa' ? spec.label : language === 'ar' ? spec.label_ar || spec.label : spec.label_en || spec.label}</span>
                    <span className="font-medium font-mono text-xs">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/30">
                <span className="text-xs text-muted-foreground/40 font-mono">Order: {product.order}</span>
                <div className="flex items-center gap-1">
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground/50 hover:text-foreground cursor-pointer">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive/50 hover:text-destructive" onClick={() => handleDelete(product.id)}>
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
