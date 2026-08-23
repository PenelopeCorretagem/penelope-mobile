import { PropsWithChildren } from 'react'
import { Pressable, PressableProps, PressableStateCallbackType, Text } from 'react-native'
import { colors, spacing } from '@shared/styles/style'

type ButtonProps = PropsWithChildren<PressableProps> & { label?: string }

export default function ButtonView({ children, label, style, ...props }: ButtonProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      style={(state: PressableStateCallbackType) => [
        { alignSelf: 'flex-start', backgroundColor: colors.secondary, borderRadius: 6, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      <Text style={{ color: colors.white, fontSize: 14, fontWeight: '700' }}>{label || children}</Text>
    </Pressable>
  )
}
