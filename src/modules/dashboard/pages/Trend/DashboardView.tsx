import { Ionicons } from '@expo/vector-icons'
import { ScrollView, StyleSheet, View } from 'react-native'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import { useDashboardViewModel } from './useDashboardViewModel'

export default function DashboardView() {
  const { points, summary } = useDashboardViewModel()
  const maxValue = Math.max(...points.map((point) => point.value))

  return (
    <ScrollView contentContainerStyle={styles.content} style={sharedStyles.screen}>
      <View style={styles.header}>
        <Heading level={1}>Tendência</Heading>
        <Text style={styles.subtitle}>Acompanhe a evolução do interesse no mercado.</Text>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryIcon}>
          <Ionicons name="trending-up" size={24} color={colors.primary} />
        </View>
        <View style={styles.summaryCopy}>
          <Text style={styles.summaryTitle}>{summary.title}</Text>
          <Text style={styles.summaryValue}>{summary.value}</Text>
          <Text style={styles.summaryDescription}>{summary.description}</Text>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Heading level={3} style={styles.cardTitle}>Desempenho mensal</Heading>
        <View accessibilityLabel="Gráfico de tendência mensal" accessibilityRole="image" style={styles.chart}>
          {points.map((point) => (
            <View key={point.label} style={styles.column}>
              <Text style={styles.change}>{point.change}</Text>
              <View style={styles.barTrack}>
                <View style={[styles.bar, { height: `${(point.value / maxValue) * 100}%` }]} />
              </View>
              <Text style={styles.label}>{point.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.insight}>
        <Ionicons name="bulb-outline" size={22} color={colors.primary} />
        <Text style={styles.insightText}>
          O interesse vem crescendo de forma consistente. Use essa tendência para orientar suas próximas oportunidades.
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  header: {
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 15,
    textAlign: 'left',
  },
  summaryCard: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
  },
  summaryIcon: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  summaryCopy: {
    flex: 1,
    gap: 2,
  },
  summaryTitle: {
    fontSize: 14,
    textAlign: 'left',
  },
  summaryValue: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'left',
  },
  summaryDescription: {
    color: colors.mutedText,
    fontSize: 13,
    textAlign: 'left',
  },
  chartCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
  },
  cardTitle: {
    marginBottom: spacing.lg,
    textAlign: 'left',
  },
  chart: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 190,
    justifyContent: 'space-between',
  },
  column: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  change: {
    color: colors.mutedText,
    fontSize: 11,
    marginBottom: spacing.sm,
  },
  barTrack: {
    backgroundColor: colors.background,
    borderRadius: 8,
    height: 125,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    width: 24,
  },
  bar: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    minHeight: 8,
    width: '100%',
  },
  label: {
    color: colors.secondaryLight,
    fontSize: 12,
    marginTop: spacing.sm,
  },
  insight: {
    alignItems: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
  },
})
