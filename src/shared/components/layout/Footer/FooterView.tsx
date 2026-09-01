import { Pressable, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { colors, spacing } from '@shared/styles/style'

export default function Footer() {
  const year = new Date().getFullYear()

  const links = [
    { label: 'Início', href: '/' },
    { label: 'Imóveis', href: '/imoveis' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Penélope Imóveis</Text>
      <View style={styles.links}>
        {links.map((link) => (
          <Pressable key={link.href} onPress={() => router.push(link.href)} style={styles.linkButton}>
            <Text style={styles.link}>{link.label}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.copyright}>© {year} Penélope. Todos os direitos reservados.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.secondary, paddingHorizontal: spacing.lg, paddingVertical: spacing.xl },
  title: { color: colors.white, fontSize: 18, fontWeight: '700', marginBottom: spacing.md },
  links: { flexDirection: 'row', flexWrap: 'wrap' },
  linkButton: { marginRight: spacing.md },
  link: { color: colors.primaryLight, fontSize: 14, paddingVertical: spacing.sm },
  copyright: { color: colors.white, fontSize: 12, marginTop: spacing.lg, opacity: 0.8 },
})
