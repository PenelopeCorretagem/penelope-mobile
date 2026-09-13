import type { PropertyDto } from './property'

export type AdvertisementDto = {
  id: number
  propertyId: number
  price: number
  active: boolean
  createdAt: string
  property?: PropertyDto
}