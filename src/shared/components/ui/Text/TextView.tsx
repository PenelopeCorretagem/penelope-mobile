import { PropsWithChildren } from 'react'
import { Text, TextProps } from 'react-native'
import { colors } from '@shared/styles/style'

export default function TextView({ children, style, ...props }: PropsWithChildren<TextProps>) {
  return (
    <Text {...props} style={[{ color: colors.text, fontSize: 16, lineHeight: 24 }, style]}>
      {children}
    </Text>
  )
}
