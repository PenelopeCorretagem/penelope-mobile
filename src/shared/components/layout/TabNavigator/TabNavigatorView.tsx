import { Ionicons } from '@expo/vector-icons'
import { router, usePathname } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { APP_ROUTES, isAppRouteActive } from '@constant/routes'
import { colors, spacing } from '@shared/styles/style'

const links = [
  { label: 'Home', href: APP_ROUTES.home, icon: 'home' as const },
  { label: 'Imóveis', href: APP_ROUTES.imoveis, icon: 'search' as const },
  { label: 'Dashboard', href: APP_ROUTES.dashboard, icon: 'bar-chart-outline' as const },
  { label: 'Favoritos', href: APP_ROUTES.favoritos, icon: 'heart' as const },
  { label: 'Perfil', href: APP_ROUTES.perfil, icon: 'person' as const },
]

export default function TabNavigatorView() {
  const pathname = usePathname()

  return (
    <View style={styles.tabBar}>
      {links.map((link) => {
        const isActive = isAppRouteActive(pathname, link.href)

        return (
          <Pressable
            key={link.href}
            accessibilityRole="button"
            accessibilityLabel={link.label}
            onPress={() => router.push(link.href)}
            style={[styles.tabItem, isActive && styles.tabItemActive]}
          >
            <Ionicons
              name={link.icon}
              size={22}
              color={isActive ? colors.primary : colors.secondaryLight}
            />
            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.tabLabelActive : styles.tabLabelInactive,
              ]}
            >
              {link.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 12,
  },
  tabItemActive: {
    backgroundColor: '#f9edf5',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  tabLabelActive: {
    color: colors.primary,
  },
  tabLabelInactive: {
    color: colors.secondaryLight,
  },
})
