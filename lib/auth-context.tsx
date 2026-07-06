'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  user: { username: string; role: string } | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Arvand@1403'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('admin_auth')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.username && data.expires > Date.now()) {
          setIsAuthenticated(true)
          setUser({ username: data.username, role: data.role || 'admin' })
        } else {
          localStorage.removeItem('admin_auth')
        }
      } catch {
        localStorage.removeItem('admin_auth')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const data = {
        username,
        role: 'admin',
        expires: Date.now() + 24 * 60 * 60 * 1000,
      }
      localStorage.setItem('admin_auth', JSON.stringify(data))
      setIsAuthenticated(true)
      setUser({ username, role: 'admin' })
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('admin_auth')
    setIsAuthenticated(false)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
