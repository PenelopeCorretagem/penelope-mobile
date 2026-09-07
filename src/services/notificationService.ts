import { Platform } from 'react-native'
import type { NotificationDto, UserNotificationDto, UserNotificationItemDto } from '@shared/dtos/notification'

const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL
  ?? (Platform.OS === 'web' ? 'http://localhost:3001' : 'http://192.168.18.45:3001')

const defaultUserId = 1

async function assertResponse(response: Response, action: string): Promise<void> {
  if (!response.ok) {
    throw new Error(`Não foi possível ${action}: ${response.status}`)
  }
}

export async function getUserNotifications(userId = defaultUserId): Promise<UserNotificationItemDto[]> {
  const [notificationsResponse, associationsResponse] = await Promise.all([
    fetch(`${apiBaseUrl}/notifications`),
    fetch(`${apiBaseUrl}/userNotifications?userId=${userId}`),
  ])

  await assertResponse(notificationsResponse, 'carregar as notificações')
  await assertResponse(associationsResponse, 'carregar os vínculos de notificações')

  const notifications = await notificationsResponse.json() as NotificationDto[]
  const associations = await associationsResponse.json() as UserNotificationDto[]
  const notificationsById = new Map(notifications.map((notification) => [String(notification.id), notification]))

  return associations
    .filter((association) => association.userId === userId && !association.deletedAt)
    .map((association) => {
      const notification = notificationsById.get(String(association.notificationId))
      if (!notification) return null

      return {
        ...notification,
        userNotificationId: association.id,
        readAt: association.readAt ?? null,
      }
    })
    .filter((notification): notification is UserNotificationItemDto => notification !== null)
    .sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime())
}

export async function markNotificationAsRead(userNotificationId: number): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/userNotifications/${userNotificationId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ readAt: new Date().toISOString() }),
  })
  await assertResponse(response, 'marcar a notificação como lida')
}

export async function softDeleteNotification(userNotificationId: number): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/userNotifications/${userNotificationId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ deletedAt: new Date().toISOString() }),
  })
  await assertResponse(response, 'excluir a notificação')
}

export async function getUnreadNotificationCount(userId = defaultUserId): Promise<number> {
  const notifications = await getUserNotifications(userId)
  return notifications.filter((notification) => !notification.readAt).length
}