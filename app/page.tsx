import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { ProductsSection } from '@/components/landing/products-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { BrandShowcaseSection } from '@/components/landing/brand-showcase-section'
import { CaseStudiesSection } from '@/components/landing/case-studies-section'
import { StatsSection } from '@/components/landing/stats-section'
import { ArticlesSection } from '@/components/landing/articles-section'
import { FAQSection } from '@/components/landing/faq-section'
import { ROICalculatorSection } from '@/components/landing/roi-calculator-section'
import { AboutSection } from '@/components/landing/about-section'
import { ContactSection } from '@/components/landing/contact-section'
import { CTASection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'

// Testimonials uses swiper — code-split to keep initial bundle small
const TestimonialsSection = dynamic(
  () => import('@/components/landing/testimonials-section').then(m => ({ default: m.TestimonialsSection })),
  { loading: () => <div className="h-64" aria-hidden="true" /> },
)

const LANDING_DESCRIPTION = 'پلتفرم هوشمند پایش و کنترل چیلر — مانیتورینگ لحظه‌ای، تحلیل مصرف انرژی، تشخیص ناهنجاری و نگهداری پیش‌بینانه برای چیلرهای Carel، Danfoss، Microtech و سایر برندها. بدون نیاز به گیت‌وی، اتصال مستقیم TCP/IP.'

export const metadata: Metadata = {
  title: 'ArvandSmartControl | پلتفرم هوشمند پایش و کنترل چیلر',
  description: LANDING_DESCRIPTION,
  openGraph: {
    title: 'ArvandSmartControl | پلتفرم هوشمند پایش و کنترل چیلر',
    description: LANDING_DESCRIPTION,
    url: 'https://arvandsmart.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArvandSmartControl | پلتفرم هوشمند پایش و کنترل چیلر',
    description: LANDING_DESCRIPTION,
  },
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ProductsSection />
        <PricingSection />
        <BrandShowcaseSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <StatsSection />
        <ArticlesSection />
        <FAQSection />
        <ROICalculatorSection />
        <AboutSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
