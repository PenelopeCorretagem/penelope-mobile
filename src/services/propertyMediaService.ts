import { MEDIA_TYPES, type MediaTypeId } from '@shared/constants/mediaTypes'
import type { MediaTypeDto } from '@properties/dtos/media-type'
import type { PropertyMediaDto } from '@properties/dtos/media'
import { apiRequest } from '@shared/infrastructure/apiClient'
import { API_ROUTES } from '@constant/apiRoutes'

type RawPropertyMedia = {
  id: number
  fk_empreendimento: number
  fk_tipo_imagem: number
  url: string
}

type RawMediaType = {
  id?: unknown
  descricao?: unknown
  description?: unknown
}

type MediaCollections = {
  images: PropertyMediaDto[]
  plans: PropertyMediaDto[]
  videos: PropertyMediaDto[]
}

const getMediaTypeId = (description: unknown): MediaTypeId | null => {
  if (typeof description !== 'string') return null

  const normalizedDescription = description.trim().toLocaleLowerCase('pt-BR')

  if (normalizedDescription === 'imagem') return MEDIA_TYPES.GALLERY
  if (normalizedDescription === 'planta') return MEDIA_TYPES.FLOOR_PLAN
  if (normalizedDescription === 'vídeo' || normalizedDescription === 'video') return MEDIA_TYPES.VIDEO

  return null
}

const toMediaTypeDto = (rawType: RawMediaType | null | undefined): MediaTypeDto | null => {
  if (!rawType || typeof rawType.id !== 'number') return null

  const description = typeof rawType.descricao === 'string'
    ? rawType.descricao
    : typeof rawType.description === 'string'
      ? rawType.description
      : null
  if (description === null) return null
  const mediaTypeId = getMediaTypeId(description)
  if (mediaTypeId === null) return null

  return {
    id: mediaTypeId,
    description,
  }
}

const toPropertyMediaDto = (
  rawMedia: RawPropertyMedia,
  mediaType: MediaTypeDto,
): PropertyMediaDto => ({
  id: rawMedia.id,
  advertisementId: rawMedia.fk_empreendimento,
  mediaTypeId: mediaType.id,
  url: rawMedia.url,
  mediaType,
})

export async function getPropertyMediaByAdvertisementId(
  advertisementId: number
): Promise<MediaCollections> {
  try {
    const query = new URLSearchParams({ fk_empreendimento: String(advertisementId) })
    const rawMediaItemsResponse = await apiRequest<unknown>(`${API_ROUTES.propertyMedia.collection}?${query.toString()}`)
    const rawMediaItems = Array.isArray(rawMediaItemsResponse)
      ? rawMediaItemsResponse as RawPropertyMedia[]
      : []
    const rawMediaTypes = await apiRequest<unknown>(API_ROUTES.propertyMedia.types)
    const mediaTypes = Array.isArray(rawMediaTypes) ? rawMediaTypes as RawMediaType[] : []

    const mediaByLegacyTypeId = new Map(
      mediaTypes
        .map((type) => [type.id, toMediaTypeDto(type)] as const)
        .filter(([legacyTypeId, mediaType]) => typeof legacyTypeId === 'number' && mediaType !== null),
    )
    const normalizedMedia = rawMediaItems.flatMap((media) => {
      const mediaType = mediaByLegacyTypeId.get(media.fk_tipo_imagem)
      if (!mediaType) return []

      return [toPropertyMediaDto(media, mediaType)]
    })

    return {
      images: normalizedMedia.filter(({ mediaTypeId }) => mediaTypeId === MEDIA_TYPES.GALLERY),
      plans: normalizedMedia.filter(({ mediaTypeId }) => mediaTypeId === MEDIA_TYPES.FLOOR_PLAN),
      videos: normalizedMedia.filter(({ mediaTypeId }) => mediaTypeId === MEDIA_TYPES.VIDEO),
    }
  } catch (error) {
    console.error('Error fetching advertisement images:', error)
    throw new Error('Falha ao carregar imagens do imóvel')
  }
}

export async function getAllPropertyMedia(): Promise<PropertyMediaDto[]> {
  try {
    const data = await apiRequest<RawPropertyMedia[]>(API_ROUTES.propertyMedia.collection)
    return data.map((media) => ({
      id: media.id,
      advertisementId: media.fk_empreendimento,
      mediaTypeId: MEDIA_TYPES.GALLERY,
      url: media.url,
    }))
  } catch (error) {
    console.error('Error fetching all images:', error)
    throw new Error('Falha ao carregar imagens')
  }
}
