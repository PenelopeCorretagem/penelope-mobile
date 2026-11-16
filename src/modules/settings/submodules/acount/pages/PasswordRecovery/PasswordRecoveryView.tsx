import { useRef, useState } from 'react'
import { router } from 'expo-router'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native'
import Form, { type FormField } from '@shared/components/forms/Form'
import Section from '@shared/components/layout/Section'
import Text from '@shared/components/ui/Text'
import { colors } from '@shared/styles/style'
import { APP_ROUTES } from '@shared/constants/routes'
import { useTranslation } from 'react-i18next'

export default function PasswordRecoveryView() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)
  const scrollToFocusedField = () => {
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 250)
  }

  const field: FormField = {
    key: 'email',
    label: t('auth.email'),
    placeholder: t('settings.passwordRecovery.emailPlaceholder'),
    value: email,
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    inputBackgroundColor: colors.primaryLight,
    onChangeText: (value) => {
      setEmail(value)
      setIsSubmitted(false)
    },
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
      <ScrollView ref={scrollViewRef} automaticallyAdjustKeyboardInsets contentContainerStyle={[styles.content]} keyboardShouldPersistTaps="handled">
        <Section>
          <Text style={styles.title}>{t('auth.recoverPassword')}</Text>
          <Text style={styles.subtitle}>{t('auth.recoverSubtitle')}</Text>
          <Form
            fields={[field]}
            submitText={t('auth.sendInstructions')}
            isSubmitting={false}
            onSubmit={() => {
              setIsSubmitted(true)
              router.replace(APP_ROUTES.configuracoes)
            }}
            onFieldFocus={scrollToFocusedField}
            statusMessage={isSubmitted ? t('settings.passwordRecovery.success') : undefined}
          />
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
