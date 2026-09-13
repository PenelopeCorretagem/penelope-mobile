import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

type FavoritesContextValue = {
  favoriteIds: number[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (id: number) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteIds((current) => (
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    ))
  }, [])

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
