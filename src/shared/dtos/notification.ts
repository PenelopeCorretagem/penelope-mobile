export type NotificationDto = {
  id: number
  title: string
  message: string
  createdAt: string
}

export type UserNotificationDto = {
  id: number
  userId: number
  notificationId: number
  readAt?: string | null
  deletedAt?: string | null
}

export type UserNotificationItemDto = NotificationDto & {
  userNotificationId: number
  readAt: string | null
}