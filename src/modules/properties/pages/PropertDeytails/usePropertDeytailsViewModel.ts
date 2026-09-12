import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { Advertisement } from '@dtos/Advertisement'
import { APP_ROUTES } from '@constant/routes'
import { getAdvertisementById } from '@properties/services/advertisementService'
import { getDetailsPresentation, getGoogleMapsUrl, getRouteId, getStaticMapUrl } from './PropertDeytailsModel'
import { usePropertDeytailsImagens } from './usePropertDeytailsImagens'

export function usePropertDeytailsViewModel() {
  const { id: routeId } = useLocalSearchParams<{ id?: string | string[] }>()
  const router = useRouter()
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

  const routeIdValue = getRouteId(routeId)
  const imagensState = usePropertDeytailsImagens()

  const openGallery = () => {
    if (imagensState.imagens.length > 0 && routeIdValue !== null) {
      router.push(`/${APP_ROUTES.detalhes}/${routeIdValue}/galeria`)
    }
  }

  const openFloorPlan = () => {
    if (imagensState.plantas.length > 0 && routeIdValue !== null) {
      router.push(`/${APP_ROUTES.detalhes}/${routeIdValue}/planta`)
    }
  }

  const openVideo = () => {
    const videoUrl = imagensState.videos[0]?.url

    if (videoUrl) {
      Linking.openURL(videoUrl).catch((openError) => {
        console.error('Failed to open video:', openError)
      })
    }
  }

  const openMap = () => {
    if (advertisement) {
      Linking.openURL(getGoogleMapsUrl(advertisement)).catch((openError) => {
        console.error('Failed to open map:', openError)
      })
    }
  }

  return {
    advertisement,
    error,
    isLoading,
    retry: loadAdvertisement,
    imagens: imagensState.imagens,
    plantas: imagensState.plantas,
    videos: imagensState.videos,
    presentation: advertisement ? getDetailsPresentation(advertisement) : null,
    mapImageUrl: advertisement ? getStaticMapUrl(advertisement) : null,
    openGallery,
    openFloorPlan,
    openVideo,
    openMap,
  }
}