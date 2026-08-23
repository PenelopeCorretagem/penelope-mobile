import { PropsWithChildren } from 'react'
import { View, ViewProps } from 'react-native'
import { spacing } from '@shared/styles/style'

export default function SectionView({ children, style, ...props }: PropsWithChildren<ViewProps>) {
  return (
    <View {...props} style={[{ paddingHorizontal: spacing.lg, paddingVertical: spacing.xl }, style]}>
      {children}
    </View>
  )
}
