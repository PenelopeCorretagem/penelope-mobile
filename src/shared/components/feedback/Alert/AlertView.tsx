import { Text, View } from 'react-native'
import { colors, spacing } from '@shared/styles/style'

export default function AlertView({ message }: { message: string }) {
  return (
    <View style={{ backgroundColor: '#fde8e8', borderRadius: 6, padding: spacing.lg }}>
      <Text style={{ color: colors.error, fontSize: 15, lineHeight: 22 }}>{message}</Text>
    </View>
  )
}
