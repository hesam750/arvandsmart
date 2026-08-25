import { Article, Product, CompanyStats, ContactMessage, ApiResponse } from "./types"
import articlesData from "@/data/articles.json"
import productsData from "@/data/products.json"
import { contactMessageInputSchema } from "@/lib/validation"

export const SERVER_URL_STORAGE_KEY = "asc_server_url"

export interface ActivityEntry {
  id: string
  action: string
  itemType: "article" | "product" | "message"
  itemTitle: string
  timestamp: string
}

// JSON files are the deploy-time source of truth on Vercel.
let articles: Article[] = [...(articlesData.articles as Article[])]
let products: Product[] = [...(productsData.products as Product[])]
let contacts: ContactMessage[] = []
let activities: ActivityEntry[] = []

function addActivity(action: string, itemType: ActivityEntry["itemType"], itemTitle: string) {
  activities.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    action,
    itemType,
    itemTitle,
    timestamp: new Date().toISOString(),
  })
  // Keep last 50
  if (activities.length > 50) activities.length = 50
}

// ─── Helper ─────────────────────────────────────────────────────
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))
const ok = <T>(data: T): ApiResponse<T> => ({ success: true, data })
const fail = (error: string): ApiResponse<never> => ({ success: false, error })

// ─── Company Stats ──────────────────────────────────────────────
export const companyStats: CompanyStats = {
  yearsActive: 18,
  unitsInstalled: 3400,
  citiesCovered: 46,
  satisfactionRate: 97,
}

// ═══════════════════════════════════════════════════════════════
//  RECENT ACTIVITY
// ═══════════════════════════════════════════════════════════════

export async function getRecentActivity(): Promise<ApiResponse<ActivityEntry[]>> {
  await delay(40)
  return ok([...activities])
}

// ═══════════════════════════════════════════════════════════════
//  ARTICLES
// ═══════════════════════════════════════════════════════════════

export async function getArticles(): Promise<ApiResponse<Article[]>> {
  await delay(80)
  return ok([...articles].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ))
}

export async function getFeaturedArticles(): Promise<ApiResponse<Article[]>> {
  await delay(60)
  return ok(articles.filter((a) => a.featured).sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ))
}

export async function getArticleBySlug(slug: string): Promise<ApiResponse<Article | null>> {
  await delay(50)
  const article = articles.find((a) => a.slug === slug)
  return article ? ok(article) : fail("Article not found")
}

export async function getArticlesByCategory(category: string): Promise<ApiResponse<Article[]>> {
  await delay(60)
  const filtered = articles.filter((a) => a.category === category)
  return ok(filtered.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ))
}

export async function getArticleById(id: string): Promise<ApiResponse<Article | null>> {
  await delay(40)
  const article = articles.find((a) => a.id === id)
  return article ? ok(article) : fail("Article not found")
}

// ── Article Admin (CRUD) ──

export async function createArticle(input: Omit<Article, "id">): Promise<ApiResponse<Article>> {
  await delay(100)
  const article: Article = {
    ...input,
    id: `art_${String(Date.now()).slice(-6)}_${Math.random().toString(36).slice(2, 6)}`,
  }
  articles.unshift(article)
  addActivity("created", "article", article.title)
  return ok(article)
}

export async function updateArticle(
  id: string,
  input: Partial<Article>
): Promise<ApiResponse<Article>> {
  await delay(100)
  const idx = articles.findIndex((a) => a.id === id)
  if (idx === -1) return fail("Article not found")
  articles[idx] = { ...articles[idx], ...input }
  addActivity("updated", "article", articles[idx].title)
  return ok(articles[idx])
}

export async function deleteArticle(id: string): Promise<ApiResponse<void>> {
  await delay(100)
  const idx = articles.findIndex((a) => a.id === id)
  if (idx === -1) return fail("Article not found")
  const title = articles[idx].title
  articles.splice(idx, 1)
  addActivity("deleted", "article", title)
  return ok(undefined)
}

// ═══════════════════════════════════════════════════════════════
//  PRODUCTS
// ═══════════════════════════════════════════════════════════════

export async function getProducts(): Promise<ApiResponse<Product[]>> {
  await delay(80)
  return ok([...products].sort((a, b) => a.order - b.order))
}

export async function getProductById(id: string): Promise<ApiResponse<Product | null>> {
  await delay(50)
  const product = products.find((p) => p.id === id)
  return product ? ok(product) : fail("Product not found")
}

// ── Product Admin (CRUD) ──

export async function createProduct(input: Omit<Product, "id">): Promise<ApiResponse<Product>> {
  await delay(100)
  const product: Product = {
    ...input,
    id: `prod_${String(Date.now()).slice(-6)}_${Math.random().toString(36).slice(2, 6)}`,
  }
  products.push(product)
  addActivity("created", "product", product.name)
  return ok(product)
}

export async function updateProduct(
  id: string,
  input: Partial<Product>
): Promise<ApiResponse<Product>> {
  await delay(100)
  const idx = products.findIndex((p) => p.id === id)
  if (idx === -1) return fail("Product not found")
  products[idx] = { ...products[idx], ...input }
  addActivity("updated", "product", products[idx].name)
  return ok(products[idx])
}

export async function deleteProduct(id: string): Promise<ApiResponse<void>> {
  await delay(100)
  const idx = products.findIndex((p) => p.id === id)
  if (idx === -1) return fail("Product not found")
  const name = products[idx].name
  products.splice(idx, 1)
  addActivity("deleted", "product", name)
  return ok(undefined)
}

// ═══════════════════════════════════════════════════════════════
//  CONTACT FORM
// ═══════════════════════════════════════════════════════════════

export async function submitContact(
  input: Omit<ContactMessage, "id" | "createdAt" | "read">
): Promise<ApiResponse<ContactMessage>> {
  await delay(150)
  const validation = contactMessageInputSchema.safeParse(input)
  if (!validation.success) return fail("Please check the contact form fields")

  const message: ContactMessage = {
    ...validation.data,
    id: `msg_${String(Date.now()).slice(-6)}_${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
    read: false,
  }
  contacts.unshift(message)
  return ok(message)
}

export async function getContactMessages(): Promise<ApiResponse<ContactMessage[]>> {
  await delay(80)
  return ok([...contacts])
}

export async function markContactRead(id: string): Promise<ApiResponse<ContactMessage>> {
  await delay(60)
  const msg = contacts.find((c) => c.id === id)
  if (!msg) return fail("Message not found")
  msg.read = true
  return ok(msg)
}

export async function deleteContact(id: string): Promise<ApiResponse<void>> {
  await delay(80)
  const idx = contacts.findIndex((c) => c.id === id)
  if (idx === -1) return fail("Message not found")
  contacts.splice(idx, 1)
  return ok(undefined)
}
