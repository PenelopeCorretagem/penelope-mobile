import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import type { Advertisement } from '@properties/types/advertisement'
import type { PropertyImage } from '@properties/types/property-image'
import type { PropertyMediaDto } from '@properties/dtos/media'
import { MEDIA_TYPES, type MediaTypeId } from '@shared/constants/mediaTypes'
import { getAdvertisementById } from '@properties/services/advertisementService'
import { getRouteId } from './PropertyDetailsModel'

type UsePropertyMediaViewModelOptions = {
  advertisement?: Advertisement | null
  loadFromRoute?: boolean
}

const getMediaTypeId = (image: PropertyImage): MediaTypeId | null => {
  const normalizedDescription = image.type?.description?.trim().toLocaleLowerCase('pt-BR')

  if (image.type?.id === MEDIA_TYPES.COVER || normalizedDescription === 'capa' || normalizedDescription === 'cover') {
    return MEDIA_TYPES.COVER
  }

  if (image.type?.id === MEDIA_TYPES.GALLERY || normalizedDescription === 'imagem') {
    return MEDIA_TYPES.GALLERY
  }

  if (image.type?.id === MEDIA_TYPES.FLOOR_PLAN || normalizedDescription === 'planta') {
    return MEDIA_TYPES.FLOOR_PLAN
  }

  if (image.type?.id === MEDIA_TYPES.VIDEO || normalizedDescription === 'video' || normalizedDescription === 'vídeo') {
    return MEDIA_TYPES.VIDEO
  }

  return null
}

const toPropertyMedia = (
  advertisementId: number,
  image: PropertyImage,
  index: number,
): PropertyMediaDto | null => {
  const mediaTypeId = getMediaTypeId(image)
  if (mediaTypeId === null || !image.url) return null

  return {
    id: image.id ?? index,
    advertisementId,
    mediaTypeId,
    url: image.url,
    mediaType: {
      id: mediaTypeId,
      description: image.type?.description ?? 'Imagem',
    },
  }
}

export function usePropertyMediaViewModel({
  advertisement,
  loadFromRoute = true,
}: UsePropertyMediaViewModelOptions = {}) {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>()
  const [routeAdvertisement, setRouteAdvertisement] = useState<Advertisement | null>(null)
  const [isLoading, setIsLoading] = useState(loadFromRoute)
  const [error, setError] = useState<string | null>(null)
  const [reloadIndex, setReloadIndex] = useState(0)

  useEffect(() => {
    if (!loadFromRoute) {
      setIsLoading(false)
      return
    }

    const advertisementId = getRouteId(id)
    if (advertisementId === null) {
      setRouteAdvertisement(null)
      setError('Imóvel não encontrado.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    void getAdvertisementById(advertisementId)
      .then((result) => {
        setRouteAdvertisement(result ?? null)
        if (!result) setError('Imóvel não encontrado.')
      })
      .catch((loadError) => {
        console.error('Falha ao carregar mídias do imóvel', loadError)
        setRouteAdvertisement(null)
        setError('Não foi possível carregar as mídias do imóvel. Tente novamente.')
      })
      .finally(() => setIsLoading(false))
  }, [id, loadFromRoute, reloadIndex])

  const currentAdvertisement = advertisement ?? routeAdvertisement
  const media = (currentAdvertisement?.property.images ?? [])
    .map((image, index) => toPropertyMedia(currentAdvertisement?.id ?? 0, image, index))
    .filter((item): item is PropertyMediaDto => item !== null)

  return {
    images: media.filter(({ mediaTypeId }) => mediaTypeId === MEDIA_TYPES.COVER || mediaTypeId === MEDIA_TYPES.GALLERY),
    plans: media.filter(({ mediaTypeId }) => mediaTypeId === MEDIA_TYPES.FLOOR_PLAN),
    videos: media.filter(({ mediaTypeId }) => mediaTypeId === MEDIA_TYPES.VIDEO),
    error,
    isLoading,
    retry: () => setReloadIndex((current) => current + 1),
  }
}
