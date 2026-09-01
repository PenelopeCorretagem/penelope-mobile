import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@shared/styles/style';

type SettingsOptionCardProps = {
  title: string;
  description?: string;
  href?: string;
  onPress?: () => void;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function SettingsOptionView({ title, description, href, onPress, icon }: SettingsOptionCardProps) {
  const content = (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={22} color={colors.primary} />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.mutedText} />
    </View>
  );

  if (!href && !onPress) {
    return <View style={styles.wrapper}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress ?? (() => router.push(href as string))}
      style={styles.wrapper}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing.md,
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
});
