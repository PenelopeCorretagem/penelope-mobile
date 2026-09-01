import { Ionicons } from '@expo/vector-icons'
import { router, usePathname } from 'expo-router'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { APP_ROUTES, isProfileRoute, isSettingsRoute } from '@constant/routes'
import SearchModalView from '@shared/components/layout/SearchModal/SearchModalView'
import LogoView from '@shared/components/ui/Logo'
import { colors, spacing } from '@shared/styles/style'

export default function HeaderView() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const isProfile = isProfileRoute(pathname)
  const isSettings = isSettingsRoute(pathname)

  if (isSettings) {
    return (
      <View style={styles.container}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={22} color={colors.secondary} />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Configurações</Text>
        </View>
        <View style={styles.actionSpacer} />
      </View>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <LogoView width={110} height={42} color={colors.primary} />

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Abrir pesquisa"
            onPress={() => setIsSearchOpen(true)}
            style={styles.iconButton}
          >
            <Ionicons name="search-outline" size={20} color={colors.secondary} />
          </Pressable>

          {isProfile ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Abrir configurações"
              onPress={() => router.push(APP_ROUTES.configuracoes)}
              style={styles.iconButton}
            >
              <Ionicons name="settings-outline" size={20} color={colors.secondary} />
            </Pressable>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notificações"
            style={styles.notificationButton}
          >
            <Ionicons name="notifications-outline" size={20} color={colors.secondary} />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>
      </View>

      <SearchModalView visible={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomColor: colors.primaryLight,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
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
