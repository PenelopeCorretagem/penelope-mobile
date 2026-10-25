import type { UserNotificationItemDto } from '@shared/dtos/notification'
import { authenticatedApiRequest } from '@shared/infrastructure/apiClient'
import { API_ROUTES } from '@constant/apiRoutes'

export async function getUserNotifications(): Promise<UserNotificationItemDto[]> {
  const notifications = await authenticatedApiRequest<UserNotificationItemDto[]>(API_ROUTES.users.notifications)

  return notifications
    .sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime())
}

export async function markNotificationAsRead(userNotificationId: number): Promise<void> {
  await authenticatedApiRequest(API_ROUTES.users.notificationRead(userNotificationId), { method: 'PATCH' })
}

export async function softDeleteNotification(userNotificationId: number): Promise<void> {
  await authenticatedApiRequest(API_ROUTES.users.notificationById(userNotificationId), { method: 'DELETE' })
}

export async function getUnreadNotificationCount(): Promise<number> {
  const notifications = await getUserNotifications()
  return notifications.filter((notification) => !notification.readAt).length
}