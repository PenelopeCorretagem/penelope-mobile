import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ESTATE_TYPES } from '@constant/estateTypes'
import { APP_ROUTES } from '@constant/routes'
import { getAllAdvertisements } from '@properties/services/advertisementService'
import { useFavorites } from '@shared/context/FavoritesContext'
import {
  filterFavoriteGroups,
  getAvailableCities,
  getAvailableRegions,
  getFilteredGroups,
  getTotalResults,
  initialPropertiesFilters,
  PropertiesFilters,
  PropertyGroups,
  toAdvertisementList,
} from './PropertiesModel'

const emptyGroups: PropertyGroups = {
  launch: [],
  available: [],
  underConstruction: [],
}

const FEED_PAGE_SIZE = 4

export function usePropertiesViewModel({ favoritesOnly = false }: { favoritesOnly?: boolean } = {}) {
  const router = useRouter()
  const { favoriteIds } = useFavorites()
  const { city, region, searchTerm, sortOrder, type } = useLocalSearchParams<{
    city?: string | string[]
    region?: string | string[]
    searchTerm?: string | string[]
    sortOrder?: string | string[]
    type?: string | string[]
  }>()

  const [groups, setGroups] = useState<PropertyGroups>(emptyGroups)
  const [filters, setFilters] = useState<PropertiesFilters>(initialPropertiesFilters)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(FEED_PAGE_SIZE)

  useEffect(() => {
    const normalizeRouteValue = (value: string | string[] | undefined) => {
      if (Array.isArray(value)) return value[0] ?? ''

      return value ?? ''
    }

    const nextFilters: PropertiesFilters = {
      ...initialPropertiesFilters,
      searchTerm: normalizeRouteValue(searchTerm),
      city: normalizeRouteValue(city) !== '' ? normalizeRouteValue(city) : null,
      region: normalizeRouteValue(region) !== '' ? normalizeRouteValue(region) : null,
      type: normalizeRouteValue(type) !== '' ? (normalizeRouteValue(type) as PropertiesFilters['type']) : 'TODOS',
      sortOrder: normalizeRouteValue(sortOrder) !== '' ? (normalizeRouteValue(sortOrder) as PropertiesFilters['sortOrder']) : 'none',
    }

    setFilters((currentFilters) => {
      const hasChanged = (
        currentFilters.searchTerm !== nextFilters.searchTerm
        || currentFilters.city !== nextFilters.city
        || currentFilters.region !== nextFilters.region
        || currentFilters.type !== nextFilters.type
        || currentFilters.sortOrder !== nextFilters.sortOrder
      )

      return hasChanged ? nextFilters : currentFilters
    })
  }, [city, region, searchTerm, sortOrder, type])

  const loadAdvertisements = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [launch, available, underConstruction] = await Promise.all([
        getAllAdvertisements({ type: ESTATE_TYPES.LANCAMENTO.apiValue, active: true }),
        getAllAdvertisements({ type: ESTATE_TYPES.DISPONIVEL.apiValue, active: true }),
        getAllAdvertisements({ type: ESTATE_TYPES.EM_OBRAS.apiValue, active: true }),
      ])

      setGroups({
        launch: toAdvertisementList(launch),
        available: toAdvertisementList(available),
        underConstruction: toAdvertisementList(underConstruction),
      })
    } catch (loadError) {
      console.error('Falha ao carregar imóveis', loadError)
      setError('Não foi possível carregar os imóveis. Tente novamente.')
    } finally {
        setTimeout(() => {
        setIsLoading(false)
      }, 1500)
    }
  }, [])

  useEffect(() => {
    void loadAdvertisements()
  }, [loadAdvertisements])

  const groupsForDisplay = useMemo(
    () => favoritesOnly ? filterFavoriteGroups(groups, favoriteIds) : groups,
    [favoriteIds, favoritesOnly, groups],
  )
  const filteredGroups = useMemo(() => getFilteredGroups(groupsForDisplay, filters), [filters, groupsForDisplay])
  const advertisements = useMemo(() => Object.values(filteredGroups).flat(), [filteredGroups])
  const visibleAdvertisements = useMemo(() => advertisements.slice(0, visibleCount), [advertisements, visibleCount])
  const hasMoreAdvertisements = visibleAdvertisements.length < advertisements.length
  const totalResults = useMemo(() => getTotalResults(filteredGroups), [filteredGroups])
  const availableCities = useMemo(() => getAvailableCities(groupsForDisplay), [groupsForDisplay])
  const availableRegions = useMemo(() => getAvailableRegions(groupsForDisplay), [groupsForDisplay])

  const updateFilters = useCallback((updates: Partial<PropertiesFilters>) => {
    setFilters((currentFilters) => ({ ...currentFilters, ...updates }))
  }, [])

  useEffect(() => {
    setVisibleCount(FEED_PAGE_SIZE)
  }, [filters])

  const loadMoreAdvertisements = useCallback(() => {
    if (hasMoreAdvertisements) setVisibleCount((currentCount) => currentCount + FEED_PAGE_SIZE)
  }, [hasMoreAdvertisements])

  const clearFilters = useCallback(() => {
    setFilters(initialPropertiesFilters)
    router.replace({
      pathname: favoritesOnly ? APP_ROUTES.favoritos : APP_ROUTES.imoveis,
      params: {
        city: '',
        region: '',
        searchTerm: '',
        sortOrder: 'none',
        type: 'TODOS',
      },
    })
  }, [favoritesOnly, router])

  return {
    availableCities,
    availableRegions,
    advertisements: visibleAdvertisements,
    clearFilters,
    error,
    filters,
    groups: filteredGroups,
    isLoading,
      hasMoreAdvertisements,
      loadMoreAdvertisements,
    retry: loadAdvertisements,
    totalResults,
    updateFilters,
  }
}