'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/lib/i18n/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Database,
  Key,
  Bell,
  Save,
  RefreshCw,
} from 'lucide-react'

export default function SettingsPage() {
  const { t } = useLanguage()

  const settingsSections = [
    {
      titleKey: 'settings.databaseConnection.title',
      descKey: 'settings.databaseConnection.description',
      icon: Database,
      fields: [
        { labelKey: 'settings.host', placeholder: 'localhost' },
        { labelKey: 'settings.port', placeholder: '3306' },
        { labelKey: 'settings.databaseName', placeholder: 'smart_pricing' },
        { labelKey: 'settings.username', placeholder: 'root' },
        { labelKey: 'settings.password', placeholder: '••••••••', type: 'password' },
      ],
    },
    {
      titleKey: 'settings.apiConfiguration.title',
      descKey: 'settings.apiConfiguration.description',
      icon: Key,
      fields: [
        { labelKey: 'settings.apiKey', placeholder: 'sk-...', type: 'password' },
        { labelKey: 'settings.webhookUrl', placeholder: 'https://...' },
        { labelKey: 'settings.rateLimit', placeholder: '100', type: 'number' },
      ],
    },
    {
      titleKey: 'settings.notifications.title',
      descKey: 'settings.notifications.description',
      icon: Bell,
      fields: [
        { labelKey: 'settings.emailNotifications', placeholder: 'admin@company.com', type: 'email' },
        { labelKey: 'settings.slackWebhook', placeholder: 'https://hooks.slack.com/...' },
      ],
    },
  ]

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">{t('admin.settings')}</h1>
        <p className="text-muted-foreground/70 font-mono text-sm">
          {t('admin.settings.description')}
        </p>
      </motion.div>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => {
        const Icon = section.icon
        return (
          <motion.div
            key={section.titleKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="card-command p-6"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{t(section.titleKey)}</h2>
                <p className="text-sm text-muted-foreground/70">{t(section.descKey)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div key={field.labelKey}>
                  <label className="text-sm font-medium mb-2 block text-muted-foreground/70">{t(field.labelKey)}</label>
                  <Input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    className="bg-background/50 border-border/40"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border/30">
              <Button variant="outline" size="sm" className="border-border/40">
                <RefreshCw className="w-4 h-4 me-2" />
                {t('settings.testConnection')}
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Save className="w-4 h-4 me-2" />
                {t('settings.saveChanges')}
              </Button>
            </div>
          </motion.div>
        )
      })}

      {/* Database Migration Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card-command p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/10 flex items-center justify-center">
            <Database className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">{t('settings.mysqlMigration')}</h2>
            <p className="text-sm text-muted-foreground/70 mb-4">
              {t('settings.mysqlDescription')}
            </p>
            <div className="p-4 rounded-xl bg-background/50 border border-border/30 font-mono text-xs overflow-x-auto">
              <pre className="text-muted-foreground/60">
{`-- Run these SQL commands to create the database schema
-- See lib/types.ts for complete schema definitions

CREATE TABLE products (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL,
  current_price DECIMAL(10, 2) NOT NULL,
  ...
);`}
              </pre>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
