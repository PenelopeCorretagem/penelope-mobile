import { PropsWithChildren } from 'react'
import { Text, TextProps } from 'react-native'
import { colors } from '@shared/styles/style'

type HeadingProps = PropsWithChildren<TextProps> & { level?: 1 | 2 | 3 | 4 }

export default function HeadingView({ children, level = 2, style, ...props }: HeadingProps) {
  const sizes = { 1: 32, 2: 24, 3: 20, 4: 18 }
  return (
    <Text {...props} accessibilityRole="header" style={[{ color: colors.text, fontSize: sizes[level], fontWeight: '700', textAlign: 'center' }, style]}>
      {children}
    </Text>
  )
}
