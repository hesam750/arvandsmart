'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const slides = [
  { src: '/screenshots/screen-1.png', alt: 'Arvand Smart Control — Overview' },
  { src: '/screenshots/screen-2.png', alt: 'Arvand Smart Control — Analytics' },
  { src: '/screenshots/screen-3.png', alt: 'Arvand Smart Control — Management' },
]

export function MonitorSlider() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState<Set<number>>(new Set([0]))
  const [paused, setPaused] = useState(false)

  // Preload all images on mount and keep next image ready
  useEffect(() => {
    slides.forEach((slide, i) => {
      const img = new Image()
      img.src = slide.src
      img.onload = () => setLoaded((prev) => new Set(prev).add(i))
    })
  }, [])

  // Preload next image ahead of time
  const nextIndex = (current + 1) % slides.length
  useEffect(() => {
    const img = new Image()
    img.src = slides[nextIndex].src
    img.onload = () => setLoaded((prev) => new Set(prev).add(nextIndex))
  }, [nextIndex])

  // Auto-rotation
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(id)
  }, [paused])

  return (
    <div
      className="relative w-full h-full bg-[#0a0a0c] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={slides[current].src}
          alt={slides[current].alt}
          className="w-full h-full object-contain object-top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="absolute bottom-2 sm:bottom-3 inset-x-0 z-10 flex items-center justify-center gap-1.5 sm:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-4 sm:w-5 h-1.5 sm:h-2 bg-primary/70'
                : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
