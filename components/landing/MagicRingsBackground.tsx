'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── 3D orbiting rings + particles (from Scene3D) ─── */
const RING_COUNT = 6
const PARTICLE_COUNT = 800

function Rings({ mouse, scroll }: { mouse: React.MutableRefObject<[number, number]>; scroll: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!)
  const ringRefs = useRef<THREE.Mesh[]>([])

  const ringData = Array.from({ length: RING_COUNT }, (_, i) => ({
    radius: 2.2 + i * 0.45,
    tilt: (i / RING_COUNT) * Math.PI * 0.4,
    speed: 0.12 + i * 0.03,
    phase: (i / RING_COUNT) * Math.PI * 2,
  }))

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.x += (mouse.current[1] * 0.3 - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.y += (mouse.current[0] * 0.3 - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.z = scroll.current * 0.8

    ringRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const d = ringData[i]
      mesh.rotation.x = d.tilt + Math.sin(state.clock.elapsedTime * d.speed + d.phase) * 0.08
      mesh.rotation.z = state.clock.elapsedTime * d.speed * 0.3 + d.phase
    })
  })

  return (
    <group ref={groupRef}>
      {ringData.map((d, i) => (
        <mesh key={i} ref={(el) => { ringRefs.current[i] = el! }} rotation={[d.tilt, 0, d.phase]}>
          <torusGeometry args={[d.radius, 0.015 + i * 0.005, 24, 80]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#a855f7' : '#22d3ee'} transparent opacity={0.25 + i * 0.04} metalness={0.7} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function Particles({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15
  }
  const colors = new Float32Array(PARTICLE_COUNT * 3)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const t = Math.random()
    colors[i * 3] = 0.66 + t * 0.34
    colors[i * 3 + 1] = 0.4 + (1 - t) * 0.5
    colors[i * 3 + 2] = 0.8 + (1 - t) * 0.2
  }

  useFrame((state) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] += Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.001
      pos[i * 3 + 1] += Math.cos(state.clock.elapsedTime * 0.15 + i * 0.7) * 0.001
      pos[i * 3 + 2] += Math.sin(state.clock.elapsedTime * 0.1 + i * 1.3) * 0.001
      if (pos[i * 3] > 10) pos[i * 3] = -10
      if (pos[i * 3] < -10) pos[i * 3] = 10
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10
      if (pos[i * 3 + 1] < -10) pos[i * 3 + 1] = 10
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.x += (mouse.current[1] * 0.1 - pointsRef.current.rotation.x) * 0.01
    pointsRef.current.rotation.y += (mouse.current[0] * 0.1 - pointsRef.current.rotation.y) * 0.01
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function Scene3DLayer({ mouse, scroll }: { mouse: React.MutableRefObject<[number, number]>; scroll: React.MutableRefObject<number> }) {
  const { camera } = useThree()
  useEffect(() => { camera.position.z = 6 }, [camera])
  useFrame(() => { camera.position.z = 6 + scroll.current * 0.5 })
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#a855f7" />
      <Rings mouse={mouse} scroll={scroll} />
      <Particles mouse={mouse} />
    </>
  )
}

/* ─── Fan SVG with 3D mouse-follow tilt ─── */
function FanInCenter() {
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()
  useEffect(() => { setIsMounted(true) }, [])

  // 3D tilt via motion values
  const tiltX = useMotionValue(0.5)
  const tiltY = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(tiltX, [0, 1], [6, -6]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(tiltY, [0, 1], [-6, 6]), { stiffness: 200, damping: 25 })

  const containerRef = useRef<HTMLDivElement>(null!)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    tiltX.set((e.clientX - rect.left) / rect.width)
    tiltY.set((e.clientY - rect.top) / rect.height)
  }
  const handleMouseLeave = () => { tiltX.set(0.5); tiltY.set(0.5) }

  const isDark = theme === 'dark'

  // Colors for dark/light
  const c = isDark
    ? { bgBase: '#0f172a', metal1: '#e2e8f0', metal2: '#94a3b8', metal3: '#64748b', metal4: '#cbd5e1', hub1: '#f1f5f9', hub2: '#cbd5e1', hub3: '#94a3b8', ring: '#334155', ringAccent: '#1e293b', tick: '#94a3b8', hubDark: '#1e293b', hubDarker: '#334155', hubBlack: '#0f172a' }
    : { bgBase: '#f1f5f9', metal1: '#ffffff', metal2: '#cbd5e1', metal3: '#94a3af', metal4: '#e2e8f0', hub1: '#ffffff', hub2: '#e2e8f0', hub3: '#cbd5e1', ring: '#cbd5e1', ringAccent: '#94a3b8', tick: '#64748b', hubDark: '#e5e7eb', hubDarker: '#d1d5db', hubBlack: '#9ca3af' }
  const opacity = isDark ? 'opacity-35' : 'opacity-25'

  if (!isMounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[min(55vw,400px)] h-[min(55vw,400px)] rounded-full opacity-20 bg-slate-900" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none perspective-[1200px]">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, perspective: 1200 }}
        className={`relative w-[min(55vw,400px)] h-[min(55vw,400px)] rounded-full flex items-center justify-center ${opacity}`}
        suppressHydrationWarning
      >
        {/* 3D depth layers: back glow */}
        <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-primary/5 via-chart-2/5 to-transparent blur-3xl animate-pulse" style={{ translateZ: '-20px' }} />

        {/* 3D depth layers: SVG fan at z=0 */}
        <div style={{ translateZ: '0px' }}>
          <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10">
            <defs>
              <linearGradient id="fanMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={c.metal1} />
                <stop offset="35%" stopColor={c.metal2} />
                <stop offset="65%" stopColor={c.metal3} />
                <stop offset="100%" stopColor={c.metal4} />
              </linearGradient>
              <radialGradient id="fanHub" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={c.hub1} />
                <stop offset="60%" stopColor={c.hub2} />
                <stop offset="100%" stopColor={c.hub3} />
              </radialGradient>
              <filter id="fanGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="0.4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <clipPath id="fanClipInner"><circle cx="60" cy="60" r="52" /></clipPath>
            </defs>

            <circle cx="60" cy="60" r="58" fill={c.bgBase} />
            <circle cx="60" cy="60" r="56" fill="none" stroke={c.ring} strokeWidth="3" opacity="0.6" />
            <circle cx="60" cy="60" r="51" fill="none" stroke={c.ringAccent} strokeWidth="0.6" opacity="0.5" />
            <circle cx="60" cy="60" r="48" fill="none" stroke={c.ring} strokeWidth="0.4" opacity="0.3" />

            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 10 * Math.PI) / 180
              const isMajor = i % 3 === 0
              const r1 = 53, r2 = isMajor ? 50.5 : 51.8
              return (
                <line key={i}
                  x1={+(60 + r1 * Math.cos(angle)).toFixed(10)}
                  y1={+(60 + r1 * Math.sin(angle)).toFixed(10)}
                  x2={+(60 + r2 * Math.cos(angle)).toFixed(10)}
                  y2={+(60 + r2 * Math.sin(angle)).toFixed(10)}
                  stroke={c.tick} strokeWidth={isMajor ? '0.5' : '0.3'} opacity={isMajor ? '0.4' : '0.2'}
                />
              )
            })}

            <g className="origin-center animate-[spin_8s_linear_infinite]" style={{ transformOrigin: '60px 60px' }} clipPath="url(#fanClipInner)" filter="url(#fanGlow)">
              <g transform="translate(60,60) scale(0.80)">
                <g id="blade6" fill="url(#fanMetal)">
                  <path d="M 2 -18 C 8 -30, 22 -40, 34 -42 C 45 -44, 50 -42, 52 -38 C 54 -33, 49 -27, 42 -24 C 33 -20, 22 -15, 14 -9 C 6 -3, 0 4, -2 10 C -4 15, -6 18, -10 18 C -14 18, -16 14, -16 10 C -16 2, -10 -8, 2 -18 Z" />
                </g>
                <use href="#blade6" transform="rotate(0)" />
                <use href="#blade6" transform="rotate(60)" />
                <use href="#blade6" transform="rotate(120)" />
                <use href="#blade6" transform="rotate(180)" />
                <use href="#blade6" transform="rotate(240)" />
                <use href="#blade6" transform="rotate(300)" />
              </g>
            </g>

            <circle cx="60" cy="60" r="13.5" fill={c.bgBase} stroke={c.ring} strokeWidth="1" />
            <circle cx="60" cy="60" r="11.5" fill="url(#fanHub)" stroke={c.tick} strokeWidth="0.6" />
            <circle cx="60" cy="60" r="8" fill="none" stroke={c.tick} strokeWidth="0.3" opacity="0.5" />
            <circle cx="60" cy="60" r="4.5" fill={c.hubDark} stroke={c.hubDarker} strokeWidth="0.4" />
            <circle cx="60" cy="60" r="2" fill={c.hubBlack} />
          </svg>
        </div>

        {/* 3D depth layers: front glow */}
        <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-primary/5 to-chart-2/5 blur-2xl animate-pulse" style={{ translateZ: '15px', animationDelay: '2s' }} />
      </motion.div>
    </div>
  )
}

/* ─── Main Export ─── */
export default function MagicRingsBackground() {
  const mouse = useRef<[number, number]>([0, 0])
  const scroll = useRef<number>(0)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current = [(e.clientX / window.innerWidth - 0.5) * 2, (e.clientY / window.innerHeight - 0.5) * 2]
    }
    const handleScroll = () => {
      scroll.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    }
    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 bg-background">
      {/* 3D scene layer */}
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} camera={{ position: [0, 0, 6], fov: 50 }}>
        <Scene3DLayer mouse={mouse} scroll={scroll} />
      </Canvas>

      {/* Fan overlay with 3D tilt */}
      <FanInCenter />
    </div>
  )
}
