import { useCallback, useEffect, useMemo, useState } from 'react'
import { ESTATE_TYPES } from '@constant/estateTypes'
import { getAllAdvertisements } from '@service-penelopec/advertisementService'
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
  const [groups, setGroups] = useState<PropertyGroups>(emptyGroups)
  const [filters, setFilters] = useState<PropertiesFilters>(initialPropertiesFilters)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      setIsLoading(false)
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
  }, [])

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