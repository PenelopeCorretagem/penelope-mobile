export type EstateType = {
  key: string
  friendlyName?: string
}

export type Address = {
  city?: string
  region?: string
  uf?: string
  latitude?: number
  longitude?: number
}

export type EstateImage = {
  url?: string
  type?: {
    id?: number
    description?: string
  }
}

export type Amenity = {
  id?: number
  description?: string
  icon?: string
}

export type Estate = {
  title?: string
  subtitle?: string
  description?: string
  area?: number | string
  numberOfRooms?: number
  type: EstateType
  address?: Address
  images?: EstateImage[]
  amenities?: Amenity[]
  coverImageUrl?: string
}

export type Advertisement = {
  id: number
  active?: boolean
  featured?: boolean
  createdAt?: string
  distanceKm?: number
  estate: Estate
}