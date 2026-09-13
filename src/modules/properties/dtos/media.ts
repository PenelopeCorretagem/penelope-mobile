import { isMediaTypeId, type MediaTypeId } from '@shared/constants/mediaTypes'
import type { MediaTypeDto } from './media-type'

export type PropertyMediaDto = {
  id: number
  propertyId: number
  mediaTypeId: MediaTypeId
  url: string
  mediaType?: MediaTypeDto
}

export function isPropertyMediaDto(value: unknown): value is PropertyMediaDto {
  if (!value || typeof value !== 'object') return false

  const media = value as Partial<PropertyMediaDto>

  return typeof media.id === 'number'
    && typeof media.propertyId === 'number'
    && isMediaTypeId(media.mediaTypeId)
    && typeof media.url === 'string'
}