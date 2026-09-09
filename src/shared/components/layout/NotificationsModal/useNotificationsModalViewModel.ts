import { useCallback, useEffect, useState } from 'react'
import type { UserNotificationItemDto } from '@shared/dtos/notification'
import {
  getUserNotifications,
  markNotificationAsRead,
  softDeleteNotification,
} from '@service-penelopec/notificationService'
import { hasUnreadNotifications } from './NotificationsModalModel'

type NotificationsModalViewModelProps = {
  visible: boolean
  onClose: () => void
  onUnreadCountChange: (count: number) => void
}

export function useNotificationsModalViewModel({ visible, onClose, onUnreadCountChange }: NotificationsModalViewModelProps) {
  const [notifications, setNotifications] = useState<UserNotificationItemDto[]>([])
  const [selectedNotification, setSelectedNotification] = useState<UserNotificationItemDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const publishUnreadCount = useCallback((nextNotifications: UserNotificationItemDto[]) => {
    onUnreadCountChange(nextNotifications.filter((notification) => !notification.readAt).length)
  }, [onUnreadCountChange])

  const loadNotifications = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const nextNotifications = await getUserNotifications()
      setNotifications(nextNotifications)
      publishUnreadCount(nextNotifications)
    } catch (loadError) {
      console.error('Falha ao carregar notificações', loadError)
      setError('Não foi possível carregar as notificações.')
    } finally {
      setIsLoading(false)
    }
  }, [publishUnreadCount])

  useEffect(() => {
    if (visible) void loadNotifications()
  }, [loadNotifications, visible])

  const handleClose = useCallback(() => {
    setSelectedNotification(null)
    onClose()
  }, [onClose])

  const handleSelectNotification = useCallback(async (notification: UserNotificationItemDto) => {
    setSelectedNotification(notification)

    if (notification.readAt) return

    setIsUpdating(true)
    try {
      await markNotificationAsRead(notification.userNotificationId)
      const nextNotifications = notifications.map((currentNotification) => (
        currentNotification.userNotificationId === notification.userNotificationId
          ? { ...currentNotification, readAt: new Date().toISOString() }
          : currentNotification
      ))
      setNotifications(nextNotifications)
      setSelectedNotification((currentNotification) => currentNotification
        ? { ...currentNotification, readAt: new Date().toISOString() }
        : currentNotification)
      publishUnreadCount(nextNotifications)
    } catch (updateError) {
      console.error('Falha ao marcar notificação como lida', updateError)
      setError('Não foi possível marcar a notificação como lida.')
    } finally {
      setIsUpdating(false)
    }
  }, [notifications, publishUnreadCount])

  const handleDeleteNotification = useCallback(async () => {
    if (!selectedNotification) return

    setIsUpdating(true)
    try {
      await softDeleteNotification(selectedNotification.userNotificationId)
      const nextNotifications = notifications.filter((notification) => notification.userNotificationId !== selectedNotification.userNotificationId)
      setNotifications(nextNotifications)
      setSelectedNotification(null)
      publishUnreadCount(nextNotifications)
    } catch (updateError) {
      console.error('Falha ao excluir notificação', updateError)
      setError('Não foi possível excluir a notificação.')
    } finally {
      setIsUpdating(false)
    }
  }, [notifications, publishUnreadCount, selectedNotification])

  return {
    error,
    handleClose,
    handleDeleteNotification,
    handleSelectNotification,
    hasUnread: hasUnreadNotifications(notifications),
    isLoading,
    isUpdating,
    notifications,
    selectedNotification,
    setSelectedNotification,
  }
}