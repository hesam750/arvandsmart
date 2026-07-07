import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Vazirmatn } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Providers } from '@/components/providers/providers'
import { PreloaderProvider } from '@/components/providers/preloader-provider'

const inter = localFont({
  src: './fonts/InterVariable.ttf',
  variable: '--font-inter',
  display: 'swap',
})

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

const SITE_NAME = 'ArvandSmartControl'
const SITE_DESCRIPTION = 'Advanced IoT platform for intelligent monitoring, control and management of chiller systems with real-time data analytics, anomaly detection, and predictive maintenance capabilities.'
const BASE_URL = 'https://arvandsmart.com'

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Intelligent Chiller Monitoring & Control Platform`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
    languages: {
      fa: BASE_URL,
      en: `${BASE_URL}/en`,
      ar: `${BASE_URL}/ar`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    alternateLocale: ['en_US', 'ar_SA'],
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Intelligent Chiller Monitoring & Control Platform`,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ArvandSmartControl — Intelligent Chiller Monitoring Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Intelligent Chiller Monitoring & Control Platform`,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [
    'chiller monitoring',
    'HVAC control system',
    'IoT building management',
    'smart chiller controller',
    'energy optimization',
    'predictive maintenance',
    'BMS system',
    'building automation',
    'کنترل هوشمند چیلر',
    'مدیریت انرژی ساختمان',
    'سیستم مانیتورینگ چیلر',
  ],
  category: 'technology',
  classification: 'IoT & Building Management',
  other: {
    'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f5' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" suppressHydrationWarning className="bg-background">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_NAME,
              alternateName: ['Arvand Smart Control', 'اروند اسمارت کنترل'],
              url: BASE_URL,
              logo: `${BASE_URL}/logo.png`,
              description: SITE_DESCRIPTION,
              foundingDate: '2020',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+98-21-12345678',
                contactType: 'customer service',
                availableLanguage: ['English', 'Persian', 'Arabic'],
              },
              sameAs: [
                'https://linkedin.com/company/arvandsmart',
                'https://instagram.com/arvandsmart',
              ],
              offers: {
                '@type': 'AggregateOffer',
                offerCount: '3',
                availability: 'https://schema.org/InStock',
              },
            }),
          }}
        />
        {/* WebSite schema */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: SITE_NAME,
              url: BASE_URL,
              description: SITE_DESCRIPTION,
              inLanguage: ['fa', 'en', 'ar'],
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* BreadcrumbList schema */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/#products` },
                { '@type': 'ListItem', position: 3, name: 'Blog', item: `${BASE_URL}/blog` },
              ],
            }),
          }}
        />
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for analytics */}
        <link rel="dns-prefetch" href="https://vercel.com" />
      </head>
      <body
        className={`${inter.variable} ${vazirmatn.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Providers>
          <PreloaderProvider>{children}</PreloaderProvider>
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
