import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useScrollToTop } from 'expo-router'
import { useRef } from 'react'
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '@shared/context/AuthContext'
import { APP_ROUTES } from '@shared/constants/routes'
import SettingsOption from '../../components/SettingsOption'
import { getProfileInitials } from '@settings/submodules/acount/pages/Account/ProfileModel'
import { useProfileViewModel } from '@settings/submodules/acount/pages/Account/useProfileViewModel'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import { useTranslation } from 'react-i18next'
import i18n from '../../../../../i18n'

export default function SettingsView() {
  const scrollRef = useRef<ScrollView>(null)
  useScrollToTop(scrollRef)
  const { deleteAccount, logout } = useAuth()
  const { profile, isLoading, error } = useProfileViewModel()
  const { t } = useTranslation()
  const options = {
    profile: { title: t('settings.profile'), description: t('settings.profileDescription'), icon: 'person-circle-outline' as const, href: APP_ROUTES.conta },
    password: { title: t('settings.changePassword'), description: t('settings.changePasswordDescription'), icon: 'lock-closed-outline' as const, href: APP_ROUTES.senha },
    contact: { title: t('settings.contact'), description: t('settings.contactDescription'), icon: 'mail-outline' as const, href: APP_ROUTES.contato },
    about: { title: t('settings.about'), description: t('settings.aboutDescription'), icon: 'information-circle-outline' as const, href: APP_ROUTES.sobre },
    logout: { title: t('settings.logout'), description: t('settings.logoutDescription'), href: APP_ROUTES.root, icon: 'log-out-outline' as const },
  }

  return (
    <ScrollView ref={scrollRef} style={sharedStyles.screen} contentContainerStyle={styles.content}>
      <Pressable style={styles.userHeader} onPress={() => router.push(APP_ROUTES.conta)} accessibilityRole="button">
        <View style={styles.avatar}>
          {profile.profileImage ? <Image source={{ uri: profile.profileImage }} style={styles.avatarImage} /> : <Text style={styles.avatarText}>{getProfileInitials(profile.name)}</Text>}
        </View>
        <View style={styles.userCopy}>
          <Text style={styles.greeting}>{t('settings.hello')}</Text>
          <Text style={styles.userName}>{isLoading ? t('common.loading') : profile.name}</Text>
          {error ? <Text style={styles.errorText}>{t(error, { defaultValue: error })}</Text> : null}
        </View>
        <Ionicons name="create-outline" size={22} color={colors.primary} />
      </Pressable>

      <SettingsSection title={t('settings.account')}>
        <SettingsOption {...options.profile} />
        <SettingsOption {...options.password} />
        <SettingsOption
          title={t('settings.deleteAccount')}
          description={t('settings.deleteDescription')}
          icon="trash-outline"
          tone="danger"
          onPress={() => {
            Alert.alert(
              t('settings.deleteAccount'),
              t('settings.deleteWarning'),
              [
                { text: t('common.cancel'), style: 'cancel' },
                {
                  text: t('settings.deleteAccount'),
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

      <SettingsSection title={t('settings.application')}>
        <SettingsOption {...options.contact} />
        <SettingsOption {...options.about} />
        <SettingsOption
          title={t('settings.language')}
          description={`${t('settings.languageDescription')}: ${i18n.language.startsWith('pt') ? t('settings.portuguese') : t('settings.english')}`}
          icon="language-outline"
          onPress={() => i18n.changeLanguage(i18n.language.startsWith('pt') ? 'en' : 'pt')}
        />
        <SettingsOption
          {...options.logout}
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
    overflow: 'hidden',
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
