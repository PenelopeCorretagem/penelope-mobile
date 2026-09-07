import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { PROPERTY_TYPES } from '@constant/propertyTypes'
import { APP_ROUTES } from '@shared/constants/routes'
import { getAllAdvertisements } from '@properties/services/advertisementService'
import { requestDeviceLocation } from '@service-penelopec/locationService'
import { useFavorites } from '@shared/context/FavoritesContext'
import {
  filterFavoriteGroups,
  getAdvertisementDistanceInKm,
  getAvailableCities,
  getAvailableRegions,
  getFilteredGroups,
  getTotalResults,
  initialPropertiesFilters,
  PropertiesFilters,
  PropertyGroups,
  sortAdvertisements,
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
  const [deviceLocation, setDeviceLocation] = useState<{ latitude: number; longitude: number } | null>(null)

  useEffect(() => {
    const loadDeviceLocation = async () => {
      try {
        setDeviceLocation(await requestDeviceLocation())
      } catch (locationError) {
        console.error('Falha ao obter localizacao do dispositivo', locationError)
        setDeviceLocation(null)
      }
    }

    void loadDeviceLocation()
  }, [])

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
      sortOrder: normalizeRouteValue(sortOrder) !== '' ? (normalizeRouteValue(sortOrder) as PropertiesFilters['sortOrder']) : 'distance',
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
        getAllAdvertisements({ type: PROPERTY_TYPES.LANCAMENTO.apiValue, active: true }),
        getAllAdvertisements({ type: PROPERTY_TYPES.DISPONIVEL.apiValue, active: true }),
        getAllAdvertisements({ type: PROPERTY_TYPES.EM_OBRAS.apiValue, active: true }),
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
  const filteredGroups = useMemo(() => getFilteredGroups(groupsForDisplay, filters, deviceLocation ?? undefined), [deviceLocation, filters, groupsForDisplay])
  const advertisements = useMemo(() => sortAdvertisements(
    Object.values(filteredGroups).flat(),
    filters.sortOrder,
    deviceLocation ?? undefined,
  ), [deviceLocation, filteredGroups, filters.sortOrder])
  const visibleAdvertisements = useMemo(() => advertisements
    .map((advertisement) => ({
      ...advertisement,
      distanceKm: deviceLocation ? getAdvertisementDistanceInKm(advertisement, deviceLocation) ?? undefined : undefined,
    }))
    .slice(0, visibleCount), [advertisements, deviceLocation, visibleCount])
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
        sortOrder: 'distance',
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