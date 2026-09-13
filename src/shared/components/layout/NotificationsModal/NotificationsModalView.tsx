import { Ionicons } from '@expo/vector-icons'
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { colors, spacing } from '@shared/styles/style'
import { getNotificationPreview } from './NotificationsModalModel'
import { useNotificationsModalViewModel } from './useNotificationsModalViewModel'

type NotificationsModalViewProps = {
  visible: boolean
  onClose: () => void
  onUnreadCountChange: (count: number) => void
}

export default function NotificationsModalView(props: NotificationsModalViewProps) {
  const viewModel = useNotificationsModalViewModel(props)
  const selectedNotification = viewModel.selectedNotification

  return (
    <>
      <Modal animationType="slide" onRequestClose={viewModel.handleClose} transparent={false} visible={props.visible}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable accessibilityLabel="Fechar notificações" accessibilityRole="button" onPress={viewModel.handleClose} style={styles.iconButton}>
              <Ionicons name="arrow-back" size={24} color={colors.secondary} />
            </Pressable>
            <Text style={styles.title}>Notificações</Text>
            <View style={styles.headerSpacer} />
          </View>

          {viewModel.error ? <Text style={styles.errorText}>{viewModel.error}</Text> : null}
          {viewModel.isLoading ? <Text style={styles.statusText}>Carregando notificações...</Text> : null}
          {!viewModel.isLoading && viewModel.notifications.length === 0 ? <Text style={styles.statusText}>Nenhuma notificação disponível.</Text> : null}

          <ScrollView contentContainerStyle={styles.list}>
            {viewModel.notifications.map((notification) => (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ busy: viewModel.isUpdating }}
                key={notification.userNotificationId}
                onPress={() => void viewModel.handleSelectNotification(notification)}
                style={[styles.notificationItem, !notification.readAt && styles.unreadItem]}
              >
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{notification.title}</Text>
                  {!notification.readAt ? <View style={styles.unreadDot} /> : null}
                </View>
                <Text numberOfLines={2} style={styles.itemPreview}>{getNotificationPreview(notification)}</Text>
                <Text style={styles.itemDate}>{new Date(notification.createdAt).toLocaleDateString('pt-BR')}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Modal>

      <Modal animationType="slide" onRequestClose={() => viewModel.setSelectedNotification(null)} transparent={false} visible={selectedNotification !== null}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable accessibilityLabel="Voltar para notificações" accessibilityRole="button" onPress={() => viewModel.setSelectedNotification(null)} style={styles.iconButton}>
              <Ionicons name="arrow-back" size={24} color={colors.secondary} />
            </Pressable>
            <Text style={styles.title}>Notificação</Text>
            <Pressable accessibilityLabel="Fechar notificações" accessibilityRole="button" onPress={viewModel.handleClose} style={styles.iconButton}>
              <Ionicons name="close" size={24} color={colors.secondary} />
            </Pressable>
          </View>

          {selectedNotification ? (
            <ScrollView contentContainerStyle={styles.detailContent}>
              <Text style={styles.detailTitle}>{selectedNotification.title}</Text>
              <Text style={styles.itemDate}>{new Date(selectedNotification.createdAt).toLocaleDateString('pt-BR')}</Text>
              <Text style={styles.detailMessage}>{selectedNotification.message}</Text>
              <Pressable accessibilityRole="button" disabled={viewModel.isUpdating} onPress={() => void viewModel.handleDeleteNotification()} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={18} color={colors.white} />
                <Text style={styles.deleteButtonText}>Excluir notificação</Text>
              </Pressable>
            </ScrollView>
          ) : null}
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, flex: 1 },
  header: { alignItems: 'center', borderBottomColor: colors.primaryLight, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: spacing.md },
  headerSpacer: { minWidth: 38 },
  iconButton: { alignItems: 'center', justifyContent: 'center', minWidth: 38, minHeight: 38 },
  title: { color: colors.text, fontSize: 18, fontWeight: '700' },
  list: { gap: spacing.sm, padding: spacing.md },
  notificationItem: { borderColor: colors.surface, borderRadius: 10, borderWidth: 1, padding: spacing.md },
  unreadItem: { borderColor: colors.primaryLight, backgroundColor: '#fff8fc' },
  itemHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  itemTitle: { color: colors.text, flex: 1, fontSize: 16, fontWeight: '700' },
  itemPreview: { color: colors.mutedText, fontSize: 14, lineHeight: 20, marginTop: spacing.sm },
  itemDate: { color: colors.mutedText, fontSize: 12, marginTop: spacing.sm },
  unreadDot: { backgroundColor: colors.primary, borderRadius: 999, height: 8, marginLeft: spacing.sm, width: 8 },
  statusText: { color: colors.mutedText, padding: spacing.lg, textAlign: 'center' },
  errorText: { color: colors.error, paddingHorizontal: spacing.md, paddingTop: spacing.md },
  detailContent: { padding: spacing.lg },
  detailTitle: { color: colors.text, fontSize: 24, fontWeight: '700' },
  detailMessage: { color: colors.text, fontSize: 16, lineHeight: 24, marginTop: spacing.lg },
  deleteButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 8, flexDirection: 'row', gap: spacing.sm, justifyContent: 'center', marginTop: spacing.xl, padding: spacing.md },
  deleteButtonText: { color: colors.white, fontSize: 14, fontWeight: '700' },
})