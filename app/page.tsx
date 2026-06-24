import { Navbar } from '@/components/landing/navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { ProductsSection } from '@/components/landing/products-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { StatsSection } from '@/components/landing/stats-section'
import { ArticlesSection } from '@/components/landing/articles-section'
import { AboutSection } from '@/components/landing/about-section'
import { ContactSection } from '@/components/landing/contact-section'
import { CTASection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProductsSection />
        <TestimonialsSection />
        <StatsSection />
        <ArticlesSection />
        <AboutSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
