import { PropsWithChildren } from 'react'
import { View, ViewProps } from 'react-native'
import { spacing } from '@shared/styles/style'

export default function SectionView({ children, style, ...props }: PropsWithChildren<ViewProps>) {
  return (
    <View {...props} style={[{ paddingRight: spacing.lg, paddingLeft: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xl, display:'flex', alignItems: 'center', justifyContent: 'center' }, style]}>
      {children}
    </View>
  )
}
