import { Stack } from 'expo-router'
import HeaderView from '@shared/components/layout/Header'
import { FavoritesProvider } from '@shared/context/FavoritesContext'
import { AuthProvider } from '@shared/context/AuthContext'
import { StyleSheet, View } from 'react-native'
import { colors } from '@shared/styles/style'

export default function RootLayout() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <View style={styles.container}>
          <Stack screenOptions={{ headerShown: false }} />
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