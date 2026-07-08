import Link from 'next/link'
import { Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.6 0.2 225 / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.6 0.2 225 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative z-10 text-center max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
          <Monitor className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-7xl sm:text-8xl font-bold tracking-tight text-primary mb-2 font-mono">
          404
        </h1>
        <p className="text-lg sm:text-xl font-bold tracking-tight text-foreground/90 mb-2">
          Page Not Found
        </p>
        <p className="text-sm text-muted-foreground/60 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto px-6">
              Back to Home
            </Button>
          </Link>
          <Link href="/blog">
            <Button variant="outline" className="w-full sm:w-auto px-6 border-primary/20">
              Browse Blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
