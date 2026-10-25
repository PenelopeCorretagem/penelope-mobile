import { API_ROUTES } from '@constant/apiRoutes'
import type { PropertyTypeFilter, SortOrder } from '@properties/pages/Properties/PropertiesModel'
import { apiRequest } from '@shared/infrastructure/apiClient'

export type PropertySearchInterpretationRequest = {
  transcript: string
  cities: string[]
  regions: string[]
  propertyTypes: PropertyTypeFilter[]
}

export type PropertySearchInterpretation = {
  searchTerm: string
  city: string | null
  region: string | null
  type: PropertyTypeFilter
  minBedrooms: number | null
  maxPrice: number | null
  sortOrder: SortOrder
}

export function interpretPropertySearch(request: PropertySearchInterpretationRequest) {
  return apiRequest<PropertySearchInterpretation>(API_ROUTES.propertySearch.interpret, {
    method: 'POST',
    body: request,
  })
}