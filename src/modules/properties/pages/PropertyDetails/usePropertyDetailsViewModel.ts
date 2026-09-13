import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Linking } from 'react-native'
import type { Advertisement } from '@properties/types/advertisement'
import { APP_ROUTES } from '@constant/routes'
import { getAdvertisementById } from '@properties/services/advertisementService'
import { getDetailsPresentation, getGoogleMapsUrl, getRouteId, getStaticMapUrl } from './PropertyDetailsModel'
import { usePropertyMediaViewModel } from './usePropertyMediaViewModel'

export function usePropertyDetailsViewModel() {
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
  const mediaState = usePropertyMediaViewModel()

  const openGallery = () => {
    if (mediaState.images.length > 0 && routeIdValue !== null) {
      router.push(`/${APP_ROUTES.detalhes}/${routeIdValue}/galeria`)
    }
  }

  const openFloorPlan = () => {
    if (mediaState.plans.length > 0 && routeIdValue !== null) {
      router.push(`/${APP_ROUTES.detalhes}/${routeIdValue}/planta`)
    }
  }

  const openVideo = () => {
    const videoUrl = mediaState.videos[0]?.url

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
    images: mediaState.images,
    plans: mediaState.plans,
    videos: mediaState.videos,
    presentation: advertisement ? getDetailsPresentation(advertisement) : null,
    mapImageUrl: advertisement ? getStaticMapUrl(advertisement) : null,
    openGallery,
    openFloorPlan,
    openVideo,
    openMap,
  }
}