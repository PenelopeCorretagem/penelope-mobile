export const MEDIA_TYPES = {
  COVER: 1,
  GALLERY: 2,
  FLOOR_PLAN: 3,
  VIDEO: 4,
} as const

export type MediaTypeId = (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES]

export function isMediaTypeId(value: unknown): value is MediaTypeId {
  return Object.values(MEDIA_TYPES).some((mediaType) => mediaType === value)
}