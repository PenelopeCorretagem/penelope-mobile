import { Ionicons } from '@expo/vector-icons'
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { colors, spacing } from '@shared/styles/style'

export type AlertVariant = 'error' | 'success' | 'info'



type AlertViewProps = {
  message: string
  variant?: AlertVariant
  loading?: boolean
  presentation?: 'inline' | 'modal'
}

export default function AlertView({
  message,
  variant = 'error',
  loading = false,
  presentation = 'inline',
}: AlertViewProps) {
  const [dismissedMessage, setDismissedMessage] = useState<string | null>(null)
  const [dismissibleMessage, setDismissibleMessage] = useState<string | null>(null)
  const isVisible = dismissedMessage !== message
  const canDismiss = presentation !== 'modal' || dismissibleMessage === message
  const iconName = variant === 'success'
    ? 'checkmark-circle-outline'
    : variant === 'info'
      ? 'information-circle-outline'
      : 'alert-circle-outline'
  const palette = variant === 'success'
    ? { accent: '#2f8f4e', backgroundColor: '#e8f5e9', textColor: '#276738' }
    : variant === 'info'
      ? { accent: colors.primary, backgroundColor: '#f7edf4', textColor: colors.primary }
      : { accent: colors.error, backgroundColor: '#fde8e8', textColor: colors.error }

  useEffect(() => {
    setDismissedMessage(null)

    if (presentation !== 'modal') return

    setDismissibleMessage(message)

  }, [message, presentation])

  const dismiss = () => {
    if (!loading && canDismiss) setDismissedMessage(message)
  }

  if (presentation === 'modal') {
    return (
      <Modal
        animationType="fade"
        onRequestClose={dismiss}
        statusBarTranslucent
        transparent
        visible={isVisible}
      >
        <View style={styles.modalRoot}>
          <Pressable
            accessibilityLabel="Fechar aviso"
            accessibilityRole="button"
            disabled={loading || !canDismiss}
            onPress={dismiss}
            style={StyleSheet.absoluteFill}
          />
          <View
            accessibilityRole="alert"
            accessibilityViewIsModal
            style={styles.modalCard}
          >
            <View style={[styles.modalAccent, { backgroundColor: palette.accent }]} />
            <View style={styles.modalHeader}>
              <View style={[styles.iconBadge, { backgroundColor: palette.backgroundColor }]}>
                <Ionicons color={palette.accent} name={iconName} size={28} />
              </View>
              <Pressable
                accessibilityLabel="Fechar aviso"
                accessibilityRole="button"
                disabled={loading || !canDismiss}
                onPress={dismiss}
                style={({ pressed }) => [
                  styles.iconCloseButton,
                  pressed && canDismiss && styles.closeButtonPressed,
                ]}
              >
                <Ionicons color={colors.secondaryLight} name="close" size={20} />
              </Pressable>
            </View>
            <Text style={styles.modalEyebrow}>INFORMAÇÃO IMPORTANTE</Text>
            <Text style={styles.modalTitle}>Sobre esta análise</Text>
            <Text style={styles.modalMessage}>{message}</Text>
            {loading ? (
              <ActivityIndicator color={colors.primary} size="small" />
            ) : (
              <Pressable
                accessibilityState={{ disabled: !canDismiss }}
                accessibilityRole="button"
                disabled={!canDismiss}
                onPress={dismiss}
                style={({ pressed }) => [
                  styles.closeButton,
                  !canDismiss && styles.closeButtonDisabled,
                  pressed && canDismiss && styles.closeButtonPressed,
                ]}
              >
                <Text style={styles.closeButtonText}>Entendi</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <View accessibilityRole="alert" style={[styles.container, { backgroundColor: palette.backgroundColor }]}>
      {loading ? <ActivityIndicator color={colors.primary} size="small" /> : null}
      <Text style={[styles.message, { color: palette.textColor }]}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  modalRoot: {
    alignItems: 'center',
    backgroundColor: 'rgba(54, 34, 29, 0.42)',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 22,
    boxShadow: '0px 8px 20px rgba(54, 34, 29, 0.18)',
    elevation: 8,
    maxWidth: 420,
    overflow: 'hidden',
    padding: spacing.lg,
    paddingTop: spacing.md,
    shadowColor: '#36221d',
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    width: '100%',
  },
  modalAccent: {
    alignSelf: 'stretch',
    height: 4,
    marginBottom: spacing.md,
  },
  modalHeader: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconBadge: {
    alignItems: 'center',
    borderRadius: 18,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  iconCloseButton: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  modalEyebrow: {
    alignSelf: 'stretch',
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: spacing.md,
  },
  modalTitle: {
    alignSelf: 'stretch',
    color: colors.text,
    fontSize: 21,
    fontWeight: '700',
    marginTop: 4,
  },
  modalMessage: {
    alignSelf: 'stretch',
    color: colors.secondaryLight,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.xl,
    width: '100%',
  },
  closeButtonDisabled: { opacity: 0.6 },
  closeButtonPressed: { opacity: 0.82 },
  closeButtonText: { color: colors.white, fontSize: 14, fontWeight: '700' },
  container: {
    alignItems: 'center',
    borderRadius: 6,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
  },
  message: { flex: 1, fontSize: 15, lineHeight: 22 },
})
