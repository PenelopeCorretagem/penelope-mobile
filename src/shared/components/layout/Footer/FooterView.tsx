import { Linking, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { colors, spacing } from '@shared/styles/style'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Penélope Imóveis</Text>
      <View style={styles.links}>
        <Link href="/" style={styles.link}>Início</Link>
        <Link href="/imoveis" style={styles.link}>Imóveis</Link>
        <Link href="/sobre" style={styles.link}>Sobre</Link>
        <Link href="/contato" style={styles.link}>Contato</Link>
      </View>
      <Text style={styles.copyright}>© {year} Penélope. Todos os direitos reservados.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.secondary, paddingHorizontal: spacing.lg, paddingVertical: spacing.xl },
  title: { color: colors.white, fontSize: 18, fontWeight: '700', marginBottom: spacing.md },
  links: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  link: { color: colors.primaryLight, fontSize: 14, paddingVertical: spacing.sm },
  copyright: { color: colors.white, fontSize: 12, marginTop: spacing.lg, opacity: 0.8 },
})
