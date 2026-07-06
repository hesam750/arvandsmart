'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/language-context'
import { getArticles, getProducts, getContactMessages, getRecentActivity } from '@/lib/data-service'
import type { ActivityEntry } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Package,
  MessageSquare,
  Plus,
  ArrowRight,
  Activity,
  Monitor,
} from 'lucide-react'

export default function AdminDashboard() {
  const { t } = useLanguage()
  const [stats, setStats] = useState({
    articles: 0,
    products: 0,
    unreadMessages: 0,
    featuredArticles: 0,
  })
  const [activities, setActivities] = useState<ActivityEntry[]>([])

  useEffect(() => {
    const fetchStats = async () => {
      const [articlesRes, productsRes, messagesRes, activityRes] = await Promise.all([
        getArticles(),
        getProducts(),
        getContactMessages(),
        getRecentActivity(),
      ])
      if (activityRes.success && activityRes.data) {
        setActivities(activityRes.data)
      }
      setStats({
        articles: articlesRes.success ? (articlesRes.data?.length || 0) : 0,
        products: productsRes.success ? (productsRes.data?.length || 0) : 0,
        unreadMessages: messagesRes.success
          ? (messagesRes.data?.filter(m => !m.read).length || 0)
          : 0,
        featuredArticles: articlesRes.success
          ? (articlesRes.data?.filter(a => a.featured).length || 0)
          : 0,
      })
    }
    fetchStats()
  }, [])

  const statCards = [
    {
      title: t('admin.totalArticles'),
      value: stats.articles,
      subtitle: `${stats.featuredArticles} ${t('common.featured').toLowerCase()}`,
      icon: FileText,
      href: '/admin/articles',
    },
    {
      title: t('admin.totalProducts'),
      value: stats.products,
      subtitle: t('common.chillerModels'),
      icon: Package,
      href: '/admin/products',
    },
    {
      title: t('admin.unreadMessages'),
      value: stats.unreadMessages,
      subtitle: t('common.awaitingReply'),
      icon: MessageSquare,
      href: '/admin/messages',
    },
    {
      title: t('common.systemStatus'),
      value: t('common.online'),
      subtitle: t('common.allSystemsOperational'),
      icon: Activity,
      href: '/admin/settings',
    },
  ]

  const quickActions = [
    { title: t('admin.addArticle'), icon: FileText, href: '/admin/articles/new' },
    { title: t('admin.addProduct'), icon: Package, href: '/admin/products/new' },
    { title: t('admin.viewMessages'), icon: MessageSquare, href: '/admin/messages' },
  ]

  const formatTime = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    return `${days}d ago`
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-command p-6 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Monitor className="w-8 h-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold">{t('admin.welcome')}</h1>
        </div>
        <p className="text-muted-foreground/70 font-mono text-sm">
          {t('admin.dashboardDesc')}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={stat.href}>
                <div className="group card-command p-6 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/5 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-1">
                    <div className="text-sm text-muted-foreground/70">{stat.title}</div>
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold font-mono mt-2">{stat.value}</div>
                  <div className="text-xs text-muted-foreground/50 font-mono tracking-wider mt-1">{stat.subtitle}</div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1 card-command p-6"
        >
          <h2 className="text-lg font-semibold mb-4">{t('admin.quickActions')}</h2>
          <div className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.title} href={action.href}>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-12 border-border/40 hover:bg-secondary/30"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    {action.title}
                    <ArrowRight className="w-4 h-4 ms-auto rtl:rotate-180" />
                  </Button>
                </Link>
              )
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 card-command p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t('admin.recentActivity')}</h2>
            <Activity className="w-5 h-5 text-muted-foreground/30" />
          </div>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/20 transition-colors border border-transparent hover:border-border/20"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activity.itemType === 'article' ? 'bg-primary' :
                    activity.itemType === 'product' ? 'bg-accent' : 'bg-chart-3'
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium capitalize">{activity.action}</div>
                    <div className="text-xs text-muted-foreground/60">{activity.itemTitle}</div>
                  </div>
                  <div className="text-xs text-muted-foreground/40 font-mono">{formatTime(activity.timestamp)}</div>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground/50 text-center py-4 font-mono">{t('common.noRecentActivity')}</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
