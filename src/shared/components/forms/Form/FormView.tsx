import { router } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native'
import Button from '@shared/components/ui/Button'
import Text from '@shared/components/ui/Text'
import { colors, spacing } from '@shared/styles/style'

export type FormField = {
  key: string
  label: string
  placeholder: string
  value: string
  type?: 'text' | 'date'
  secureTextEntry?: boolean
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  keyboardType?: 'default' | 'email-address'
  inputBackgroundColor?: string
  error?: string
  onChangeText: (value: string) => void
}

type FormProps = {
  fields: FormField[]
  submitText: string
  isSubmitting: boolean
  onSubmit: () => void
  onNext?: () => void
  onBack?: () => void
  isLastStep?: boolean
  helperLabel?: string
  helperHref?: string
  helperActionLabel?: string
  secondaryPrompt?: string
  secondaryActionLabel?: string
  secondaryActionHref?: string
  statusMessage?: string
}

export default function FormView({
  fields,
  submitText,
  isSubmitting,
  onSubmit,
  onNext,
  onBack,
  isLastStep = true,
  helperLabel,
  helperHref = '/login',
  helperActionLabel,
  secondaryPrompt,
  secondaryActionLabel,
  secondaryActionHref,
  statusMessage,
}: FormProps) {
  const [activeDateField, setActiveDateField] = useState<string | null>(null)
  const slideX = useRef(new Animated.Value(0)).current
  const fieldKeys = fields.map((field) => field.key).join('|')

  useEffect(() => {
    slideX.setValue(Dimensions.get('window').width)
    Animated.timing(slideX, { toValue: 0, duration: 280, useNativeDriver: Platform.OS !== 'web' }).start()
  }, [fieldKeys, slideX])

  const handleDateValueChange = (field: FormField, selectedDate?: Date) => {
    if (!selectedDate) return
    if (Platform.OS !== 'ios') setActiveDateField(null)
    const day = String(selectedDate.getDate()).padStart(2, '0')
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    field.onChangeText(`${day}/${month}/${selectedDate.getFullYear()}`)
  }

  return (
    <Animated.View style={[styles.form, { transform: [{ translateX: slideX }] }]}>
      {fields.map((field) => (
        <View key={field.key} style={styles.fieldGroup}>
          <Text style={styles.label}>{field.label}</Text>
          {field.type === 'date' ? (
            <>
              <Pressable
                accessibilityRole="button"
                onPress={() => setActiveDateField(field.key)}
                style={[styles.input, { backgroundColor: field.inputBackgroundColor ?? colors.surface }, field.error ? styles.inputError : null]}
              >
                <Text style={field.value ? styles.inputText : styles.placeholderText}>
                  {field.value || field.placeholder}
                </Text>
              </Pressable>
              {activeDateField === field.key ? (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  maximumDate={new Date()}
                  onValueChange={(_, selectedDate) => handleDateValueChange(field, selectedDate)}
                  onDismiss={() => setActiveDateField(null)}
                />
              ) : null}
            </>
          ) : (
            <TextInput
              value={field.value}
              placeholder={field.placeholder}
              placeholderTextColor={colors.mutedText}
              secureTextEntry={field.secureTextEntry}
              autoCapitalize={field.autoCapitalize ?? 'none'}
              keyboardType={field.keyboardType ?? 'default'}
              onChangeText={field.onChangeText}
              style={[styles.input, { backgroundColor: field.inputBackgroundColor ?? colors.surface }, field.error ? styles.inputError : null]}
            />
          )}
          {field.error ? <Text style={styles.errorText}>{field.error}</Text> : null}
        </View>
      ))}

      <View style={styles.actionsRow}>
        {onBack ? <Button onPress={onBack} 
        label="Voltar"
        style={styles.backButton}/>
         : null}
        <Button
          onPress={isLastStep ? onSubmit : onNext}
          disabled={isSubmitting}
          label={isSubmitting ? 'Enviando...' : isLastStep ? submitText : 'Continuar'}
          style={[styles.primaryButton, !isLastStep && styles.primaryButtonWithBack, isSubmitting && styles.primaryButtonDisabled]}
        />
      </View>

      {statusMessage ? <Text style={styles.statusText}>{statusMessage}</Text> : null}
      {helperLabel && helperActionLabel ? <LinkRow label={helperLabel} actionLabel={helperActionLabel} href={helperHref} /> : null}
      {secondaryPrompt && secondaryActionLabel && secondaryActionHref ? <LinkRow label={secondaryPrompt} actionLabel={secondaryActionLabel} href={secondaryActionHref} /> : null}
    </Animated.View>
  )
}

function LinkRow({ label, actionLabel, href }: { label: string; actionLabel: string; href: string }) {
  return (
    <View style={styles.inlineLinkRow}>
      <Text style={styles.inlineText}>{label}</Text>
      <Pressable onPress={() => router.push(href)}><Text style={styles.linkText}>{actionLabel}</Text></Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  form: { width: '100%' },
  fieldGroup: { marginBottom: spacing.md, width: '100%' },
  label: { color: colors.text, fontSize: 14, fontWeight: '600', marginBottom: spacing.sm, textAlign: 'left' },
  input: { backgroundColor: colors.surface, borderColor: '#e3dfe0', borderRadius: 12, borderWidth: 1, color: colors.text, fontSize: 16, paddingHorizontal: spacing.md, paddingVertical: spacing.md, width: '100%',  textAlign: 'left' },
  inputText: { color: colors.text, fontSize: 16, textAlign: 'left' },
  placeholderText: { color: colors.mutedText, fontSize: 16,  textAlign: 'left' },
  inputError: { backgroundColor: '#fff5f5', borderColor: colors.error },
  errorText: { color: colors.error, fontSize: 12, marginTop: 6 },
  actionsRow: { alignItems: 'stretch', flexDirection: 'row', gap: spacing.md },
  primaryButton: { backgroundColor: colors.primary, borderRadius: 12, flex: 1, marginTop: spacing.md, paddingVertical: spacing.md },
  primaryButtonWithBack: { flex: 1 },
  primaryButtonDisabled: { opacity: 0.7 },
  backButton: { borderRadius: 12, flex: 1, marginTop: spacing.md, paddingVertical: spacing.md },
  statusText: { color: colors.primary, fontSize: 14, marginTop: spacing.md, textAlign: 'center' },
  inlineLinkRow: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'center', marginTop: spacing.md, width: '100%' },
  inlineText: { color: colors.secondary, fontSize: 14 },
  linkText: { color: colors.primary, fontSize: 14, fontWeight: '700', width: '100%' },
})