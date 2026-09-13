import { PROPERTY_TYPES } from '@constant/propertyTypes'
import type { Advertisement } from '@properties/types/advertisement'
import type { Amenity } from '@properties/types/amenity'
import type { PropertyImage } from '@properties/types/property-image'

export type RawImageType = string | number | {
  id?: number
  description?: string
}

export type RawPropertyType = string | {
  key?: string
  friendlyName?: string
}

export type AdvertisementApiResponse = {
  id?: number
  price?: number | string
  active?: boolean
  featured?: boolean
  createdAt?: string
  estate?: {
    title?: string
    subtitle?: string
    description?: string
    area?: number | string
    numberOfRooms?: number
    type?: RawPropertyType
    address?: { city?: string; region?: string; uf?: string; latitude?: number; longitude?: number }
    images?: Array<{ url?: string; type?: RawImageType }>
    amenities?: Amenity[]
    amenitiesIds?: number[]
  }
}

const normalizeText = (value: unknown) => String(value ?? '').trim().toLocaleLowerCase('pt-BR')

const normalizeImageType = (value: RawImageType | undefined): PropertyImage['type'] => {
  const normalized = normalizeText(
    typeof value === 'object' && value !== null ? value.description ?? value.id : value,
  )

  return normalized === '1' || normalized === 'capa' || normalized === 'cover'
    ? { id: 1, description: 'Capa' }
    : { description: '' }
}

const normalizeAmenities = (propertyData: AdvertisementApiResponse['estate']): Amenity[] => {
  if (propertyData?.amenities) return propertyData.amenities

  return (propertyData?.amenitiesIds ?? []).map((id) => ({
    id,
    description: '',
    icon: '',
  }))
}

const getPropertyType = (rawType: RawPropertyType | undefined) => {
  const key = typeof rawType === 'string' ? rawType : rawType?.key ?? ''
  const config = Object.values(PROPERTY_TYPES).find(({ domainKey }) => domainKey === key)

  return {
    key: config?.domainKey ?? key,
    friendlyName: typeof rawType === 'object' ? rawType?.friendlyName : config?.cardLabel,
  }
}

export const toAdvertisement = (raw: AdvertisementApiResponse): Advertisement => {
  const rawProperty = raw.estate ?? {}

  return {
    id: raw.id ?? 0,
    price: raw.price,
    active: raw.active,
    featured: raw.featured,
    createdAt: raw.createdAt,
    property: {
      title: rawProperty.title,
      subtitle: rawProperty.subtitle,
      description: rawProperty.description,
      area: rawProperty.area,
      numberOfRooms: rawProperty.numberOfRooms,
      type: getPropertyType(rawProperty.type),
      address: rawProperty.address,
      images: (rawProperty.images ?? []).map((image) => ({
        url: image.url,
        type: normalizeImageType(image.type),
      })),
      amenities: normalizeAmenities(rawProperty),
    },
  }
}

export const toAdvertisementList = (response: unknown): Advertisement[] => (
  Array.isArray(response) ? response.map((item) => toAdvertisement(item as AdvertisementApiResponse)) : []
)