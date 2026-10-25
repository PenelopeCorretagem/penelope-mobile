import { Ionicons } from '@expo/vector-icons'
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import { TrendFilter, TrendFilterKey } from './DashboardModel'
import { useDashboardViewModel } from './useDashboardViewModel'

function FilterControl({
  filter,
  value,
  onSelect,
}: {
  filter: TrendFilter
  value: string
  onSelect: (key: TrendFilterKey, value: string) => void
}) {
  const nextOption = filter.options[(filter.options.indexOf(value) + 1) % filter.options.length]

  return (
    <Pressable
      accessibilityHint="Toque para alternar a opção"
      accessibilityLabel={`${filter.label}: ${value}`}
      accessibilityRole="button"
      onPress={() => onSelect(filter.key, nextOption)}
      style={styles.filterControl}
    >
      <Text style={styles.filterLabel}>{filter.label}</Text>
      <View style={styles.filterValueRow}>
        <Text style={styles.filterValue}>{value}</Text>
        <Ionicons name="chevron-down" size={16} color={colors.secondaryLight} />
      </View>
    </Pressable>
  )
}

function PeriodControl({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.periodControl}>
      <Text style={styles.periodLabel}>{label}</Text>
      <View style={styles.periodValueRow}>
        <Text style={styles.periodValue}>{value}</Text>
        <Ionicons name="calendar-outline" size={16} color={colors.primary} />
      </View>
    </View>
  )
}

export default function DashboardView() {
  const { width } = useWindowDimensions()
  const { points, indicators, filters: filterValues, filterDefinitions, clearFilters, selectFilter } = useDashboardViewModel()
  const chartWidth = Math.max(width - spacing.lg * 2 - spacing.md * 2, 260)
  const plotWidth = chartWidth - 34
  const plotHeight = 112
  const maxValue = Math.max(...points.map((point) => point.value))
  const minValue = Math.min(...points.map((point) => point.value)) - 8
  const pointPositions = points.map((point, index) => ({
    x: index * (plotWidth / (points.length - 1)),
    y: plotHeight - ((point.value - minValue) / (maxValue - minValue)) * plotHeight,
  }))

  return (
    <ScrollView contentContainerStyle={styles.content} style={sharedStyles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.introCard}>
        <View style={styles.introIcon}>
          <Ionicons name="analytics-outline" size={24} color={colors.primary} />
        </View>
        <View style={styles.introCopy}>
          <Heading level={3} style={styles.introTitle}>Evolução do preço dos imóveis</Heading>
          <Text style={styles.introMarket}>Mercado de apartamentos · São Paulo (SP)</Text>
          <Text style={styles.introDescription}>Acompanhe a evolução dos preços de transações imobiliárias ao longo do tempo.</Text>
        </View>
      </View>

      <View style={styles.filtersCard}>
        <View style={styles.filtersHeading}>
          <View style={styles.sectionHeading}>
            <Ionicons name="funnel-outline" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Filtros da análise</Text>
          </View>
          <Pressable accessibilityLabel="Limpar filtros" accessibilityRole="button" onPress={clearFilters}>
            <Text style={styles.clearText}>Limpar filtros</Text>
          </Pressable>
        </View>
        <View style={styles.divider} />
        <Text style={styles.filterGroupLabel}>Período de análise</Text>
        <View style={styles.periodRow}>
          <PeriodControl label="DE" value="Jan/2022" />
          <PeriodControl label="ATÉ" value="Ago/2026" />
        </View>
        <Text style={styles.helperText}>Período ilustrativo; a seleção real dependerá dos arquivos históricos disponíveis.</Text>
        <FilterControl filter={filterDefinitions[1]} value={filterValues.neighborhood} onSelect={selectFilter} />
        <FilterControl filter={filterDefinitions[2]} value={filterValues.area} onSelect={selectFilter} />
        <Text style={styles.filterNote}>Os filtros serão aplicados ao gráfico e aos indicadores simultaneamente.</Text>
      </View>

      <View style={styles.indicatorsHeading}>
        <Text style={styles.sectionTitle}>Indicadores do mercado</Text>
        <Text style={styles.updated}>Amostra consolidada</Text>
      </View>
      <View style={styles.indicators}>
        {indicators.map((indicator) => (
          <View key={indicator.title} style={styles.indicatorCard}>
            <View style={[styles.indicatorIcon, indicator.tone === 'green' && styles.greenIcon, indicator.tone === 'neutral' && styles.neutralIcon]}>
              <Ionicons name={indicator.icon} size={16} color={indicator.tone === 'green' ? '#009b68' : colors.primary} />
            </View>
            <Text style={styles.indicatorTitle}>{indicator.title}</Text>
            <Text style={[styles.indicatorValue, indicator.tone === 'green' && styles.greenValue]}>{indicator.value}</Text>
            <Text style={styles.indicatorCaption}>{indicator.caption}</Text>
          </View>
        ))}
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chartHeading}>
          <View>
            <Text style={styles.sectionTitle}>Evolução do preço por m²</Text>
            <Text style={styles.chartSubtitle}>Mediana mensal das transações válidas</Text>
          </View>
          <View style={styles.chartIcon}><Ionicons name="bar-chart-outline" size={18} color={colors.primary} /></View>
        </View>
        <View accessibilityLabel="Gráfico de linha da evolução do preço por metro quadrado" accessibilityRole="image" style={[styles.chart, { height: 178 }]}>
          {[0, 1, 2, 3].map((line) => <View key={line} style={[styles.gridLine, { top: 18 + line * 30 }]} />)}
          <View style={[styles.yLabels, { height: plotHeight }]}>
            <Text style={styles.axisLabel}>R$ 12k</Text><Text style={styles.axisLabel}>R$ 10k</Text><Text style={styles.axisLabel}>R$ 8k</Text>
          </View>
          <View style={[styles.plot, { width: plotWidth, height: plotHeight }]}>
            <View style={styles.areaFill} />
            {pointPositions.map((point, index) => {
              const next = pointPositions[index + 1]
              if (!next) return null
              const segmentLength = Math.hypot(next.x - point.x, next.y - point.y)
              const angle = Math.atan2(next.y - point.y, next.x - point.x)
              return <View key={`segment-${points[index].label}`} style={[styles.lineSegment, { left: point.x, top: point.y, width: segmentLength, transform: [{ rotate: `${angle}rad` }] }]} />
            })}
            {pointPositions.map((point, index) => <View key={points[index].label} style={[styles.point, { left: point.x - 4, top: point.y - 4 }]} />)}
            <View style={[styles.tooltip, { left: Math.max(pointPositions[pointPositions.length - 1].x - 104, 4), top: 2 }]}>
              <Text style={styles.tooltipText}>Ago: R$ 11.450/m²</Text>
            </View>
          </View>
          <View style={[styles.xLabels, { width: plotWidth }]}>
            {points.map((point, index) => <Text key={point.label} style={[styles.axisLabel, index === points.length - 1 && styles.lastAxisLabel]}>{point.label}</Text>)}
          </View>
        </View>
        <View style={styles.legend}><View style={styles.legendDot} /><Text style={styles.legendText}>Preço mediano por m²</Text></View>
        <Text style={styles.chartNote}>Gráfico ilustrativo com base nas transações de cada mês.</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2, gap: spacing.md },
  introCard: { alignItems: 'flex-start', backgroundColor: colors.white, borderRadius: 16, flexDirection: 'row', gap: spacing.md, padding: spacing.md },
  introIcon: { alignItems: 'center', backgroundColor: '#fff0f8', borderRadius: 12, height: 40, justifyContent: 'center', width: 40 },
  introCopy: { flex: 1, gap: 3 },
  introTitle: { fontSize: 18, textAlign: 'left' },
  introMarket: { color: colors.primary, fontSize: 12, fontWeight: '600', textAlign: 'left' },
  introDescription: { color: colors.mutedText, fontSize: 13, lineHeight: 19, textAlign: 'left' },
  filtersCard: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.md },
  filtersHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  sectionHeading: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },
  sectionTitle: { color: colors.text, fontSize: 15, fontWeight: '700', textAlign: 'left' },
  clearText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  divider: { backgroundColor: '#edf0f5', height: 1, marginVertical: spacing.sm },
  filterGroupLabel: { color: colors.secondaryLight, fontSize: 12, fontWeight: '600', marginBottom: spacing.sm, textAlign: 'left' },
  periodRow: { flexDirection: 'row', gap: spacing.sm },
  periodControl: { backgroundColor: '#f7f9fc', borderColor: '#dfe5ee', borderRadius: 12, borderWidth: 1, flex: 1, padding: spacing.sm },
  periodLabel: { color: '#9aa6b8', fontSize: 10, fontWeight: '700', textAlign: 'left' },
  periodValueRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  periodValue: { color: colors.text, fontSize: 13, fontWeight: '700', textAlign: 'left' },
  helperText: { color: '#8a98ab', fontSize: 10, fontStyle: 'italic', lineHeight: 15, marginBottom: spacing.md, marginTop: spacing.sm, textAlign: 'left' },
  filterControl: { backgroundColor: '#f7f9fc', borderColor: '#dfe5ee', borderRadius: 12, borderWidth: 1, marginBottom: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: 10 },
  filterLabel: { color: colors.secondaryLight, fontSize: 11, marginBottom: 4, textAlign: 'left' },
  filterValueRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  filterValue: { color: colors.text, fontSize: 13, textAlign: 'left' },
  filterNote: { color: '#8a98ab', fontSize: 11, lineHeight: 16, marginTop: spacing.sm, textAlign: 'center' },
  indicatorsHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  updated: { color: '#8a98ab', fontSize: 11 },
  indicators: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  indicatorCard: { backgroundColor: colors.white, borderRadius: 14, minHeight: 108, padding: spacing.sm, width: '48%' },
  indicatorIcon: { alignItems: 'center', alignSelf: 'flex-end', backgroundColor: '#fff0f8', borderRadius: 8, height: 28, justifyContent: 'center', width: 28 },
  greenIcon: { backgroundColor: '#e6faf2' },
  neutralIcon: { backgroundColor: '#eef2f7' },
  indicatorTitle: { color: colors.secondaryLight, fontSize: 11, textAlign: 'left' },
  indicatorValue: { color: colors.primary, fontSize: 18, fontWeight: '700', marginTop: 7, textAlign: 'left' },
  greenValue: { color: '#009b68' },
  indicatorCaption: { color: '#8a98ab', fontSize: 10, marginTop: 4, textAlign: 'left' },
  chartCard: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.md },
  chartHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  chartSubtitle: { color: colors.mutedText, fontSize: 12, marginTop: 3, textAlign: 'left' },
  chartIcon: { alignItems: 'center', backgroundColor: '#fff0f8', borderRadius: 8, height: 30, justifyContent: 'center', width: 30 },
  chart: { marginTop: spacing.md, position: 'relative' },
  gridLine: { backgroundColor: '#e7ebf1', height: 1, left: 34, position: 'absolute', right: 0 },
  yLabels: { justifyContent: 'space-between', left: 0, position: 'absolute', top: 12, width: 32 },
  axisLabel: { color: '#9aa6b8', fontSize: 9 },
  lastAxisLabel: { color: colors.primary, fontWeight: '700' },
  plot: { left: 34, overflow: 'hidden', position: 'absolute', top: 14 },
  areaFill: { backgroundColor: '#f6ddec', bottom: 0, left: 0, opacity: 0.72, position: 'absolute', right: 0, top: 42 },
  lineSegment: { backgroundColor: colors.primary, height: 3, position: 'absolute', transformOrigin: 'left center' },
  point: { backgroundColor: colors.white, borderColor: colors.primary, borderRadius: 6, borderWidth: 3, height: 8, position: 'absolute', width: 8 },
  tooltip: { backgroundColor: '#25293a', borderRadius: 5, paddingHorizontal: 8, paddingVertical: 5, position: 'absolute' },
  tooltipText: { color: colors.white, fontSize: 10, fontWeight: '700' },
  xLabels: { bottom: 0, flexDirection: 'row', justifyContent: 'space-between', left: 34, position: 'absolute' },
  legend: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, justifyContent: 'center', marginTop: spacing.sm },
  legendDot: { backgroundColor: colors.primary, borderRadius: 5, height: 10, width: 10 },
  legendText: { color: colors.secondaryLight, fontSize: 11, fontWeight: '600' },
  chartNote: { color: '#9aa6b8', fontSize: 10, marginTop: spacing.md, textAlign: 'center' },
})
