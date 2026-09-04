import { PropertiesFilters, SortOrder } from '@properties/pages/Properties/PropertiesModel'

export const defaultFilters: PropertiesFilters = {
  searchTerm: '',
  city: null,
  region: null,
  type: 'TODOS',
  sortOrder: 'none',
}

export const sortOptions: Array<{ label: string; value: SortOrder }> = [
  { label: 'Sem ordenação', value: 'none' },
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
})

export const getFiltersFromRouteParams = (routeParams: {
  city?: string | string[]
  region?: string | string[]
  searchTerm?: string | string[]
  sortOrder?: string | string[]
  type?: string | string[]
}) => {
  const cityValue = normalizeRouteStringValue(routeParams.city)
  const regionValue = normalizeRouteStringValue(routeParams.region)
  const searchTermValue = normalizeRouteStringValue(routeParams.searchTerm)
  const typeValue = normalizeRouteStringValue(routeParams.type)
  const sortOrderValue = normalizeRouteStringValue(routeParams.sortOrder)

  return {
    ...defaultFilters,
    searchTerm: searchTermValue,
    city: cityValue !== '' ? cityValue : null,
    region: regionValue !== '' ? regionValue : null,
    type: typeValue !== '' ? (typeValue as PropertiesFilters['type']) : 'TODOS',
    sortOrder: sortOrderValue !== '' ? (sortOrderValue as PropertiesFilters['sortOrder']) : 'none',
  }
}

export const hasActiveFilters = (filters: PropertiesFilters) => Boolean(
  filters.searchTerm.trim()
    || filters.city
    || filters.region
    || filters.type !== 'TODOS'
    || filters.sortOrder !== 'none',
)
