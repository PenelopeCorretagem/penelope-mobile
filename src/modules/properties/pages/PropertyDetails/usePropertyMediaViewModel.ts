import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import type { PropertyMediaDto } from '@properties/dtos/media'
import { getPropertyMediaByAdvertisementId } from '@service-penelopec/propertyMediaService'
import { getRouteId } from './PropertyDetailsModel'

type PropertyMediaState = {
  images: PropertyMediaDto[]
  plans: PropertyMediaDto[]
  videos: PropertyMediaDto[]
  isLoading: boolean
  error: string | null
}

const initialState: PropertyMediaState = {
  images: [],
  plans: [],
  videos: [],
  isLoading: true,
  error: null,
}

export function usePropertyMediaViewModel() {
  const params = useLocalSearchParams()
  const routeId = getRouteId(params.id)
  const [state, setState] = useState<PropertyMediaState>(initialState)

  useEffect(() => {
    if (!routeId) {
      setState(prev => ({ ...prev, isLoading: false, error: 'ID inválido' }))
      return
    }

    const loadMedia = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }))
        const result = await getPropertyMediaByAdvertisementId(routeId)
        setState(prev => ({
          ...prev,
          images: result.images,
          plans: result.plans,
          videos: result.videos,
          isLoading: false,
        }))
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Erro ao carregar imagens',
        }))
      }
    }

    loadMedia()
  }, [routeId])

  return state
}
