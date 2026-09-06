export type AmenityDto = {
  id: number
  description: string
  iconName?: string | null
}

export type PropertyAmenityDto = {
  propertyId: number
  amenityId: number
  amenity?: AmenityDto
}
