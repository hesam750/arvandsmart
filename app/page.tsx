import BackgroundFan from '@/components/landing/BackgroundFan'
import { Navbar } from '@/components/landing/navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { ProductsSection } from '@/components/landing/products-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { BrandShowcaseSection } from '@/components/landing/brand-showcase-section'
import { CaseStudiesSection } from '@/components/landing/case-studies-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { StatsSection } from '@/components/landing/stats-section'
import { ArticlesSection } from '@/components/landing/articles-section'
import { FAQSection } from '@/components/landing/faq-section'
import { ROICalculatorSection } from '@/components/landing/roi-calculator-section'
import { AboutSection } from '@/components/landing/about-section'
import { ContactSection } from '@/components/landing/contact-section'
import { CTASection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <BackgroundFan />
      <Navbar />
      <main>
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
