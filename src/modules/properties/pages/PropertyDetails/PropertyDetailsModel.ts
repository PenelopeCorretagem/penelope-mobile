import type { Advertisement } from '@properties/types/advertisement'
import { getAdvertisementImageUrls } from '../Properties/PropertiesModel'

export const getRouteId = (value: string | string[] | undefined) => {
  const routeValue = Array.isArray(value) ? value[0] : value
  const id = Number(routeValue)

  return Number.isInteger(id) && id > 0 ? id : null
}

export const formatPrice = (price: Advertisement['price']) => {
  if (price === undefined || price === null || price === '') return null

  if (typeof price === 'number') {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return price
}

export const getLocationLabel = (advertisement: Advertisement) => {
  const { city, region, uf } = advertisement.property.address ?? {}

  return [city, region, uf].filter(Boolean).join(' - ') || 'Localização não informada'
}

export const getDetailsPresentation = (advertisement: Advertisement) => {
  const { property } = advertisement
  const imageUrls = getAdvertisementImageUrls(advertisement)

  return {
    imageUrls,
    imageUrl: imageUrls[0],
    typeLabel: property.type?.friendlyName ?? property.type?.key ?? 'Tipo não informado',
    dormitoriesLabel:
      property.numberOfRooms !== undefined
        ? `${property.numberOfRooms} DORMITÓRIO${property.numberOfRooms !== 1 ? 'S' : ''}`
        : '',
    firstThreeAmenities: (property.amenities ?? []).slice(0, 3),
    hasCoordinates: Boolean(property.address?.latitude && property.address?.longitude),
  }
}

export const getGoogleMapsUrl = (advertisement: Advertisement) => {
  const { latitude, longitude } = advertisement.property.address ?? {}

  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
}

export const getStaticMapUrl = (advertisement: Advertisement) => {
  const { latitude, longitude } = advertisement.property.address ?? {}

  return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=400x300&markers=color:red%7C${latitude},${longitude}&key=AIzaSyBa3G7kH2d_VY1xLB_A1zX7qK4J5mQ2pR8`
}