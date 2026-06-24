// ── Article Types ──
export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: ArticleCategory
  tags: string[]
  author: string
  readTime: number // minutes
  publishedAt: string
  featured: boolean
  coverImage?: string
}

export type ArticleCategory = "technology" | "tutorial" | "industry" | "maintenance" | "news"

// ── Product Types ──
export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  specs: ProductSpec[]
  features: string[]
  capacity: string
  image?: string
  order: number
}

export interface ProductSpec {
  label: string
  value: string
}

// ── Company Stats ──
export interface CompanyStats {
  yearsActive: number
  unitsInstalled: number
  citiesCovered: number
  satisfactionRate: number
}

// ── Contact Form ──
export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}

// ── API Response ──
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ── Keep old types for admin backward compat ──
export interface Discount {
  id: string
  name: string
  code: string
  type: "percentage" | "fixed"
  value: number
  startDate: string
  endDate: string
  usageLimit: number | null
  usedCount: number
  minOrderValue: number
  maxDiscountAmount: number | null
  applicableProducts: string[]
  status: "active" | "expired" | "scheduled"
  createdAt: string
}

export interface ProcessCondition {
  field: string
  operator: "less_than" | "greater_than" | "equal" | "not_equal" | "in" | "not_in"
  value: string | number | string[]
}

export interface ProcessAction {
  type: "adjust_price" | "send_notification" | "log_event"
  method?: string
  value?: number
  margin?: number
  maxPrice?: string
  minPrice?: string
  confidenceThreshold?: number
  channel?: string
  recipients?: string[]
  details?: string
}

export interface Process {
  id: string
  name: string
  description: string
  trigger: "competitor_price_change" | "inventory_change" | "schedule" | "demand_change" | "manual"
  conditions: ProcessCondition[]
  actions: ProcessAction[]
  priority: number
  status: "running" | "paused" | "stopped"
  lastRun: string | null
  nextRun: string | null
  runFrequency: string
  createdAt: string
}
