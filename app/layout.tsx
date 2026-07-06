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

export const metadata: Metadata = {
  title: 'ArvandSmartControl | Intelligent Chiller Monitoring & Control Platform',
  description: 'Advanced IoT platform for intelligent monitoring, control and management of chiller systems with real-time data analytics, anomaly detection, and predictive maintenance capabilities.',
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} ${vazirmatn.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>
          <PreloaderProvider>
            {children}
          </PreloaderProvider>
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
