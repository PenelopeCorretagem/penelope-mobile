import { PROPERTY_TYPES } from '@constant/propertyTypes'
import type { PropertiesFilters } from '@properties/pages/Properties/PropertiesModel'
import { apiRequest } from '@shared/infrastructure/apiClient'

type InterpretPropertySearchRequest = {
  transcript: string
  cities: string[]
  regions: string[]
}

export function interpretPropertySearch(
  request: InterpretPropertySearchRequest,
): Promise<PropertiesFilters> {
  return apiRequest<PropertiesFilters>('/v1/property-search/interpret', {
    method: 'POST',
    body: {
      ...request,
      propertyTypes: [
        'TODOS',
        ...Object.values(PROPERTY_TYPES).map(({ domainKey }) => domainKey),
      ],
    },
  })
}
