'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/language-context'
import { getContactMessages, markContactRead, deleteContact } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import {
  MessageSquare,
  Trash2,
  Search,
  Mail,
  MailOpen,
  User,
  Calendar,
} from 'lucide-react'
import type { ContactMessage } from '@/lib/types'

export default function AdminMessages() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  const load = async () => {
    setLoading(true)
    const res = await getContactMessages()
    if (res.success && res.data) setMessages(res.data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleMarkRead = async (id: string) => {
    await markContactRead(id)
    load()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await deleteContact(id)
    setSelected(null)
    load()
  }

  const filtered = messages.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-2xl font-bold">{t('admin.messages.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('admin.messages.description')}</p>
        </div>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('common.search')}
          className="w-full ps-10 pe-4 py-2.5 rounded-xl glass glass-border bg-transparent text-sm outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">{t('common.loading')}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {search ? t('common.noData') : t('admin.messages.noMessages')}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {/* List */}
          <div className="space-y-2">
            {filtered.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                onClick={() => setSelected(msg)}
                className={`rounded-xl glass glass-border p-4 cursor-pointer transition-all duration-200 hover:bg-secondary/30 ${
                  selected?.id === msg.id ? 'ring-1 ring-primary' : ''
                } ${!msg.read ? 'border-primary/30 bg-primary/5' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!msg.read ? (
                        <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      ) : (
                        <MailOpen className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className="font-medium text-sm truncate">{msg.name}</span>
                    </div>
                    <p className="text-sm truncate text-muted-foreground">{msg.subject}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7 text-destructive flex-shrink-0"
                    onClick={(e) => { e.stopPropagation(); handleDelete(msg.id) }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detail */}
          <div>
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-xl glass gradient-border p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">{selected.subject}</h3>
                  {!selected.read && (
                    <Button variant="outline" size="sm" onClick={() => handleMarkRead(selected.id)}>
                      <MailOpen className="w-4 h-4 me-1" />
                      {t('admin.messages.markRead')}
                    </Button>
                  )}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{selected.name}</span>
                    <span className="text-muted-foreground">&lt;{selected.email}&gt;</span>
                  </div>
                  {selected.phone && (
                    <div className="text-sm text-muted-foreground">
                      Phone: {selected.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(selected.createdAt).toLocaleString()}
                  </div>
                </div>

                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>

                <div className="mt-6">
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(selected.id)}>
                    <Trash2 className="w-4 h-4 me-1" />
                    {t('admin.messages.delete')}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="rounded-xl glass glass-border p-6 flex items-center justify-center h-48 text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Select a message to view</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
