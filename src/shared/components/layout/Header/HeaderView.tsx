import { Ionicons } from '@expo/vector-icons'
import { router, usePathname } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { isSettingsRootRoute, isSettingsSubmoduleRoute } from '@constant/routes'
import SearchModalView from '@shared/components/layout/SearchModal'
import NotificationsModalView from '@shared/components/layout/NotificationsModal'
import { getUnreadNotificationCount } from '@service-penelopec/notificationService'
import Logo from '@shared/components/ui/Logo'
import { colors, spacing, styles } from '@shared/styles/style'

export default function HeaderView() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0)
  const isSettingsSubmodule = isSettingsSubmoduleRoute(pathname)

  const refreshUnreadNotificationCount = useCallback(() => {
    void getUnreadNotificationCount()
      .then(setUnreadNotificationCount)
      .catch((error) => console.error('Falha ao carregar contador de notificações', error))
  }, [])

  useEffect(() => {
    refreshUnreadNotificationCount()
  }, [refreshUnreadNotificationCount])

  if (isSettingsSubmodule) {
    return (
      <View style={[headerStyles.container, styles.paddingHeader]}>
        {isSettingsSubmodule ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            onPress={() => router.back()}
            style={headerStyles.iconButton}
          >
            <Ionicons name="arrow-back" size={22} color={colors.secondary} />
          </Pressable>
        ) : <View style={headerStyles.actionSpacer} />}
        <View style={headerStyles.titleContainer}>
          <Text style={headerStyles.title}>Configurações</Text>
        </View>
        <View style={headerStyles.actionSpacer} />
      </View>
    )
  }

  return (
    <>
      <View style={[headerStyles.container, styles.paddingHeader]}>
        <Logo width={110} height={42} color={colors.primary} />

        <View style={headerStyles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Abrir pesquisa"
            onPress={() => setIsSearchOpen(true)}
            style={headerStyles.iconButton}
          >
            <Ionicons name="search-outline" size={20} color={colors.secondary} />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notificações"
            onPress={() => setIsNotificationsOpen(true)}
            style={headerStyles.notificationButton}
          >
            <Ionicons name="notifications-outline" size={20} color={colors.secondary} />
            {unreadNotificationCount > 0 ? <View style={headerStyles.notificationDot} /> : null}
          </Pressable>
        </View>
      </View>

      <SearchModalView visible={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NotificationsModalView
        onClose={() => {
          setIsNotificationsOpen(false)
          refreshUnreadNotificationCount()
        }}
        onUnreadCountChange={setUnreadNotificationCount}
        visible={isNotificationsOpen}
      />
    </>
  )
}

const headerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomColor: colors.primaryLight,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  actionSpacer: {
    minWidth: 38,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: '#f9edf5',
    borderRadius: 999,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  notificationButton: {
    alignItems: 'center',
    backgroundColor: '#f9edf5',
    borderRadius: 999,
    height: 38,
    justifyContent: 'center',
    position: 'relative',
    width: 38,
  },
  notificationDot: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 8,
    position: 'absolute',
    right: 8,
    top: 7,
    width: 8,
  },
})
