import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'

type AuthContextValue = {
  isLoading: boolean
  isAuthenticated: boolean
  login: () => void
  logout: () => void
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
