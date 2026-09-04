import { EstateTypeKey } from '@constant/estateTypes'
import { Advertisement } from '@dtos/Advertisement'
export { toAdvertisementList } from '@shared/utils/advertisementNormalizer'

export type PropertyTypeFilter = 'TODOS' | EstateTypeKey
export type SortOrder = 'none' | 'asc' | 'desc'

export type PropertiesFilters = {
  searchTerm: string
  city: string | null
  region: string | null
  type: PropertyTypeFilter
  sortOrder: SortOrder
}

export type PropertyGroups = {
  launch: Advertisement[]
  available: Advertisement[]
  underConstruction: Advertisement[]
}

export const initialPropertiesFilters: PropertiesFilters = {
  searchTerm: '',
  city: null,
  region: null,
  type: 'TODOS',
  sortOrder: 'none',
}

const normalizeText = (value: unknown) => String(value ?? '').trim().toLocaleLowerCase('pt-BR')

const includesSearchTerm = (advertisement: Advertisement, searchTerm: string) => {
  const term = normalizeText(searchTerm)
  if (!term) return true

  const { estate } = advertisement
  const fields = [
    estate.title,
    estate.subtitle,
    estate.description,
    estate.type.key,
    estate.type.friendlyName,
    estate.address?.city,
    estate.address?.region,
    estate.address?.uf,
    ...(estate.amenities ?? []).map((amenity) => amenity.description),
  ]

  return fields.some((field) => normalizeText(field).includes(term))
}

const matchesLocationFilters = (advertisement: Advertisement, filters: PropertiesFilters) => (
  (!filters.city || advertisement.estate.address?.city === filters.city)
  && (!filters.region || advertisement.estate.address?.region === filters.region)
)

const sortAdvertisements = (advertisements: Advertisement[], sortOrder: SortOrder) => {
  if (sortOrder === 'none') return advertisements

  const direction = sortOrder === 'asc' ? 1 : -1
  return [...advertisements].sort((left, right) => (
    (left.estate.title ?? '').localeCompare(right.estate.title ?? '', 'pt-BR') * direction
  ))
}

export const filterAdvertisements = (advertisements: Advertisement[], filters: PropertiesFilters) => (
  sortAdvertisements(
    advertisements.filter((advertisement) => (
      includesSearchTerm(advertisement, filters.searchTerm)
      && matchesLocationFilters(advertisement, filters)
    )),
    filters.sortOrder,
  )
)

export const getFilteredGroups = (groups: PropertyGroups, filters: PropertiesFilters): PropertyGroups => {
  const filteredGroups = {
    launch: filterAdvertisements(groups.launch, filters),
    available: filterAdvertisements(groups.available, filters),
    underConstruction: filterAdvertisements(groups.underConstruction, filters),
  }

  if (filters.type === 'TODOS') return filteredGroups

  return {
    launch: filters.type === 'LANCAMENTO' ? filteredGroups.launch : [],
    available: filters.type === 'DISPONIVEL' ? filteredGroups.available : [],
    underConstruction: filters.type === 'EM_OBRAS' ? filteredGroups.underConstruction : [],
  }
}

export const getTotalResults = (groups: PropertyGroups) => (
  groups.launch.length + groups.available.length + groups.underConstruction.length
)

const getUniqueValues = (values: Array<string | undefined>) => (
  [...new Set(values.filter((value): value is string => Boolean(value)))].sort((left, right) => (
    left.localeCompare(right, 'pt-BR')
  ))
)

export const getAvailableCities = (groups: PropertyGroups) => (
  getUniqueValues(Object.values(groups).flatMap((advertisements) => (
    advertisements.map((advertisement) => advertisement.estate.address?.city)
  )))
)

export const getAvailableRegions = (groups: PropertyGroups) => (
  getUniqueValues(Object.values(groups).flatMap((advertisements) => (
    advertisements.map((advertisement) => advertisement.estate.address?.region)
  )))
)

export const getCoverImageUrl = (advertisement: Advertisement) => (
  getAdvertisementImageUrls(advertisement)[0] ?? null
)

export const getAdvertisementImageUrls = (advertisement: Advertisement) => {
  const images = advertisement.estate.images ?? []
  const coverImages = images.filter((image) => image.type?.id === 1)
  const otherImages = images.filter((image) => image.type?.id !== 1)

  return [...coverImages, ...otherImages]
    .map((image) => image.url)
    .filter((url): url is string => Boolean(url))
}

export const filterFavoriteGroups = (groups: PropertyGroups, favoriteIds: number[]): PropertyGroups => {
  const favoriteIdSet = new Set(favoriteIds)

  return {
    launch: groups.launch.filter((advertisement) => favoriteIdSet.has(advertisement.id)),
    available: groups.available.filter((advertisement) => favoriteIdSet.has(advertisement.id)),
    underConstruction: groups.underConstruction.filter((advertisement) => favoriteIdSet.has(advertisement.id)),
  }
}