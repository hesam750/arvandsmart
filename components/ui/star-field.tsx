'use client'

import { useMemo } from 'react'

interface StarFieldProps {
  /** Number of stars */
  count?: number
  /** How fast the slowest stars animate (seconds) */
  maxDuration?: number
}

export function StarField({ count = 120, maxDuration = 6 }: StarFieldProps) {
  // Generate stars once — stable random positions across renders
  const stars = useMemo(() => {
    const result: { left: number; top: number; size: number; delay: number; dur: number; hue: number }[] = []
    // Simple seeded-ish random generator
    let seed = 42
    const next = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }
    for (let i = 0; i < count; i++) {
      const tintRoll = next()
      result.push({
        left: next() * 100,
        top: next() * 100,
        size: 0.5 + next() * 2.5,         // 0.5 – 3px
        delay: next() * maxDuration,
        dur: 1.5 + next() * (maxDuration - 1.5),
        // ~80% white, 10% slightly blue, 10% slightly warm
        hue: tintRoll < 0.8 ? 0 : tintRoll < 0.9 ? 220 : 40,
      })
    }
    return result
  }, [count, maxDuration])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          20%       { opacity: 1; transform: scale(1); }
          40%       { opacity: 0.8; transform: scale(0.9); }
          60%       { opacity: 1; transform: scale(1.1); }
          80%       { opacity: 0.3; transform: scale(0.6); }
        }
        @keyframes shootingStar {
          0%   { transform: translateX(0) translateY(0); opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translateX(60vw) translateY(30vh); opacity: 0; }
        }
        .star { animation: twinkle var(--dur) ease-in-out infinite; }
        .shooting-star { animation: shootingStar 8s ease-in-out infinite; }
      `}</style>

      {/* Stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="star absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            '--dur': `${s.dur}s`,
            background: s.hue === 0
              ? 'currentColor'
              : `hsl(${s.hue}, 40%, 70%)`,
            color: 'inherit',
          } as React.CSSProperties}
        />
      ))}

      {/* Shooting star — crosses every 8s */}
      <div className="shooting-star absolute top-[15%] -left-4 h-px w-20 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  )
}
