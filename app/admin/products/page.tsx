'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/language-context'
import { getProducts, deleteProduct } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import {
  Package,
  Plus,
  Edit3,
  Trash2,
  Search,
  Snowflake,
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
          <p className="text-sm text-muted-foreground">{t('admin.products.description')}</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground gap-2 glow-primary">
          <Plus className="w-4 h-4" />
          {t('admin.products.add')}
        </Button>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('admin.products.search')}
          className="w-full ps-10 pe-4 py-2.5 rounded-xl glass glass-border bg-transparent text-sm outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">{t('common.loading')}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">{t('common.noData')}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl glass gradient-border p-6 hover:bg-secondary/30 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.capacity}</p>
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                {product.specs.slice(0, 3).map(spec => (
                  <div key={spec.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{language === 'fa' ? spec.label : spec.label_en}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">Order: {product.order}</span>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive" onClick={() => handleDelete(product.id)}>
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
