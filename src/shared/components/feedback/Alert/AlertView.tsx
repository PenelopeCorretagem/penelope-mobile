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
          <View accessibilityRole="alert" style={styles.modalCard}>
            <View style={styles.iconBadge}>
              <Ionicons color={colors.primary} name={iconName} size={30} />
            </View>
            <Text style={styles.modalTitle}>Aviso</Text>
            <Text style={styles.modalMessage}>{message}</Text>
            {loading ? (
              <ActivityIndicator color={colors.primary} size="small" />
            ) : variant === 'error' ? (
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
            ) : null}
          </View>
        </View>
      </Modal>
    )
  }

  const palette = variant === 'success'
    ? { backgroundColor: '#e8f5e9', textColor: '#276738' }
    : variant === 'info'
      ? { backgroundColor: '#f7edf4', textColor: colors.primary }
      : { backgroundColor: '#fde8e8', textColor: colors.error }

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
    borderRadius: 12,
    boxShadow: '0px 8px 20px rgba(54, 34, 29, 0.18)',
    maxWidth: 420,
    padding: spacing.lg,
    width: '100%',
  },
  iconBadge: {
    alignItems: 'center',
    backgroundColor: '#f7edf4',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    marginBottom: spacing.md,
    width: 56,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  modalMessage: {
    color: colors.secondaryLight,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.lg,
    textAlign: 'center',
    width: '100%',
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 120,
    paddingHorizontal: spacing.lg,
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
