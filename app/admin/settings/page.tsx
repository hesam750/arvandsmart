'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Database,
  Key,
  Bell,
  Shield,
  Globe,
  Palette,
  Save,
  RefreshCw,
} from 'lucide-react'

export default function SettingsPage() {
  const { t } = useLanguage()

  const settingsSections = [
    {
      title: 'Database Connection',
      icon: Database,
      description: 'Configure your MySQL database connection settings',
      fields: [
        { label: 'Host', placeholder: 'localhost', type: 'text' },
        { label: 'Port', placeholder: '3306', type: 'text' },
        { label: 'Database Name', placeholder: 'smart_pricing', type: 'text' },
        { label: 'Username', placeholder: 'root', type: 'text' },
        { label: 'Password', placeholder: '••••••••', type: 'password' },
      ],
    },
    {
      title: 'API Configuration',
      icon: Key,
      description: 'Manage API keys and authentication settings',
      fields: [
        { label: 'API Key', placeholder: 'sk-...', type: 'password' },
        { label: 'Webhook URL', placeholder: 'https://...', type: 'text' },
        { label: 'Rate Limit (req/min)', placeholder: '100', type: 'number' },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      description: 'Configure notification preferences',
      fields: [
        { label: 'Email Notifications', placeholder: 'admin@company.com', type: 'email' },
        { label: 'Slack Webhook', placeholder: 'https://hooks.slack.com/...', type: 'text' },
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
        <p className="text-muted-foreground">
          Configure your Smart Pricing Engine settings and integrations
        </p>
      </motion.div>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => {
        const Icon = section.icon
        return (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="rounded-xl glass glass-border p-6"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div key={field.label}>
                  <label className="text-sm font-medium mb-2 block">{field.label}</label>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 me-2" />
                Test Connection
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <Save className="w-4 h-4 me-2" />
                Save Changes
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
        className="rounded-xl glass gradient-border p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-glow-green/20 flex items-center justify-center">
            <Database className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">MySQL Database Migration</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Currently using JSON files for data storage. When ready to migrate to MySQL, 
              the schema definitions are available in <code className="px-1.5 py-0.5 rounded bg-secondary">lib/types.ts</code>.
            </p>
            <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
              <pre className="text-muted-foreground">
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
