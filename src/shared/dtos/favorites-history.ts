import type { AdvertisementDto } from '../../modules/properties/dtos/advertisement'
import type { UserSummaryDto } from './user'

export type FavoriteUserDto = {
  userId: number
  advertisementId: number
  user?: UserSummaryDto
  advertisement?: AdvertisementDto
}

export type FavoritesHistoryDto = FavoriteUserDto
