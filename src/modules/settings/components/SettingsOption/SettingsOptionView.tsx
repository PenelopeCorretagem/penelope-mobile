import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors, spacing } from '@shared/styles/style'

type SettingsOptionProps = {
  title: string;
  description?: string;
  href?: string;
  onPress?: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  tone?: 'default' | 'danger';
};

export default function SettingsOptionView({ title, description, href, onPress, icon, tone = 'default' }: SettingsOptionProps) {
  const content = (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={22} color={colors.primary} />
      </View>
      <View style={styles.textBox}>
        <Text style={[styles.title, tone === 'danger' && styles.dangerText]}>{title}</Text>
        {description ? <Text style={[styles.description, tone === 'danger' && styles.dangerText]}>{description}</Text> : null}
      </View>
      {href || onPress ? <Ionicons name="chevron-forward" size={18} color={colors.mutedText} /> : null}
    </View>
  )

  if (!href && !onPress) {
    return <View style={styles.wrapper}>{content}</View>
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress ?? (() => router.push(href as string))}
      style={styles.wrapper}
    >
      {content}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: colors.primaryLight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing.md,
    width: '100%',
  },
  iconBox: {
    alignItems: 'center',
    backgroundColor: '#f9edf5',
    borderRadius: 10,
    height: 42,
    justifyContent: 'center',
    marginRight: spacing.md,
    width: 42,
  },
  textBox: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    color: colors.mutedText,
    fontSize: 12,
    marginTop: 2,
  },
  dangerText: {
    color: colors.primary,
  },
})
