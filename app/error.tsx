'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Monitor, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

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
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-destructive/10 border border-destructive/20 mb-6">
          <Monitor className="w-10 h-10 text-destructive" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground/90 mb-2">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground/60 mb-8 leading-relaxed">
          An unexpected error occurred. Our team has been notified.
          Please try again or return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} className="w-full sm:w-auto px-6 gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto px-6 border-primary/20 gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 text-[10px] text-muted-foreground/20 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
