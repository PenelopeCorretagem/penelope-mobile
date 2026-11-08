import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native'
import AlertView from '@shared/components/feedback/Alert'
import Text from '@shared/components/ui/Text'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import TrendFilterControl from '../../components/TrendFilterControl'
import { useTrendAnalysisViewModel } from './useTrendAnalysisViewModel'

export default function TrendAnalysisView() {
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [alertKey, setAlertKey] = useState(0)
  const { width } = useWindowDimensions()
  const {
    points,
    indicators,
    marketAnalysis,
    filters: filterValues,
    filterDefinitions,
    expandedFilter,
    clearFilters,
    toggleFilter,
    selectFilter,
  } = useTrendAnalysisViewModel()

  useFocusEffect(
    useCallback(() => {
      setAlertKey((current) => current + 1)
    }, []),
  )

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
    <>
      <AlertView
        key={alertKey}
        message="As análises preditivas de IA são estimativas baseadas na amostra disponível e podem apresentar imprecisões. Use-as como apoio à sua análise."
        presentation="modal"
        variant="info"
      />
      <ScrollView contentContainerStyle={styles.content} style={sharedStyles.screen} showsVerticalScrollIndicator={false}>
        <View style={styles.marketSection}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Tendências de mercado</Text>
          <Pressable
            accessibilityLabel={filtersExpanded ? 'Fechar filtros' : 'Abrir filtros'}
            accessibilityRole="button"
            accessibilityState={{ expanded: filtersExpanded }}
            onPress={() => setFiltersExpanded((current) => !current)}
            style={styles.filterButton}
          >
            <Ionicons name="funnel-outline" size={18} color={colors.primary} />
          </Pressable>
        </View>
        <View style={styles.contextHeader}>
          <View style={styles.contextCopy}>
            <Text style={styles.eyebrow}>VISÃO DE MERCADO</Text>
            <Text style={styles.contextText}>Apartamentos em São Paulo · {filterValues.period}</Text>
          </View>
        </View>
        {filtersExpanded && (
          <View style={styles.filtersOverlay}>
            <View style={styles.filtersHeading}>
              <View style={styles.sectionHeading}><Ionicons name="funnel-outline" size={18} color={colors.primary} /><Text style={styles.sectionTitle}>Filtros da análise</Text></View>
              <Pressable accessibilityLabel="Limpar filtros" accessibilityRole="button" onPress={clearFilters}><Text style={styles.clearText}>Limpar filtros</Text></Pressable>
            </View>
            <View style={styles.divider} />
            <TrendFilterControl expanded={expandedFilter === 'neighborhood'} filter={filterDefinitions[1]} value={filterValues.neighborhood} onSelect={selectFilter} onToggle={toggleFilter} />
            <TrendFilterControl expanded={expandedFilter === 'area'} filter={filterDefinitions[2]} value={filterValues.area} onSelect={selectFilter} onToggle={toggleFilter} />
            <Text style={styles.filterNote}>Os filtros serão aplicados ao gráfico e aos indicadores simultaneamente.</Text>
          </View>
        )}
        <View style={styles.indicators}>
          {indicators.map((indicator, index) => (
            <View
              key={indicator.title}
              style={[styles.indicatorCard, index === 0 && styles.readingCard]}
            >
              <View style={styles.indicatorHeader}>
                <Text style={styles.indicatorTitle}>{indicator.title}</Text>
                <View style={[styles.iconBadge, indicator.tone === 'green' && styles.greenIcon]}>
                  <Ionicons name={indicator.icon} size={16} color={indicator.tone === 'green' ? '#009b68' : colors.primary} />
                </View>
              </View>
              <Text style={[styles.indicatorValue, indicator.tone === 'green' && styles.greenValue]}>
                {indicator.value}
              </Text>
              <Text style={styles.indicatorCaption}>{indicator.caption}</Text>
            </View>
          ))}
        </View>
        <View accessible accessibilityLabel={`Análise da IA. ${marketAnalysis}`} accessibilityRole="summary" style={styles.analysisCard}>
          <View style={styles.analysisHeading}>
            <Ionicons name="sparkles-outline" size={20} color={colors.primary} />
            <Text style={styles.analysisTitle}>Análise da IA</Text>
          </View>
          <Text style={styles.analysisText}>{marketAnalysis}</Text>
        </View>
        <View style={styles.chartCard}>
          <View style={styles.chartHeading}>
            <View>
              <Text style={styles.sectionTitle}>Evolução do preço por m²</Text>
              <Text style={styles.chartSubtitle}>Mediana anual das transações válidas</Text>
            </View>
            <View style={styles.chartIcon}>
              <Ionicons name="bar-chart-outline" size={18} color={colors.primary} />
            </View>
          </View>
          <View
            accessibilityLabel="Gráfico de linha da evolução do preço por metro quadrado"
            accessibilityRole="image"
            style={[styles.chart, { height: 178 }]}
          >
            {[0, 1, 2, 3].map((line) => (
              <View key={line} style={[styles.gridLine, { top: 18 + line * 30 }]} />
            ))}
            <View style={[styles.yLabels, { height: plotHeight }]}>
              <Text style={styles.axisLabel}>R$ 12k</Text>
              <Text style={styles.axisLabel}>R$ 10k</Text>
              <Text style={styles.axisLabel}>R$ 8k</Text>
            </View>
            <View style={[styles.plot, { width: plotWidth, height: plotHeight }]}>
              <View style={styles.areaFill} />
              {pointPositions.map((point, index) => {
                const next = pointPositions[index + 1]
                if (!next) return null
                const segmentLength = Math.hypot(next.x - point.x, next.y - point.y)
                const angle = Math.atan2(next.y - point.y, next.x - point.x)
                return (
                  <View
                    key={`segment-${points[index].label}`}
                    style={[
                      styles.lineSegment,
                      { left: point.x, top: point.y, width: segmentLength, transform: [{ rotate: `${angle}rad` }] },
                    ]}
                  />
                )
              })}
              {pointPositions.map((point, index) => (
                <View key={points[index].label} style={[styles.point, { left: point.x - 4, top: point.y - 4 }]} />
              ))}
            </View>
            <View style={[styles.xLabels, { width: plotWidth }]}>
              {points.map((point, index) => (
                <Text key={point.label} style={[styles.axisLabel, index === points.length - 1 && styles.lastAxisLabel]}>
                  {point.label}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.legend}>
            <View style={styles.legendDot} />
            <Text style={styles.legendText}>Preço mediano por m²</Text>
          </View>
          <Text style={styles.chartNote}>Acompanhe a direção dos preços no período selecionado.</Text>
        </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md },
  marketSection: { gap: spacing.md, position: 'relative' }, pageHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, contextHeader: { alignItems: 'center', backgroundColor: colors.white, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', padding: spacing.md }, contextCopy: { flex: 1, gap: 3 }, eyebrow: { color: colors.primary, fontSize: 10, fontWeight: '700', letterSpacing: 0.8 }, pageTitle: { color: colors.text, fontSize: 21, fontWeight: '700' }, contextText: { color: colors.secondaryLight, fontSize: 12 }, filterButton: { alignItems: 'center', backgroundColor: '#fff0f8', borderRadius: 8, height: 36, justifyContent: 'center', width: 36 },
  filtersOverlay: { backgroundColor: colors.white, borderColor: '#dfe5ee', borderRadius: 16, borderWidth: 1, elevation: 10, left: 0, padding: spacing.md, position: 'absolute', right: 0, shadowColor: '#1e293b', shadowOffset: { height: 5, width: 0 }, shadowOpacity: 0.16, shadowRadius: 10, top: 52, zIndex: 10 }, filtersHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  sectionHeading: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm }, sectionTitle: { color: colors.text, fontSize: 15, fontWeight: '700', textAlign: 'left' }, clearText: { color: colors.primary, fontSize: 12, fontWeight: '700' }, divider: { backgroundColor: '#edf0f5', height: 1, marginVertical: spacing.sm }, filterNote: { color: '#8a98ab', fontSize: 11, lineHeight: 16, marginTop: spacing.sm, textAlign: 'center' },
  indicators: { flexDirection: 'row', gap: spacing.sm }, indicatorCard: { backgroundColor: colors.white, borderColor: '#e7e1e5', borderRadius: 16, borderWidth: 1, elevation: 1, flex: 1, minHeight: 132, minWidth: 0, padding: spacing.md, shadowColor: '#2f2430', shadowOffset: { height: 2, width: 0 }, shadowOpacity: 0.06, shadowRadius: 5 }, readingCard: { backgroundColor: '#fff7fb', borderColor: '#edc8de' }, indicatorHeader: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, minHeight: 28 }, iconBadge: { alignItems: 'center', backgroundColor: '#fff0f8', borderRadius: 8, flexShrink: 0, height: 28, justifyContent: 'center', width: 28 }, greenIcon: { backgroundColor: '#e6faf2' }, indicatorTitle: { color: colors.secondaryLight, flex: 1, flexShrink: 1, fontSize: 11, fontWeight: '600', lineHeight: 15, textAlign: 'left' }, indicatorValue: { color: colors.primary, fontSize: 18, fontWeight: '700', lineHeight: 23, marginTop: spacing.sm, minHeight: 23, textAlign: 'left' }, greenValue: { color: '#009b68' }, indicatorCaption: { color: '#8a98ab', flex: 1, fontSize: 10, lineHeight: 15, marginTop: spacing.sm, textAlign: 'left' },
  chartCard: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.md }, chartHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, chartSubtitle: { color: colors.mutedText, fontSize: 12, marginTop: 3, textAlign: 'left' }, chartIcon: { alignItems: 'center', backgroundColor: '#fff0f8', borderRadius: 8, height: 30, justifyContent: 'center', width: 30 }, chart: { marginTop: spacing.md, position: 'relative' }, gridLine: { backgroundColor: '#e7ebf1', height: 1, left: 34, position: 'absolute', right: 0 }, yLabels: { justifyContent: 'space-between', left: 0, position: 'absolute', top: 12, width: 32 }, axisLabel: { color: '#9aa6b8', fontSize: 9 }, lastAxisLabel: { color: colors.primary, fontWeight: '700' }, plot: { left: 34, overflow: 'hidden', position: 'absolute', top: 14 }, areaFill: { backgroundColor: '#f6ddec', bottom: 0, left: 0, opacity: 0.72, position: 'absolute', right: 0, top: 42 }, lineSegment: { backgroundColor: colors.primary, height: 3, position: 'absolute', transformOrigin: 'left center' }, point: { backgroundColor: colors.white, borderColor: colors.primary, borderRadius: 6, borderWidth: 3, height: 8, position: 'absolute', width: 8 }, xLabels: { bottom: 0, flexDirection: 'row', justifyContent: 'space-between', left: 34, position: 'absolute' }, legend: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, justifyContent: 'center', marginTop: spacing.sm }, legendDot: { backgroundColor: colors.primary, borderRadius: 5, height: 10, width: 10 }, legendText: { color: colors.secondaryLight, fontSize: 11, fontWeight: '600' }, chartNote: { color: '#9aa6b8', fontSize: 10, marginTop: spacing.md, textAlign: 'center' }, analysisCard: { backgroundColor: '#fff7fb', borderColor: '#edc8de', borderRadius: 16, borderWidth: 1, elevation: 1, gap: spacing.sm, padding: spacing.md, shadowColor: '#2f2430', shadowOffset: { height: 2, width: 0 }, shadowOpacity: 0.06, shadowRadius: 5 }, analysisHeading: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm }, analysisTitle: { color: colors.primary, fontSize: 15, fontWeight: '700' }, analysisText: { color: colors.secondaryLight, fontSize: 12, lineHeight: 18 },
})
