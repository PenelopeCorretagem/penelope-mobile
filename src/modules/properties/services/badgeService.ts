import type { EstateBadges } from '@properties/types/badge'
import { authenticatedApiRequest } from '@shared/infrastructure/apiClient'
import { API_ROUTES } from '@constant/apiRoutes'
import { getMockEstateBadges } from '../../../../mocks/badgeMock'

export async function getEstateBadges(estateId: number): Promise<EstateBadges> {
  if (process.env.EXPO_PUBLIC_MOCK_BADGES === 'true') {
    return getMockEstateBadges(estateId)
  }

  return authenticatedApiRequest<EstateBadges>(API_ROUTES.estates.badges(estateId))
}
