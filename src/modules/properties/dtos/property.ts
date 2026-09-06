import {
  isPropertyType as isValidPropertyType,
  type PropertyType,
} from '@constant/propertyTypes'
import type { AddressDto } from './address'
import type { AmenityDto } from './amenity'
import type { PropertyMediaDto } from './media'

export type PropertyDto = {
  id: number
  title: string
  description: string
  area: number
  bedrooms: number
  type: PropertyType
  addressId: number
  showHealth: boolean
  showSecurity: boolean
  showEducation: boolean
  address?: AddressDto
  media?: PropertyMediaDto[]
  amenities?: AmenityDto[]
}

export function isPropertyType(value: unknown): value is PropertyType {
  return isValidPropertyType(value)
}