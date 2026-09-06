import { useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Advertisement } from '@dtos/Advertisement'
import { getAdvertisementById } from '@properties/services/advertisementService'
import { getRouteId } from './PropertDeytailsModel'

export function usePropertDeytailsViewModel() {
  const { id: routeId } = useLocalSearchParams<{ id?: string | string[] }>()
  const [advertisement, setAdvertisement] = useState<Advertisement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadAdvertisement = useCallback(async () => {
    const id = getRouteId(routeId)
    setIsLoading(true)
    setError(null)

    if (id === null) {
      setAdvertisement(null)
      setError('Imóvel não encontrado.')
      setIsLoading(false)
      return
    }

    try {
      const result = await getAdvertisementById(id)
      setAdvertisement(result ?? null)
      if (!result) setError('Imóvel não encontrado.')
    } catch (loadError) {
      console.error('Falha ao carregar detalhes do imóvel', loadError)
      setAdvertisement(null)
      setError('Não foi possível carregar os detalhes do imóvel. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [routeId])

  useEffect(() => {
    void loadAdvertisement()
  }, [loadAdvertisement])

  return { advertisement, error, isLoading, retry: loadAdvertisement }
}