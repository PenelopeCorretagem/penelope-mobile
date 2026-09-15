import { Redirect, Stack } from 'expo-router'
import HeaderView from '@shared/components/layout/Header'
import { useAuth } from '@shared/context/AuthContext'
import { APP_ROUTES } from '@shared/constants/routes'
import { StyleSheet, View } from 'react-native'
import { colors } from '@shared/styles/style'

export default function RootLayout() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return null

  if (!isAuthenticated) return <Redirect href={APP_ROUTES.auth.login} />

  return (
    <View style={styles.container}>
      <HeaderView />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})