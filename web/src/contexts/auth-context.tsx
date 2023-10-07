'use client'

import { ReactNode, createContext, useEffect, useState } from 'react'
import { z } from 'zod'
import { getCookie, setCookie } from 'cookies-next'

import { api } from '@/lib/axios'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
})

interface User {
  id: string
  email: string
}

interface AuthContextProps {
  isAuthenticated: boolean
  user: User | null
  signIn: (data: z.infer<typeof schema>) => Promise<void>
}

interface ReturnProps {
  token: string
  user: {
    id: string
    email: string
    createdAt: Date
  }
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  useEffect(() => {
    const token = getCookie('login-page-token')

    if (token) {
      api.post('/user-info', token).then((response) => {
        setUser(response.data)
      })
    }
  }, [])

  async function signIn({ email, password }: z.infer<typeof schema>) {
    const { token, user }: ReturnProps = await api.post('/login', {
      email,
      password,
    })

    setCookie('login-page-token', token, { maxAge: 60 * 60 * 1 /* 1 hour */ })

    api.defaults.headers.Authorization = `Bearer ${token}`

    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
