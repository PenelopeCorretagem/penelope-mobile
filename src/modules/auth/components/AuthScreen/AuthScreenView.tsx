import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native'
import Section from '@shared/components/layout/Section'
import Form, { type FormField } from '@shared/components/forms/Form'
import Logo from '@shared/components/ui/Logo'
import Text from '@shared/components/ui/Text'
import { colors, spacing } from '@shared/styles/style'

export type AuthInputField = FormField

type AuthScreenProps = {
  title: string
  subtitle: string
  fields: AuthInputField[]
  submitText: string
  isSubmitting: boolean
  onSubmit: () => void
  onNext?: () => void
  onBack?: () => void
  isLastStep?: boolean
  step?: number
  totalSteps?: number
  helperLabel?: string
  helperHref?: string
  helperActionLabel?: string
  secondaryPrompt?: string
  secondaryActionLabel?: string
  secondaryActionHref?: string
  statusMessage?: string
}

export default function AuthScreenView({
  title,
  subtitle,
  fields,
  submitText,
  isSubmitting,
  onSubmit,
  onNext,
  onBack,
  isLastStep = true,
  step,
  totalSteps,
  helperLabel,
  helperHref,
  helperActionLabel,
  secondaryPrompt,
  secondaryActionLabel,
  secondaryActionHref,
  statusMessage,
}: AuthScreenProps) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Section style={styles.formPanel}>
          <Logo width={160} height={62} color={colors.primary} style={styles.logo} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {step && totalSteps ? <Text style={styles.stepIndicator}>Etapa {step} de {totalSteps}</Text> : null}
          <Form
            fields={fields}
            submitText={submitText}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            onNext={onNext}
            onBack={onBack}
            isLastStep={isLastStep}
            helperLabel={helperLabel}
            helperHref={helperHref}
            helperActionLabel={helperActionLabel}
            secondaryPrompt={secondaryPrompt}
            secondaryActionLabel={secondaryActionLabel}
            secondaryActionHref={secondaryActionHref}
            statusMessage={statusMessage}
          />
        </Section>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1, width: '100%' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', width: '100%' },
  formPanel: { backgroundColor: colors.white, flex: 1, width: '100%' },
  logo: { marginBottom: spacing.xl },
  title: { color: colors.text, fontSize: 32, fontWeight: '700', marginBottom: spacing.sm },
  subtitle: { color: colors.mutedText, fontSize: 16, marginBottom: spacing.xl },
  stepIndicator: { color: colors.primary, fontSize: 13, fontWeight: '700', marginBottom: spacing.md },
})
