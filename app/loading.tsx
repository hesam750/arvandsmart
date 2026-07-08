import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative inline-flex">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        </div>
        <p className="text-sm text-muted-foreground/50 font-mono tracking-wider">
          Loading
          <span className="animate-pulse">.</span>
          <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
        </p>
      </div>
    </div>
  )
}
