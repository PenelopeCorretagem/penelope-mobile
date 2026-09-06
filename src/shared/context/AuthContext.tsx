import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { router } from 'expo-router'
import { APP_ROUTES } from '@shared/constants/routes'

type AuthContextValue = {
  isLoading: boolean
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  deleteAccount: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)

    return () => clearTimeout(timer)
  }, [])

  const value = useMemo(() => ({
    isLoading,
    isAuthenticated,
    login: () => setIsAuthenticated(true),
    logout: () => {
      router.replace(`/${APP_ROUTES.root}`)
      setIsLoading(true)
      setTimeout(() => {
        setIsAuthenticated(false)
        setIsLoading(false)
      }, 1500)
    },
    deleteAccount: () => {
      router.replace(`/${APP_ROUTES.root}`)
      setIsLoading(true)
      setTimeout(() => {
        setIsAuthenticated(false)
        setIsLoading(false)
      }, 1500)
    },
  }), [isAuthenticated, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
