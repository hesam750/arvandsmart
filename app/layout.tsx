import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Providers } from '@/components/providers/providers'

const byekan = localFont({
  src: './fonts/BYekan.ttf',
  variable: '--font-byekan',
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
      <body className={`${byekan.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
