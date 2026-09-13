import { isMediaTypeId, type MediaTypeId } from '@shared/constants/mediaTypes'

export type MediaTypeDto = {
  id: MediaTypeId
  description: string
}

export function isMediaTypeDto(value: unknown): value is MediaTypeDto {
  if (!value || typeof value !== 'object') return false

  const mediaType = value as Partial<MediaTypeDto>

  return isMediaTypeId(mediaType.id) && typeof mediaType.description === 'string'
}