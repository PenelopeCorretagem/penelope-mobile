import { Advertisement } from '@dtos/Advertisement'

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
  const { city, region, uf } = advertisement.estate.address ?? {}

  return [city, region, uf].filter(Boolean).join(' - ') || 'Localização não informada'
}