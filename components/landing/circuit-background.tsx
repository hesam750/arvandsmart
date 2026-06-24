'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function CircuitBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  // Circuit paths - PCB-style patterns
  const paths = [
    "M 0 200 L 100 200 L 100 300 L 250 300 L 250 150 L 400 150",
    "M 0 400 L 150 400 L 150 250 L 300 250 L 300 400 L 500 400",
    "M 100 0 L 100 100 L 200 100 L 200 250 L 350 250",
    "M 0 600 L 200 600 L 200 500 L 400 500 L 400 350 L 600 350",
    "M 300 0 L 300 150 L 450 150 L 450 300 L 550 300",
    "M 500 0 L 500 100 L 350 100 L 350 200 L 500 200 L 500 350",
    "M 700 100 L 600 100 L 600 250 L 450 250 L 450 400",
    "M 800 300 L 650 300 L 650 450 L 500 450 L 500 600",
    "M 900 0 L 900 150 L 750 150 L 750 300 L 600 300",
    "M 1000 200 L 850 200 L 850 350 L 700 350 L 700 500",
    "M 0 800 L 150 800 L 150 650 L 300 650 L 300 800",
    "M 200 900 L 200 750 L 350 750 L 350 600 L 500 600",
    "M 600 700 L 600 550 L 750 550 L 750 700 L 900 700",
    "M 800 600 L 800 450 L 950 450 L 950 600",
    "M 1100 400 L 950 400 L 950 250 L 800 250 L 800 100",
  ]

  // Track mouse position for gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Mouse-reactive gradient */}
      <div
        className="absolute inset-0 opacity-40 transition-opacity duration-500"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, oklch(0.75 0.18 195 / 0.15), transparent 40%)`,
        }}
      />

      {/* Ambient glows */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          top: '10%',
          right: '10%',
          background: 'radial-gradient(circle, oklch(0.65 0.25 300 / 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          bottom: '20%',
          left: '5%',
          background: 'radial-gradient(circle, oklch(0.7 0.2 145 / 0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          top: '40%',
          left: '30%',
          background: 'radial-gradient(circle, oklch(0.75 0.18 195 / 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Circuit board SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for paths */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.75 0.18 195 / 0.6)" />
            <stop offset="50%" stopColor="oklch(0.65 0.25 300 / 0.4)" />
            <stop offset="100%" stopColor="oklch(0.7 0.2 145 / 0.6)" />
          </linearGradient>
        </defs>

        {/* Grid pattern */}
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="oklch(0.3 0.02 260 / 0.2)"
            strokeWidth="0.5"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Circuit paths */}
        {paths.map((path, index) => (
          <g key={index}>
            {/* Base path */}
            <path
              d={path}
              fill="none"
              stroke="oklch(0.3 0.03 260 / 0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Glowing overlay */}
            <path
              d={path}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              className="animate-circuit-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          </g>
        ))}

        {/* Connection nodes */}
        {paths.map((path, pathIndex) => {
          const commands = path.split(/(?=[LM])/).filter(Boolean)
          return commands.map((cmd, cmdIndex) => {
            const match = cmd.match(/[ML]\s*(\d+)\s+(\d+)/)
            if (match && (cmdIndex === 0 || cmdIndex === commands.length - 1)) {
              const x = parseInt(match[1])
              const y = parseInt(match[2])
              return (
                <g key={`${pathIndex}-${cmdIndex}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="oklch(0.1 0.01 260)"
                    stroke="oklch(0.75 0.18 195 / 0.6)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="2"
                    fill="oklch(0.75 0.18 195)"
                    className="animate-pulse-glow"
                    style={{ animationDelay: `${(pathIndex + cmdIndex) * 0.1}s` }}
                  />
                </g>
              )
            }
            return null
          })
        })}
      </svg>

      {/* Subtle noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
