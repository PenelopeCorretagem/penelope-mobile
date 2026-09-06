import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import LogoView from '@shared/components/ui/Logo'
import { colors, spacing } from '@shared/styles/style'

type LoadingViewProps = {
  message?: string
}

export default function LoadingView() {
  return (
    <View style={styles.container}>
      <LogoView color={colors.background} height={72} width={172} />
      <ActivityIndicator color={colors.background} size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    gap: spacing.lg,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  message: {
    color: colors.text,
    fontSize: 16,
  },
})
