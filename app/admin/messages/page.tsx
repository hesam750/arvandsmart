'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '@/lib/i18n/language-context'
import { getContactMessages, markContactRead, deleteContact } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog'
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
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

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
    setDeleteTarget(null)
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
          <p className="text-sm text-muted-foreground/70 font-mono">{t('admin.messages.description')}</p>
        </div>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('common.search')}
          className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/30"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground/50 font-mono text-sm">{t('common.loading')}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground/50 font-mono text-sm">
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
                className={`card-command p-4 cursor-pointer transition-all hover:bg-card/60 ${
                  selected?.id === msg.id ? 'ring-1 ring-primary/50 border-primary/30' : ''
                } ${!msg.read ? 'border-l-2 border-l-primary' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!msg.read ? (
                        <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      ) : (
                        <MailOpen className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                      )}
                      <span className="font-medium text-sm truncate">{msg.name}</span>
                    </div>
                    <p className="text-sm truncate text-muted-foreground/70">{msg.subject}</p>
                    <p className="text-xs text-muted-foreground/40 font-mono mt-1">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7 text-destructive/50 hover:text-destructive flex-shrink-0"
                    onClick={(e) => { e.stopPropagation(); setDeleteTarget(msg.id) }}
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
                className="card-command p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">{selected.subject}</h3>
                  {!selected.read && (
                    <Button variant="outline" size="sm" className="border-border/40" onClick={() => handleMarkRead(selected.id)}>
                      <MailOpen className="w-4 h-4 me-1" />
                      {t('admin.messages.markRead')}
                    </Button>
                  )}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border/30">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground/50" />
                    <span className="font-medium">{selected.name}</span>
                    <span className="text-muted-foreground/50">&lt;{selected.email}&gt;</span>
                  </div>
                  {selected.phone && (
                    <div className="text-sm text-muted-foreground/60 font-mono">
                      {t('common.phoneLabel')}: {selected.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground/40 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(selected.createdAt).toLocaleString()}
                  </div>
                </div>

                <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground/80">{selected.message}</p>

                <div className="mt-6">
                  <Button variant="destructive" size="sm" onClick={() => setDeleteTarget(selected.id)}>
                    <Trash2 className="w-4 h-4 me-1" />
                    {t('admin.messages.delete')}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="card-command p-6 flex items-center justify-center h-48">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 text-muted-foreground/20" />
                  <p className="text-sm text-muted-foreground/50 font-mono">{t('common.selectToView')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <DeleteConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        title={t('admin.messages.delete') + '?'}
        cancelLabel={t('common.cancel')}
        confirmLabel={t('common.delete')}
      />
    </div>
  )
}
