import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { router } from 'expo-router'
import { APP_ROUTES } from '@shared/constants/routes'
import { authenticate, validateAccessToken } from '@auth/services/authService'
import { clearAccessToken, getAccessToken, saveAccessToken, setSessionExpiredHandler } from '@shared/infrastructure/authTokenStorage'

type AuthContextValue = {
  isLoading: boolean
  isAuthenticated: boolean
  accessToken: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  deleteAccount: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    async function hydrateSession() {
      try {
        const token = await getAccessToken()

        if (token && await validateAccessToken(token)) {
          setAccessToken(token)
        } else {
          await clearAccessToken()
        }
      } catch {
        await clearAccessToken()
      } finally {
        setIsLoading(false)
      }
    }

    void hydrateSession()
  }, [])

  useEffect(() => {
    setSessionExpiredHandler(() => {
      setAccessToken(null)
      router.replace(`/${APP_ROUTES.root}`)
    })

    return () => setSessionExpiredHandler(null)
  }, [])

  const value = useMemo(() => ({
    isLoading,
    isAuthenticated: accessToken !== null,
    accessToken,
    login: async (email: string, password: string) => {
      const token = await authenticate(email, password)
      await saveAccessToken(token)
      setAccessToken(token)
    },
    logout: async () => {
      await clearAccessToken()
      setAccessToken(null)
      router.replace(`/${APP_ROUTES.root}`)
    },
    deleteAccount: async () => {
      await clearAccessToken()
      setAccessToken(null)
      router.replace(`/${APP_ROUTES.root}`)
    },
  }), [accessToken, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
