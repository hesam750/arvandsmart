import { Article, Product, CompanyStats, ContactMessage, ApiResponse } from "./types"
import articlesData from "@/data/articles.json"
import productsData from "@/data/products.json"

// ─── In-memory store ────────────────────────────────────────────
let articles: Article[] = [...articlesData.articles] as Article[]
let products: Product[] = [...productsData.products] as Product[]
let contacts: ContactMessage[] = []
let contactIdCounter = 1

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

export async function searchArticles(query: string): Promise<ApiResponse<Article[]>> {
  await delay(80)
  const q = query.toLowerCase()
  const results = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  )
  return ok(results)
}

export async function getArticleCategories(): Promise<ApiResponse<string[]>> {
  await delay(40)
  const cats = [...new Set(articles.map((a) => a.category))]
  return ok(cats)
}

// ── Article Admin (CRUD) ──

export async function createArticle(input: Omit<Article, "id">): Promise<ApiResponse<Article>> {
  await delay(100)
  const article: Article = {
    ...input,
    id: `art_${String(articles.length + 1).padStart(3, "0")}`,
  }
  articles.unshift(article)
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
  return ok(articles[idx])
}

export async function deleteArticle(id: string): Promise<ApiResponse<void>> {
  await delay(100)
  const idx = articles.findIndex((a) => a.id === id)
  if (idx === -1) return fail("Article not found")
  articles.splice(idx, 1)
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
    id: `prod_${String(products.length + 1).padStart(3, "0")}`,
  }
  products.push(product)
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
  return ok(products[idx])
}

export async function deleteProduct(id: string): Promise<ApiResponse<void>> {
  await delay(100)
  const idx = products.findIndex((p) => p.id === id)
  if (idx === -1) return fail("Product not found")
  products.splice(idx, 1)
  return ok(undefined)
}

// ═══════════════════════════════════════════════════════════════
//  CONTACT FORM
// ═══════════════════════════════════════════════════════════════

export async function submitContact(
  input: Omit<ContactMessage, "id" | "createdAt" | "read">
): Promise<ApiResponse<ContactMessage>> {
  await delay(150)
  const message: ContactMessage = {
    ...input,
    id: `msg_${String(contactIdCounter++).padStart(3, "0")}`,
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
