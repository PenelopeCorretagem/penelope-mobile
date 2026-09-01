import { StyleSheet, Text } from 'react-native'
import Section from '@shared/components/layout/Section'
import { colors } from '@shared/styles/style'

export default function PasswordView() {
  return (
    <Section style={styles.container}>
      <Text style={styles.title}>Trocar senha</Text>
      <Text style={styles.description}>A atualização de senha estará disponível em breve.</Text>
    </Section>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  title: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    color: colors.mutedText,
    fontSize: 15,
  },
})
