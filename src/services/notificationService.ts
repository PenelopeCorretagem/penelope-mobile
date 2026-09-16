import type { UserNotificationItemDto } from '@shared/dtos/notification'
import { authenticatedApiRequest } from '@shared/infrastructure/apiClient'

export async function getUserNotifications(): Promise<UserNotificationItemDto[]> {
  const notifications = await authenticatedApiRequest<UserNotificationItemDto[]>('/v1/users/me/notifications')

  return notifications
    .sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime())
}

export async function markNotificationAsRead(userNotificationId: number): Promise<void> {
  await authenticatedApiRequest(`/v1/users/me/notifications/${userNotificationId}/read`, { method: 'PATCH' })
}

export async function softDeleteNotification(userNotificationId: number): Promise<void> {
  await authenticatedApiRequest(`/v1/users/me/notifications/${userNotificationId}`, { method: 'DELETE' })
}

export async function getUnreadNotificationCount(): Promise<number> {
  const notifications = await getUserNotifications()
  return notifications.filter((notification) => !notification.readAt).length
}