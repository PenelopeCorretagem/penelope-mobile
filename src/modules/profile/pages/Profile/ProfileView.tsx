import { ScrollView, StyleSheet, View } from 'react-native'
import Section from '@shared/components/layout/Section'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'

export default function ProfileView() {
  return (
    <ScrollView style={sharedStyles.screen}>
      <Section style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MS</Text>
        </View>
        <Heading level={1} style={styles.title}>Maria da Silva</Heading>
        <Text style={styles.email}>maria@penelope.com.br</Text>
      </Section>

      <Section style={styles.accountSection}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Telefone</Text>
          <Text style={styles.value}>(11) 99999-0000</Text>
        </View>
      </Section>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 48,
    height: 96,
    justifyContent: 'center',
    marginBottom: spacing.md,
    width: 96,
  },
  avatarText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
  },
  title: {
    color: colors.primary,
  },
  email: {
    color: colors.mutedText,
    marginTop: spacing.sm,
  },
  accountSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  infoRow: {
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 1,
    padding: spacing.md,
  },
  label: {
    color: colors.mutedText,
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
})
