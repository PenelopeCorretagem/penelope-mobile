import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { addFavorite, getFavoriteIds, removeFavorite } from '@service-penelopec/favoriteService'
import { useAuth } from '@shared/context/AuthContext'

type FavoritesContextValue = {
  favoriteIds: number[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (id: number) => Promise<void>
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: PropsWithChildren) {
  const { accessToken } = useAuth()
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])

  useEffect(() => {
    if (!accessToken) {
      setFavoriteIds([])
      return
    }

    void getFavoriteIds().then(setFavoriteIds).catch(() => setFavoriteIds([]))
  }, [accessToken])

  const toggleFavorite = useCallback(async (id: number) => {
    if (favoriteIds.includes(id)) {
      await removeFavorite(id)
      setFavoriteIds((current) => current.filter((favoriteId) => favoriteId !== id))
      return
    }

    await addFavorite(id)
    setFavoriteIds((current) => current.includes(id) ? current : [...current, id])
  }, [favoriteIds])

  const isFavorite = useCallback(
    (id: number) => favoriteIds.includes(id),
    [favoriteIds],
  )

  const value = useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite }),
    [favoriteIds, isFavorite, toggleFavorite],
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }

  return context
}
