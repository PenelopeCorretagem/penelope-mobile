import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Link, usePathname } from 'expo-router'
import Logo from '@shared/components/ui/Logo'
import { colors, spacing } from '@shared/styles/style'

const links = [
  { label: 'Início', href: '/' as const },
  { label: 'Imóveis', href: '/imoveis' as const },
  { label: 'Sobre', href: '/sobre' as const },
]

export default function NavMenuView() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <View>
      <View style={styles.bar}>
        <Link href="/" asChild>
          <Pressable accessibilityRole="button"><Logo /></Pressable>
        </Link>
        <Pressable
          accessibilityLabel={isOpen ? 'Fechar menu' : 'Abrir menu'}
          accessibilityRole="button"
          onPress={() => setIsOpen(value => !value)}
          style={styles.menuButton}
        >
          <Text style={styles.menuIcon}>{isOpen ? '×' : '☰'}</Text>
        </Pressable>
      </View>
      {isOpen ? (
        <View style={styles.menu}>
          {links.map(link => (
            <Link key={link.href} href={link.href} asChild>
              <Pressable onPress={() => setIsOpen(false)} style={styles.link}>
                <Text style={[styles.linkText, pathname === link.href && styles.active]}>{link.label}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  bar: { alignItems: 'center', backgroundColor: colors.white, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  menuButton: { alignItems: 'center', height: 44, justifyContent: 'center', width: 44 },
  menuIcon: { color: colors.secondary, fontSize: 28 },
  menu: { backgroundColor: colors.white, borderTopColor: colors.primaryLight, borderTopWidth: 1, paddingBottom: spacing.sm, paddingHorizontal: spacing.lg },
  link: { paddingVertical: spacing.md },
  linkText: { color: colors.text, fontSize: 16, fontWeight: '600' },
  active: { color: colors.primary },
})
