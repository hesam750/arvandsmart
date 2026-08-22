'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { motion } from 'motion/react'

import {
  Lock,
  User,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/i18n/language-context'

export function LoginClient() {
  const router = useRouter()
  const { t, dir } = useLanguage()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })

      if (result?.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(t('login.error'))
      }
    } catch {
      setError(t('login.error.generic'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* ================= Background ================= */}
      <div className="absolute inset-0">
        {/* Main background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />

        {/* Grid */}
        <div
          className="
            absolute inset-0
            opacity-[0.04]
            dark:opacity-[0.06]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                oklch(0.6 0.2 225 / 0.3) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                oklch(0.6 0.2 225 / 0.3) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow - left */}
        <div
          className="
            absolute
            top-1/4
            -left-32
            w-96
            h-96
            rounded-full
            bg-primary/5
            blur-[120px]
          "
        />

        {/* Glow - right */}
        <div
          className="
            absolute
            bottom-1/4
            -right-32
            w-80
            h-80
            rounded-full
            bg-accent/5
            blur-[100px]
          "
        />
      </div>

      {/* ================= Scanline ================= */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.03]
          dark:opacity-[0.02]
        "
        style={{
          backgroundImage: 'var(--scanline)',
        }}
      />

      {/* ================= Login Container ================= */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full max-w-md"
        dir={dir}
      >
        {/* ================= Login Card ================= */}
        <div className="card-command p-6 sm:p-8 md:p-10">

          {/* ================= Logo ================= */}
          <div className="text-center mb-8">

            <Link
              href="/"
              aria-label="ArvandSmartControl"
              className="
                inline-flex
                items-center
                justify-center
                group
              "
            >
              <img
                src="/logo/arvandsmart.png"
                alt="ArvandSmartControl"
                className="
                  block
                  w-auto
                  h-16
                  sm:h-[72px]
                  md:h-20
                  max-w-[260px]
                  sm:max-w-[300px]
                  object-contain
                  transition-transform
                  duration-300
                  group-hover:scale-[1.02]
                "
                loading="eager"
                decoding="async"
              />
            </Link>

            {/* Login title */}
            <p
              className="
                text-sm
                text-muted-foreground/60
                mt-4
                font-mono
                tracking-wider
              "
            >
              {t('login.title')}
            </p>
          </div>

          {/* ================= Login Form ================= */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ================= Username ================= */}
            <div>
              <label
                htmlFor="username"
                className="
                  block
                  text-xs
                  font-mono
                  text-muted-foreground/60
                  tracking-wider
                  mb-1.5
                "
              >
                {t('login.username')}
              </label>

              <div className="relative">

                <User
                  className="
                    absolute
                    inset-s-3
                    top-1/2
                    -translate-y-1/2
                    w-4
                    h-4
                    text-muted-foreground/40
                    pointer-events-none
                  "
                />

                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('login.username.placeholder')}
                  autoComplete="username"
                  required
                  className="
                    ps-10
                    bg-background/50
                    border-border/40
                  "
                />
              </div>
            </div>

            {/* ================= Password ================= */}
            <div>
              <label
                htmlFor="password"
                className="
                  block
                  text-xs
                  font-mono
                  text-muted-foreground/60
                  tracking-wider
                  mb-1.5
                "
              >
                {t('login.password')}
              </label>

              <div className="relative">

                <Lock
                  className="
                    absolute
                    inset-s-3
                    top-1/2
                    -translate-y-1/2
                    w-4
                    h-4
                    text-muted-foreground/40
                    pointer-events-none
                  "
                />

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.password.placeholder')}
                  autoComplete="current-password"
                  required
                  className="
                    ps-10
                    pe-10
                    bg-background/50
                    border-border/40
                  "
                />

                {/* Show / Hide password */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                  className="
                    absolute
                    end-3
                    top-1/2
                    -translate-y-1/2
                    text-muted-foreground/40
                    hover:text-muted-foreground
                    transition-colors
                  "
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* ================= Error ================= */}
            {error && (
              <motion.p
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  text-sm
                  text-destructive
                  bg-destructive/10
                  px-3
                  py-2
                  rounded-lg
                  text-center
                "
                role="alert"
              >
                {error}
              </motion.p>
            )}

            {/* ================= Submit ================= */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-5"
            >
              {loading ? (
                <>
                  <Loader2
                    className="
                      w-4
                      h-4
                      me-2
                      animate-spin
                    "
                  />

                  {t('login.checking')}
                </>
              ) : (
                <>
                  <Lock
                    className="
                      w-4
                      h-4
                      me-2
                    "
                  />

                  {t('login.signin')}
                </>
              )}
            </Button>
          </form>

          {/* ================= Footer ================= */}
          <p
            className="
              text-center
              text-[10px]
              text-muted-foreground/30
              mt-6
              font-mono
              tracking-wider
            "
          >
            {t('login.footer')}
          </p>
        </div>
      </motion.div>
    </div>
  )
}