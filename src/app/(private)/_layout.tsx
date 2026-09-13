import { Stack } from 'expo-router'
import HeaderView from '@shared/components/layout/Header'
import { StyleSheet, View } from 'react-native'
import { colors } from '@shared/styles/style'

export default function RootLayout() {
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