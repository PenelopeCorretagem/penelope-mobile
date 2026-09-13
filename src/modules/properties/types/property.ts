import type { Address } from './address'
import type { Amenity } from './amenity'
import type { PropertyImage } from './property-image'
import type { PropertyType } from './property-type'

export type Property = {
  title?: string
  subtitle?: string
  description?: string
  area?: number | string
  numberOfRooms?: number
  type: PropertyType
  address?: Address
  images?: PropertyImage[]
  amenities?: Amenity[]
  coverImageUrl?: string
}
