import { ESTATE_TYPES } from '@constant/estateTypes'
import { Advertisement, Amenity, EstateImage } from '@dtos/Advertisement'

export type RawImageType = string | number | {
  id?: number
  description?: string
}

export type RawEstateType = string | {
  key?: string
  friendlyName?: string
}

export type AdvertisementApiResponse = {
  id?: number
  active?: boolean
  featured?: boolean
  createdAt?: string
  estate?: {
    title?: string
    subtitle?: string
    description?: string
    area?: number | string
    numberOfRooms?: number
    type?: RawEstateType
    address?: { city?: string; region?: string; uf?: string }
    images?: Array<{ url?: string; type?: RawImageType }>
    amenities?: Amenity[]
    amenitiesIds?: number[]
  }
}

const normalizeText = (value: unknown) => String(value ?? '').trim().toLocaleLowerCase('pt-BR')

const normalizeImageType = (value: RawImageType | undefined): EstateImage['type'] => {
  const normalized = normalizeText(
    typeof value === 'object' && value !== null ? value.description ?? value.id : value,
  )

  return normalized === '1' || normalized === 'capa' || normalized === 'cover'
    ? { id: 1, description: 'Capa' }
    : { description: '' }
}

const normalizeAmenities = (estate: AdvertisementApiResponse['estate']): Amenity[] => {
  if (estate?.amenities) return estate.amenities

  return (estate?.amenitiesIds ?? []).map((id) => ({
    id,
    description: '',
    icon: '',
  }))
}

const getEstateType = (rawType: RawEstateType | undefined) => {
  const key = typeof rawType === 'string' ? rawType : rawType?.key ?? ''
  const config = Object.values(ESTATE_TYPES).find(({ domainKey }) => domainKey === key)

  return {
    key: config?.domainKey ?? key,
    friendlyName: typeof rawType === 'object' ? rawType?.friendlyName : config?.cardLabel,
  }
}

export const toAdvertisement = (raw: AdvertisementApiResponse): Advertisement => {
  const estate = raw.estate ?? {}

  return {
    id: raw.id ?? 0,
    active: raw.active,
    featured: raw.featured,
    createdAt: raw.createdAt,
    estate: {
      title: estate.title,
      subtitle: estate.subtitle,
      description: estate.description,
      area: estate.area,
      numberOfRooms: estate.numberOfRooms,
      type: getEstateType(estate.type),
      address: estate.address,
      images: (estate.images ?? []).map((image) => ({
        url: image.url,
        type: normalizeImageType(image.type),
      })),
      amenities: normalizeAmenities(estate),
    },
  }
}

export const toAdvertisementList = (response: unknown): Advertisement[] => (
  Array.isArray(response) ? response.map((item) => toAdvertisement(item as AdvertisementApiResponse)) : []
)