'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/* ─── 2D Vector helpers ─── */
class Vec2 {
  constructor(public x: number, public y: number) {}
  static random(min: number, max: number) {
    return min + Math.random() * (max - min)
  }
}

class Vec3 {
  constructor(public x: number, public y: number, public z: number) {}
  static random(min: number, max: number) {
    return min + Math.random() * (max - min)
  }
}

/* ─── Seeded random generator (deterministic, no global override) ─── */
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/* ─── Constants ─── */
const CHANGE_EVENT_TIME = 0.32
const CAMERA_Z = -400
const CAMERA_TRAVEL = 3400
const START_DOT_Y_OFFSET = 28
const VIEW_ZOOM = 100
const STAR_COUNT = 5000
const TRAIL_LENGTH = 80

/* ─── Animation Controller ─── */
class AnimController {
  readonly cameraZ = CAMERA_Z
  readonly viewZoom = VIEW_ZOOM

  private timeline: gsap.core.Timeline
  private time = 0
  private ctx: CanvasRenderingContext2D
  private size: number
  private stars: Star[] = []

  constructor(
    private canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    private dpr: number,
    size: number,
  ) {
    this.ctx = ctx
    this.size = size

    // Create stars with a seeded generator for consistency
    const rng = seededRandom(1234)
    for (let i = 0; i < STAR_COUNT; i++) {
      this.stars.push(new Star(this.cameraZ, CAMERA_TRAVEL, rng))
    }

    // GSAP timeline drives the animation loop
    this.timeline = gsap.timeline({ repeat: -1 })
    this.timeline.to(this, {
      time: 1,
      duration: 15,
      repeat: -1,
      ease: 'none',
      onUpdate: () => this.render(),
    })
  }

  /* ─── Easing helpers ─── */
  ease(p: number, g: number) {
    return p < 0.5 ? 0.5 * Math.pow(2 * p, g) : 1 - 0.5 * Math.pow(2 * (1 - p), g)
  }

  easeOutElastic(x: number) {
    const c4 = (2 * Math.PI) / 4.5
    if (x <= 0) return 0
    if (x >= 1) return 1
    return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1
  }

  map(value: number, s1: number, s2: number, t1: number, t2: number) {
    return t1 + ((t2 - t1) * (value - s1)) / (s2 - s1)
  }

  constrain(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
  }

  lerp(a: number, b: number, t: number) {
    return a * (1 - t) + b * t
  }

  /* ─── Spiral path for the central trail ─── */
  spiralPath(p: number): Vec2 {
    p = this.constrain(1.2 * p, 0, 1)
    p = this.ease(p, 1.8)
    const theta = 2 * Math.PI * 6 * Math.sqrt(p)
    const r = 170 * Math.sqrt(p)
    return new Vec2(r * Math.cos(theta), r * Math.sin(theta) + START_DOT_Y_OFFSET)
  }

  /* ─── Rotate one point around the midpoint of two points ─── */
  rotate(v1: Vec2, v2: Vec2, p: number, orientation: boolean): Vec2 {
    const mx = (v1.x + v2.x) / 2
    const my = (v1.y + v2.y) / 2
    const dx = v1.x - mx
    const dy = v1.y - my
    const angle = Math.atan2(dy, dx)
    const o = orientation ? -1 : 1
    const r = Math.sqrt(dx * dx + dy * dy)
    const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p)
    return new Vec2(
      mx + r * (1 + bounce) * Math.cos(angle + o * Math.PI * this.easeOutElastic(p)),
      my + r * (1 + bounce) * Math.sin(angle + o * Math.PI * this.easeOutElastic(p)),
    )
  }

  /* ─── Project a 3D point onto the 2D canvas ─── */
  showProjectedDot(position: Vec3, sizeFactor: number) {
    const t2 = this.constrain(this.map(this.time, CHANGE_EVENT_TIME, 1, 0, 1), 0, 1)
    const camZ = this.cameraZ + this.ease(Math.pow(t2, 1.2), 1.8) * CAMERA_TRAVEL

    if (position.z > camZ) {
      const depth = position.z - camZ
      const x = (this.viewZoom * position.x) / depth
      const y = (this.viewZoom * position.y) / depth
      const sw = (400 * sizeFactor) / depth

      this.ctx.lineWidth = sw
      this.ctx.beginPath()
      this.ctx.arc(x, y, 0.5, 0, Math.PI * 2)
      this.ctx.fill()
    }
  }

  private drawStartDot() {
    if (this.time > CHANGE_EVENT_TIME) {
      const dy = (this.cameraZ * START_DOT_Y_OFFSET) / this.viewZoom
      this.showProjectedDot(new Vec3(0, dy, CAMERA_TRAVEL), 2.5)
    }
  }

  private drawTrail(t1: number) {
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const f = this.map(i, 0, TRAIL_LENGTH, 1.1, 0.1)
      const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f

      this.ctx.fillStyle = 'white'
      this.ctx.lineWidth = sw

      const pathTime = t1 - 0.00015 * i
      const pos = this.spiralPath(pathTime)
      const offset = new Vec2(pos.x + 5, pos.y + 5)
      const rotated = this.rotate(pos, offset, Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5, i % 2 === 0)

      this.ctx.beginPath()
      this.ctx.arc(rotated.x, rotated.y, sw / 2, 0, Math.PI * 2)
      this.ctx.fill()
    }
  }

  /* ─── Main render ─── */
  render() {
    const ctx = this.ctx
    const dpr = this.dpr
    if (!ctx) return

    // Fill the full viewport (not just the square)
    const vw = this.canvas.width / dpr
    const vh = this.canvas.height / dpr
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, vw, vh)

    ctx.save()
    // Center at viewport center, not square center
    ctx.translate(vw / 2, vh / 2)

    const t1 = this.constrain(this.map(this.time, 0, CHANGE_EVENT_TIME + 0.25, 0, 1), 0, 1)
    const t2 = this.constrain(this.map(this.time, CHANGE_EVENT_TIME, 1, 0, 1), 0, 1)

    ctx.rotate(-Math.PI * this.ease(t2, 2.7))

    this.drawTrail(t1)

    ctx.fillStyle = 'white'
    for (const star of this.stars) {
      star.render(t1, this)
    }

    this.drawStartDot()
    ctx.restore()
  }

  pause() { this.timeline.pause() }
  resume() { this.timeline.play() }
  destroy() { this.timeline.kill() }
}

/* ─── Single star / particle ─── */
class Star {
  private dx: number
  private dy: number
  private spiralLocation: number
  private strokeWeightFactor: number
  private z: number
  private angle: number
  private distance: number
  private rotationDirection: number
  private expansionRate: number
  private finalScale: number

  constructor(cameraZ: number, cameraTravelDistance: number, rng: () => number) {
    this.angle = rng() * Math.PI * 2
    this.distance = 30 * rng() + 15
    this.rotationDirection = rng() > 0.5 ? 1 : -1
    this.expansionRate = 1.2 + rng() * 0.8
    this.finalScale = 0.7 + rng() * 0.6

    this.dx = this.distance * Math.cos(this.angle)
    this.dy = this.distance * Math.sin(this.angle)

    this.spiralLocation = (1 - Math.pow(1 - rng(), 3.0)) / 1.3
    this.z = Vec2.random(0.5 * cameraZ, cameraTravelDistance + cameraZ)
    this.z = this.lerp(this.z, cameraTravelDistance / 2, 0.3 * this.spiralLocation)
    this.strokeWeightFactor = Math.pow(rng(), 2.0)
  }

  private lerp(a: number, b: number, t: number) {
    return a * (1 - t) + b * t
  }

  render(p: number, ctrl: AnimController) {
    const spiralPos = ctrl.spiralPath(this.spiralLocation)
    const q = p - this.spiralLocation
    if (q <= 0) return

    const progress = ctrl.constrain(4 * q, 0, 1)

    // Blended easing: linear → power → elastic
    const linear = progress
    const elastic = ctrl.easeOutElastic(progress)
    const power = Math.pow(progress, 2)

    let easing: number
    if (progress < 0.3) {
      easing = ctrl.lerp(linear, power, progress / 0.3)
    } else if (progress < 0.7) {
      const t = (progress - 0.3) / 0.4
      easing = ctrl.lerp(power, elastic, t)
    } else {
      easing = elastic
    }

    let screenX: number, screenY: number

    if (progress < 0.3) {
      screenX = ctrl.lerp(spiralPos.x, spiralPos.x + this.dx * 0.3, easing / 0.3)
      screenY = ctrl.lerp(spiralPos.y, spiralPos.y + this.dy * 0.3, easing / 0.3)
    } else if (progress < 0.7) {
      const mid = (progress - 0.3) / 0.4
      const curve = Math.sin(mid * Math.PI) * this.rotationDirection * 1.5
      const bx = spiralPos.x + this.dx * 0.3
      const by = spiralPos.y + this.dy * 0.3
      const tx = spiralPos.x + this.dx * 0.7
      const ty = spiralPos.y + this.dy * 0.7
      const px = -this.dy * 0.4 * curve
      const py = this.dx * 0.4 * curve
      screenX = ctrl.lerp(bx, tx, mid) + px * mid
      screenY = ctrl.lerp(by, ty, mid) + py * mid
    } else {
      const fp = (progress - 0.7) / 0.3
      const bx = spiralPos.x + this.dx * 0.7
      const by = spiralPos.y + this.dy * 0.7
      const td = this.distance * this.expansionRate * 1.5
      const turn = (1.2 * this.rotationDirection * fp * Math.PI)
      const tx = spiralPos.x + td * Math.cos(this.angle + turn)
      const ty = spiralPos.y + td * Math.sin(this.angle + turn)
      screenX = ctrl.lerp(bx, tx, fp)
      screenY = ctrl.lerp(by, ty, fp)
    }

    // Convert to 3D space
    const vx = ((this.z - ctrl.cameraZ) * screenX) / ctrl.viewZoom
    const vy = ((this.z - ctrl.cameraZ) * screenY) / ctrl.viewZoom

    let sizeMul = 1.0
    if (progress < 0.6) {
      sizeMul = 1.0 + progress * 0.2
    } else {
      const t = (progress - 0.6) / 0.4
      sizeMul = 1.2 * (1 - t) + this.finalScale * t
    }

    ctrl.showProjectedDot(new Vec3(vx, vy, this.z), 8.5 * this.strokeWeightFactor * sizeMul)
  }
}

/* ─── React Component ─── */
export function SpiralAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<AnimController | null>(null)
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current)
      resizeTimerRef.current = setTimeout(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight })
      }, 150)
    }

    setDimensions({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = dimensions.width
    const h = dimensions.height
    const size = Math.max(w, h)

    // Canvas buffer matches viewport exactly — no stretching
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    animRef.current = new AnimController(canvas, ctx, dpr, size)

    return () => {
      if (animRef.current) {
        animRef.current.destroy()
        animRef.current = null
      }
    }
  }, [dimensions])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}
