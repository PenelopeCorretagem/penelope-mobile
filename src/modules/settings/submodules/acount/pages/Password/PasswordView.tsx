import { useRef, useState } from 'react'
import { router } from 'expo-router'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native'
import Form, { type FormField } from '@shared/components/forms/Form'
import Section from '@shared/components/layout/Section'
import Text from '@shared/components/ui/Text'
import { APP_ROUTES } from '@shared/constants/routes'
import { colors } from '@shared/styles/style'
import { useTranslation } from 'react-i18next'

export default function PasswordView() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const scrollViewRef = useRef<ScrollView>(null)

  const updateField = (field: keyof typeof form, value: string) => {
    setError(null)
    setSuccessMessage(null)
    setForm((current) => ({ ...current, [field]: value }))
  }

  const scrollToFocusedField = () => {
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 250)
  }

  const handleSavePassword = async () => {
    if (!form.oldPassword.trim()) {
      setError(t('settings.passwordErrors.currentRequired'))
      return
    }
    if (form.newPassword.length < 6) {
      setError(t('settings.passwordErrors.minimumLength'))
      return
    }
    if (form.newPassword !== form.confirmPassword) {
      setError(t('settings.passwordErrors.mismatch'))
      return
    }

    setIsSaving(true)
    setError(null)
    setSuccessMessage(t('settings.passwordSuccess'))
    await new Promise<void>((resolve) => setTimeout(resolve, 1500))
    router.replace(APP_ROUTES.configuracoes)
  }

  const fields: FormField[] = [
    {
      key: 'oldPassword',
      label: t('settings.oldPassword'),
      placeholder: t('settings.oldPasswordPlaceholder'),
      value: form.oldPassword,
      secureTextEntry: true,
      inputBackgroundColor: colors.primaryLight,
      onChangeText: (value) => updateField('oldPassword', value),
    },
    {
      key: 'newPassword',
      label: t('settings.newPassword'),
      placeholder: t('settings.newPasswordPlaceholder'),
      value: form.newPassword,
      secureTextEntry: true,
      inputBackgroundColor: colors.primaryLight,
      onChangeText: (value) => updateField('newPassword', value),
    },
    {
      key: 'confirmPassword',
      label: t('settings.confirmNewPassword'),
      placeholder: t('settings.confirmNewPasswordPlaceholder'),
      value: form.confirmPassword,
      secureTextEntry: true,
      inputBackgroundColor: colors.primaryLight,
      onChangeText: (value) => updateField('confirmPassword', value),
    },
  ]

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
      <ScrollView ref={scrollViewRef} automaticallyAdjustKeyboardInsets contentContainerStyle={[styles.content]} keyboardShouldPersistTaps="handled">
        <Section>
          <Text style={styles.title}>{t('settings.passwordTitle')}</Text>
          <Text style={styles.subtitle}>{t('settings.passwordSubtitle')}</Text>
          <Form fields={fields} submitText={t('settings.savePassword')} submittingText={t('settings.savingPassword')} isSubmitting={isSaving} onSubmit={() => void handleSavePassword()} onFieldFocus={scrollToFocusedField} statusMessage={error ?? successMessage ?? undefined} statusVariant={error ? 'error' : 'success'} helperLabel={t('auth.forgotPassword')} helperActionLabel={t('auth.recoverPassword')} helperHref={`/${APP_ROUTES.recuperacao_senha}`} />
        </Section>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, height: '100%' },
  content: { flexGrow: 1 },
  title: { color: colors.text, fontSize: 32, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: colors.mutedText, fontSize: 16, marginBottom: 24 },
})
