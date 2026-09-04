import { View, Pressable } from 'react-native'
import { Linking } from 'react-native'
import { colors, spacing } from '@shared/styles/style'
import Text from '@shared/components/ui/Text'
import { ContactIcon } from '@shared/components/ui/ContactIcon'
import { useContactIconListViewModel } from './useContactIconListViewModel'
import type { ContactItem } from '@dtos/Contact'

type ContactIconListViewProps = {
  contacts?: ContactItem[]
  layout?: 'horizontal' | 'vertical'
  iconSize?: 'small' | 'medium' | 'large'
}

export function ContactIconListView({
  contacts,
  layout = 'horizontal',
  iconSize = 'medium',
}: ContactIconListViewProps) {
  const { validation, validContacts } = useContactIconListViewModel({
    contacts,
    layout,
    iconSize,
  })

  const iconSizes = {
    small: 18,
    medium: 24,
    large: 28,
  }

  const containerSizes = {
    small: 44,
    medium: 56,
    large: 64,
  }

  const handlePress = async (href: string) => {
    try {
      const canOpen = await Linking.canOpenURL(href)
      if (canOpen) {
        await Linking.openURL(href)
      }
    } catch (error) {
      console.error('Erro ao abrir link:', error)
    }
  }

  if (!validation.isValid) {
    return (
      <Text style={{ color: colors.error, fontSize: 12 }}>
        {validation.errors.join(', ')}
      </Text>
    )
  }

  return (
    <View
      style={{
        flexDirection: layout === 'horizontal' ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: layout === 'horizontal' ? 'center' : 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      {validContacts.map((contact, index) => (
        <Pressable
          key={contact.id}
          onPress={() => handlePress(contact.href)}
          style={({ pressed }) => [
            {
              width: containerSizes[iconSize],
              height: containerSizes[iconSize],
              borderRadius: containerSizes[iconSize] / 2,
              backgroundColor: pressed ? colors.secondary : colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: layout === 'horizontal' && index < validContacts.length - 1 ? spacing.md : 0,
              marginBottom: layout === 'horizontal' ? 0 : spacing.md,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
          accessible
          accessibilityLabel={contact.label}
          accessibilityHint={`Abrir ${contact.label}`}
        >
          <ContactIcon type={contact.type} size={iconSizes[iconSize]} color={colors.white} />
        </Pressable>
      ))}
    </View>
  )
}
