import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ESTATE_TYPES } from '@constant/estateTypes'
import { APP_ROUTES } from '@constant/routes'
import { getAllAdvertisements } from '@properties/services/advertisementService'
import {
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

export function usePropertiesViewModel() {
  const router = useRouter()
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

  useEffect(() => {
    const nextFilters: PropertiesFilters = {
      ...initialPropertiesFilters,
      searchTerm: typeof searchTerm === 'string' ? searchTerm : '',
      city: typeof city === 'string' ? city : null,
      region: typeof region === 'string' ? region : null,
      type: typeof type === 'string' && type !== '' ? (type as PropertiesFilters['type']) : 'TODOS',
      sortOrder: typeof sortOrder === 'string' && sortOrder !== '' ? (sortOrder as PropertiesFilters['sortOrder']) : 'none',
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

  const filteredGroups = useMemo(() => getFilteredGroups(groups, filters), [filters, groups])
  const totalResults = useMemo(() => getTotalResults(filteredGroups), [filteredGroups])
  const availableCities = useMemo(() => getAvailableCities(groups), [groups])
  const availableRegions = useMemo(() => getAvailableRegions(groups), [groups])

  const updateFilters = useCallback((updates: Partial<PropertiesFilters>) => {
    setFilters((currentFilters) => ({ ...currentFilters, ...updates }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters(initialPropertiesFilters)
    router.replace({
      pathname: APP_ROUTES.imoveis,
      params: {
        city: '',
        region: '',
        searchTerm: '',
        sortOrder: 'none',
        type: 'TODOS',
      },
    })
  }, [router])

  return {
    availableCities,
    availableRegions,
    clearFilters,
    error,
    filters,
    groups: filteredGroups,
    isLoading,
    retry: loadAdvertisements,
    totalResults,
    updateFilters,
  }
}