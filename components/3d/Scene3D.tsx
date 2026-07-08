'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Constants ─── */
const RING_COUNT = 6
const PARTICLE_COUNT = 800

/* ─── 3D Orbiting Rings ─── */
function Rings({ mouse, scroll }: { mouse: React.MutableRefObject<[number, number]>; scroll: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!)
  const ringRefs = useRef<THREE.Mesh[]>([])

  const ringData = useMemo(
    () =>
      Array.from({ length: RING_COUNT }, (_, i) => {
        const radius = 2.2 + i * 0.45
        const tilt = (i / RING_COUNT) * Math.PI * 0.4
        const speed = 0.12 + i * 0.03
        const phase = (i / RING_COUNT) * Math.PI * 2
        return { radius, tilt, speed, phase }
      }),
    [],
  )

  useFrame((state) => {
    if (!groupRef.current) return

    // Smooth mouse follow
    groupRef.current.rotation.x += (mouse.current[1] * 0.3 - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.y += (mouse.current[0] * 0.3 - groupRef.current.rotation.y) * 0.04

    // Scroll-based rotation (y-axis spin)
    groupRef.current.rotation.z = scroll.current * 0.8

    // Animate individual rings
    ringRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const data = ringData[i]
      mesh.rotation.x = data.tilt + Math.sin(state.clock.elapsedTime * data.speed + data.phase) * 0.08
      mesh.rotation.z = state.clock.elapsedTime * data.speed * 0.3 + data.phase
    })
  })

  return (
    <group ref={groupRef}>
      {ringData.map((data, i) => (
        <mesh
          key={i}
          ref={(el) => { ringRefs.current[i] = el! }}
          rotation={[data.tilt, 0, data.phase]}
        >
          <torusGeometry args={[data.radius, 0.015 + (i * 0.005), 24, 80]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#a855f7' : '#22d3ee'}
            transparent
            opacity={0.25 + i * 0.04}
            wireframe={false}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Floating Particles ─── */
function Particles({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [])

  const colors = useMemo(() => {
    const c = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = Math.random()
      c[i * 3] = 0.66 + t * 0.34       // R (purple range)
      c[i * 3 + 1] = 0.4 + (1 - t) * 0.5 // G
      c[i * 3 + 2] = 0.8 + (1 - t) * 0.2 // B (cyan range)
    }
    return c
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const count = PARTICLE_COUNT
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      // Gentle floating motion
      pos[i * 3] += Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.001
      pos[i * 3 + 1] += Math.cos(state.clock.elapsedTime * 0.15 + i * 0.7) * 0.001
      pos[i * 3 + 2] += Math.sin(state.clock.elapsedTime * 0.1 + i * 1.3) * 0.001

      // Wrap boundaries
      if (pos[i * 3] > 10) pos[i * 3] = -10
      if (pos[i * 3] < -10) pos[i * 3] = 10
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10
      if (pos[i * 3 + 1] < -10) pos[i * 3 + 1] = 10
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // Subtle mouse influence on rotation
    pointsRef.current.rotation.x += (mouse.current[1] * 0.1 - pointsRef.current.rotation.x) * 0.01
    pointsRef.current.rotation.y += (mouse.current[0] * 0.1 - pointsRef.current.rotation.y) * 0.01
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ─── Scene ─── */
function Scene({ mouse, scroll }: { mouse: React.MutableRefObject<[number, number]>; scroll: React.MutableRefObject<number> }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.z = 6
  }, [camera])

  useFrame(() => {
    // Scroll-responsive camera — pull back slightly as user scrolls
    camera.position.z = 6 + scroll.current * 0.5
  })

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

/* ─── Main Export ─── */
export default function Scene3D() {
  const mouse = useRef<[number, number]>([0, 0])
  const scroll = useRef<number>(0)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        (e.clientY / window.innerHeight - 0.5) * 2,
      ]
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
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 6], fov: 50 }}
      >
        <Scene mouse={mouse} scroll={scroll} />
      </Canvas>
    </div>
  )
}
