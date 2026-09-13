import type { UserNotificationItemDto } from '@shared/dtos/notification'

export const getNotificationPreview = (notification: UserNotificationItemDto) => notification.message

export const hasUnreadNotifications = (notifications: UserNotificationItemDto[]) => notifications.some((notification) => !notification.readAt)