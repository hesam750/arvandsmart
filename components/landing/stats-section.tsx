'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BarChart3, Building2, Users, TrendingUp } from 'lucide-react'

const stats = [
  { icon: Building2, value: '3,400+', label: 'Units Connected', sub: 'globally deployed' },
  { icon: BarChart3, value: '32%', label: 'Avg. Energy Savings', sub: 'verified reduction' },
  { icon: Users, value: '200+', label: 'Active Clients', sub: 'growing daily' },
  { icon: TrendingUp, value: '99.7%', label: 'Uptime Rate', sub: '30-day rolling' },
]

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section className="relative py-14 sm:py-20 px-4 overflow-hidden" ref={containerRef}>
      {/* Ambient line */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20 rounded-2xl overflow-hidden border border-border/20">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card/30 p-5 sm:p-6 md:p-8 text-center relative group hover:bg-card/50 transition-colors"
              >
                {/* Corner accent */}
                {i < 4 && (
                  <div className="absolute top-0 left-0 w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-primary/60 transition-all" />
                )}
                <Icon className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-primary/40 mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:text-primary/60 transition-colors" />
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-0.5 sm:mb-1 font-mono tracking-tight">{stat.value}</div>
                <div className="text-xs sm:text-sm text-foreground/80 font-medium">{stat.label}</div>
                <div className="text-[9px] sm:text-[10px] data-text text-muted-foreground/40 mt-0.5 sm:mt-1 tracking-wider">{stat.sub}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
