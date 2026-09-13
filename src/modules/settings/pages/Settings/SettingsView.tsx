import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '@shared/context/AuthContext'
import { APP_ROUTES } from '@shared/constants/routes'
import SettingsOption from '../../components/SettingsOption'
import { getProfileInitials } from '@settings/submodules/acount/pages/Account/ProfileModel'
import { useProfileViewModel } from '@settings/submodules/acount/pages/Account/useProfileViewModel'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'

const options = [
  {
    title: 'Meu perfil',
    description: 'Edite seus dados pessoais.',
    icon: 'person-circle-outline' as const,
    href: APP_ROUTES.conta,
  },
  {
    title: 'Alterar senha',
    description: 'Mantenha sua conta protegida.',
    icon: 'lock-closed-outline' as const,
    href: APP_ROUTES.senha,
  },
  {
    title: 'Entre em contato',
    description: 'Fale conoscos.',
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
    href: APP_ROUTES.root,
    icon: 'log-out-outline' as const,
  },
]

export default function SettingsView() {
  const { deleteAccount, logout } = useAuth()
  const { profile, isLoading, error } = useProfileViewModel()

  return (
    <ScrollView style={sharedStyles.screen} contentContainerStyle={styles.content}>
      <Pressable style={styles.userHeader} onPress={() => router.push(APP_ROUTES.conta)} accessibilityRole="button">
        <View style={styles.avatar}>
          {profile.profileImage ? <Image source={{ uri: profile.profileImage }} style={styles.avatarImage} /> : <Text style={styles.avatarText}>{getProfileInitials(profile.name)}</Text>}
        </View>
        <View style={styles.userCopy}>
          <Text style={styles.greeting}>Olá</Text>
          <Text style={styles.userName}>{isLoading ? 'Carregando...' : profile.name}</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        <Ionicons name="create-outline" size={22} color={colors.primary} />
      </Pressable>

      <SettingsSection title="Conta">
        <SettingsOption {...options[0]} />
        <SettingsOption {...options[1]} />
        <SettingsOption
          title="Excluir conta"
          description="Remova permanentemente sua conta."
          icon="trash-outline"
          tone="danger"
          onPress={() => {
            Alert.alert(
              'Excluir conta',
              'Essa ação é permanente. Deseja realmente excluir sua conta?',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Excluir conta',
                  style: 'destructive',
                  onPress: () => {
                    deleteAccount()
                    router.replace(`/${APP_ROUTES.root}`)
                  },
                },
              ],
            )
          }}
        />
      </SettingsSection>

      <SettingsSection title="Aplicativo">
        <SettingsOption {...options[2]} />
        <SettingsOption {...options[3]} />
        <SettingsOption
          {...options[4]}
          tone="danger"
          onPress={() => {
            logout()
            router.replace(`/${APP_ROUTES.root}`)
          }}
        />
      </SettingsSection>
    </ScrollView>
  )
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.list}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  userHeader: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomColor: colors.primaryLight,
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: spacing.lg,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    marginRight: spacing.md,
    width: 64,
  },
  avatarText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  avatarImage: { height: '100%', width: '100%' },
  userCopy: {
    flex: 1,
  },
  greeting: {
    color: colors.mutedText,
    fontSize: 13,
  },
  userName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
  },
  errorText: { color: colors.error, fontSize: 12, marginTop: 4 },
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  list: {
    backgroundColor: colors.white,
    borderRadius: 12,
  },
})
