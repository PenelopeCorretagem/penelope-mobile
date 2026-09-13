import type { Property } from './property'

export type Advertisement = {
  id: number
  price?: number | string
  active?: boolean
  featured?: boolean
  createdAt?: string
  distanceKm?: number
  property: Property
}
