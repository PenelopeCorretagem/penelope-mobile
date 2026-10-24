import { PropertiesFilters, SortOrder } from '@properties/pages/Properties/PropertiesModel'

export type SearchHistoryEntry = Pick<PropertiesFilters, 'searchTerm' | 'city' | 'region' | 'type' | 'sortOrder' | 'minBedrooms' | 'maxPrice'>

export const SEARCH_HISTORY_LIMIT = 5
export const SEARCH_HISTORY_STORAGE_KEY = '@penelope/search-history'

export const defaultFilters: PropertiesFilters = {
  searchTerm: '',
  city: null,
  region: null,
  type: 'TODOS',
  sortOrder: 'distance',
  minBedrooms: null,
  maxPrice: null,
}

export const sortOptions: Array<{ label: string; value: SortOrder }> = [
  { label: 'Mais próximos', value: 'distance' },
  { label: 'A a Z', value: 'asc' },
  { label: 'Z a A', value: 'desc' },
]

export const normalizeRouteStringValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) return value[0] ?? ''

  return value ?? ''
}

export const toQueryParams = (filters: PropertiesFilters) => ({
  searchTerm: filters.searchTerm.trim(),
  city: filters.city ?? '',
  region: filters.region ?? '',
  type: filters.type,
  sortOrder: filters.sortOrder,
  minBedrooms: filters.minBedrooms?.toString() ?? '',
  maxPrice: filters.maxPrice?.toString() ?? '',
})

export const getFiltersFromRouteParams = (routeParams: {
  city?: string | string[]
  region?: string | string[]
  searchTerm?: string | string[]
  sortOrder?: string | string[]
  type?: string | string[]
  minBedrooms?: string | string[]
  maxPrice?: string | string[]
}) => {
  const cityValue = normalizeRouteStringValue(routeParams.city)
  const regionValue = normalizeRouteStringValue(routeParams.region)
  const searchTermValue = normalizeRouteStringValue(routeParams.searchTerm)
  const typeValue = normalizeRouteStringValue(routeParams.type)
  const sortOrderValue = normalizeRouteStringValue(routeParams.sortOrder)
  const minBedroomsValue = Number(normalizeRouteStringValue(routeParams.minBedrooms))
  const maxPriceValue = Number(normalizeRouteStringValue(routeParams.maxPrice))

  return {
    ...defaultFilters,
    searchTerm: searchTermValue,
    city: cityValue !== '' ? cityValue : null,
    region: regionValue !== '' ? regionValue : null,
    type: typeValue !== '' ? (typeValue as PropertiesFilters['type']) : 'TODOS',
    sortOrder: sortOrderValue !== '' ? (sortOrderValue as PropertiesFilters['sortOrder']) : 'distance',
    minBedrooms: Number.isInteger(minBedroomsValue) && minBedroomsValue > 0 ? minBedroomsValue : null,
    maxPrice: Number.isFinite(maxPriceValue) && maxPriceValue > 0 ? maxPriceValue : null,
  }
}

export const hasActiveFilters = (filters: PropertiesFilters) => Boolean(
  filters.searchTerm.trim()
    || filters.city
    || filters.region
    || filters.type !== 'TODOS'
    || filters.sortOrder !== 'distance'
    || filters.minBedrooms !== null
    || filters.maxPrice !== null,
)

export const getSearchHistoryLabel = (entry: SearchHistoryEntry) => {
  if (entry.searchTerm.trim()) return entry.searchTerm.trim()
  if (entry.city) return entry.city
  if (entry.region) return entry.region
  if (entry.minBedrooms !== null) return `${entry.minBedrooms}+ dormitórios`
  if (entry.maxPrice !== null) {
    return `Até ${entry.maxPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
  }
  return entry.type !== 'TODOS' ? entry.type : 'Pesquisa com filtros'
}
