import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '@shared/context/AuthContext'
import { APP_ROUTES } from '@constant/routes'
import SettingsOption from '@profile/submodules/settings/components/SettingsOption'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import Section from '@shared/components/layout/Section'

const options = [
  {
    title: 'Ajustar conta',
    description: 'Dados pessoais e preferências da conta.',
    icon: 'person-circle-outline' as const,
    href: APP_ROUTES.conta,
  },
  {
    title: 'Trocar senha',
    description: 'Mantenha sua conta protegida.',
    icon: 'lock-closed-outline' as const,
    href: APP_ROUTES.senha,
  },
  {
    title: 'Entre em contato',
    description: 'Fale conosco e veja nossos canais.',
    icon: 'mail-outline' as const,
    href: APP_ROUTES.contato,
  },
  {
    title: 'Sobre o aplicativo',
    description: 'Conheça a Penélope Imóveis.',
    icon: 'information-circle-outline' as const,
    href: APP_ROUTES.sobre,
  },
  {
    title: 'Sair',
    description: 'Voltar para a tela de login.',
    href: APP_ROUTES.auth.login,
    icon: 'log-out-outline' as const,
  },
]

export default function SettingsView() {
  const { logout } = useAuth()

  return (
    <ScrollView style={sharedStyles.screen}>
      <Section>
        <Text style={styles.subtitle}>Conta e aplicativo</Text>
        <View style={styles.list}>
          {options.map((option) => (
            <SettingsOption
              {...option}
              key={option.title}
              onPress={option.title === 'Sair'
                ? () => {
                  logout()
                  router.replace(`/${APP_ROUTES.root}`)
                }
                : undefined}
            />
          ))}
        </View>
      </Section>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    color: colors.mutedText,
    fontSize: 14,
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.sm,
  },
})
