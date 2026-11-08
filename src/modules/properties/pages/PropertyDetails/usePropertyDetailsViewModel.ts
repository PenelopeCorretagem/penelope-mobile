import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Linking } from 'react-native'
import type { Advertisement } from '@properties/types/advertisement'
import { APP_ROUTES } from '@constant/routes'
import { getAdvertisementById } from '@properties/services/advertisementService'
import { getEstateBadges } from '@properties/services/badgeService'
import type { PropertyBadge } from '@properties/types/badge'
import { getDetailsPresentation, getGoogleMapsUrl, getRouteId, getStaticMapUrl } from './PropertyDetailsModel'
import { usePropertyMediaViewModel } from './usePropertyMediaViewModel'

export function usePropertyDetailsViewModel() {
  const { id: routeId } = useLocalSearchParams<{ id?: string | string[] }>()
  const router = useRouter()
  const [advertisement, setAdvertisement] = useState<Advertisement | null>(null)
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false)
  const [selectedQuality, setSelectedQuality] = useState<PropertyBadge | null>(null)
  const [badges, setBadges] = useState<PropertyBadge[]>([])
  const [badgesStatus, setBadgesStatus] = useState<'loading' | 'ready' | 'error'>('loading')
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

  // Falha nas insígnias não pode quebrar a tela de detalhes.
  // Insígnias pertencem ao empreendimento (estate.id), não ao id do anúncio da rota.
  const estateId = advertisement?.property.id ?? null
  const loadBadges = useCallback(async () => {
    if (estateId === null) {
      setBadges([])
      setBadgesStatus(advertisement ? 'ready' : 'loading')
      return
    }
    setBadgesStatus('loading')
    try {
      const result = await getEstateBadges(estateId)
      setBadges(result.badges)
      setBadgesStatus('ready')
    } catch (badgesError) {
      console.error('Falha ao carregar insígnias do imóvel', badgesError)
      setBadges([])
      setBadgesStatus('error')
    }
  }, [advertisement, estateId])

  useEffect(() => {
    void loadBadges()
  }, [loadBadges])

  const routeIdValue = getRouteId(routeId)
  const mediaState = usePropertyMediaViewModel({ advertisement, loadFromRoute: false })

  const openGallery = () => {
    if (mediaState.images.length > 0 && routeIdValue !== null) {
      router.push(`/${APP_ROUTES.detalhes}/${routeIdValue}/${APP_ROUTES.detalhesGaleria}`)
    }
  }

  const openFloorPlan = () => {
    if (mediaState.plans.length > 0 && routeIdValue !== null) {
      router.push(`/${APP_ROUTES.detalhes}/${routeIdValue}/${APP_ROUTES.detalhesPlanta}`)
    }
  }

  const openVideo = () => {
    if (mediaState.videos.length > 0) setIsVideoModalVisible(true)
  }

  const openQualityExplanation = (quality: PropertyBadge) => {
    setSelectedQuality(quality)
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
    isVideoModalVisible,
    selectedQuality,
    badges,
    badgesStatus,
    retryBadges: loadBadges,
    presentation: advertisement ? getDetailsPresentation(advertisement) : null,
    mapImageUrl: advertisement ? getStaticMapUrl(advertisement) : null,
    openGallery,
    openFloorPlan,
    openVideo,
    closeVideo: () => setIsVideoModalVisible(false),
    openQualityExplanation,
    closeQualityExplanation: () => setSelectedQuality(null),
    openMap,
  }
}