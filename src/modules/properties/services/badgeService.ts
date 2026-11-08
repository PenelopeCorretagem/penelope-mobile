import type { EstateBadges } from '@properties/types/badge'
import { authenticatedApiRequest } from '@shared/infrastructure/apiClient'
import { API_ROUTES } from '@constant/apiRoutes'

export async function getEstateBadges(estateId: number): Promise<EstateBadges> {
  return authenticatedApiRequest<EstateBadges>(API_ROUTES.estates.badges(estateId))
}
