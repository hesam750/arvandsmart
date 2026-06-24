'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/language-context'
import { getArticles, getProducts, getContactMessages } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Package,
  MessageSquare,
  Plus,
  ArrowRight,
  TrendingUp,
  Activity,
  Snowflake,
} from 'lucide-react'

export default function AdminDashboard() {
  const { t } = useLanguage()
  const [stats, setStats] = useState({
    articles: 0,
    products: 0,
    unreadMessages: 0,
    featuredArticles: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      const [articlesRes, productsRes, messagesRes] = await Promise.all([
        getArticles(),
        getProducts(),
        getContactMessages(),
      ])
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
      subtitle: `${stats.featuredArticles} featured`,
      icon: FileText,
      color: 'from-primary to-accent',
      href: '/admin/articles',
    },
    {
      title: t('admin.totalProducts'),
      value: stats.products,
      subtitle: 'chiller models',
      icon: Package,
      color: 'from-accent to-glow-green',
      href: '/admin/products',
    },
    {
      title: t('admin.unreadMessages'),
      value: stats.unreadMessages,
      subtitle: 'awaiting reply',
      icon: MessageSquare,
      color: 'from-glow-cyan to-primary',
      href: '/admin/messages',
    },
    {
      title: 'System Status',
      value: 'Online',
      subtitle: 'all systems operational',
      icon: Activity,
      color: 'from-glow-green to-accent',
      href: '/admin/settings',
    },
  ]

  const quickActions = [
    { title: t('admin.addArticle'), icon: FileText, href: '/admin/articles' },
    { title: t('admin.addProduct'), icon: Package, href: '/admin/products' },
    { title: t('admin.viewMessages'), icon: MessageSquare, href: '/admin/messages' },
  ]

  const recentActivity = [
    { action: 'Article published', item: 'Energy Optimization Guide', time: '2 days ago', type: 'article' },
    { action: 'Product updated', item: 'Arvand HC-400', time: '5 days ago', type: 'product' },
    { action: 'Contact message received', item: 'Inquiry from Tehran', time: '1 week ago', type: 'message' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl glass gradient-border p-6 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Snowflake className="w-8 h-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold">{t('admin.welcome')}</h1>
        </div>
        <p className="text-muted-foreground">
          Manage your articles, products, and contact messages from this dashboard.
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
                <div className="group relative rounded-xl glass glass-border p-6 hover:bg-secondary/30 transition-all duration-300 cursor-pointer">
                  <div className={`absolute top-4 end-4 w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">{stat.title}</div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
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
          className="lg:col-span-1 rounded-xl glass glass-border p-6"
        >
          <h2 className="text-lg font-semibold mb-4">{t('admin.quickActions')}</h2>
          <div className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.title} href={action.href}>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-12 hover:bg-secondary/50"
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
          className="lg:col-span-2 rounded-xl glass glass-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t('admin.recentActivity')}</h2>
            <Activity className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'article' ? 'bg-primary' :
                    activity.type === 'product' ? 'bg-accent' : 'bg-glow-green'
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">{activity.item}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
