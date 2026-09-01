import { Stack, usePathname } from 'expo-router'
import { isAuthRoute, isEntryRoute, isSettingsRoute } from '@constant/routes'
import TabNavigator from '@shared/components/layout/TabNavigator'
import HeaderView from '@shared/components/layout/Header'
import { FavoritesProvider } from '@shared/context/FavoritesContext'
import { AuthProvider } from '@shared/context/AuthContext'
import { StyleSheet, View } from 'react-native'
import { colors } from '@shared/styles/style'

export default function RootLayout() {
  const pathname = usePathname()
  const isSettings = isSettingsRoute(pathname)
  const isAuth = isAuthRoute(pathname)
  const isEntry = isEntryRoute(pathname)

  return (
    <AuthProvider>
      <FavoritesProvider>
        <View style={styles.container}>
          {!isAuth && !isEntry ? <HeaderView /> : null}
          <Stack screenOptions={{ headerShown: false }} />
          {!isSettings && !isAuth && !isEntry ? <TabNavigator /> : null}
        </View>
      </FavoritesProvider>
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})