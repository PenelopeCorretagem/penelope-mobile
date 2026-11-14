import { useCallback, useMemo, useState } from 'react'
import {
  deriveAnnualPoints,
  deriveAnnualVariation,
  deriveMedianPrice,
  filterTransactions,
  formatCurrency,
  localTrendAnalysisData,
  mockTransactions,
  TrendFilterKey,
  TrendMetric,
} from './TrendAnalysisModel'
import { useTranslation } from 'react-i18next'

export function useTrendAnalysisViewModel() {
  const { t } = useTranslation()
  const initialFilters = useMemo(
    () => Object.fromEntries(localTrendAnalysisData.filters.map((filter) => [filter.key, filter.options[0]])) as Record<TrendFilterKey, string>,
    [],
  )
  const [filters, setFilters] = useState<Record<TrendFilterKey, string>>(initialFilters)
  const [expandedFilter, setExpandedFilter] = useState<TrendFilterKey | null>(null)
  const selectedTransactions = useMemo(
    () => filterTransactions(mockTransactions, filters.neighborhood, filters.area),
    [filters.area, filters.neighborhood],
  )
  const points = useMemo(() => deriveAnnualPoints(selectedTransactions), [selectedTransactions])
  const indicators = useMemo<TrendMetric[]>(() => {
    const annualVariation = deriveAnnualVariation(selectedTransactions)
    const direction = annualVariation >= 0 ? 'up' : 'down'
    return [
      {
        title: t('trend.indicators.marketReading'),
        value: t(`trend.indicators.${direction}`, { value: Math.abs(annualVariation).toFixed(1).replace('.', ',') }),
        caption: t('trend.indicators.comparison'),
        icon: 'business',
        tone: 'pink',
        spansTwoColumns: true,
      },
      {
        title: t('trend.indicators.medianPrice'),
        value: formatCurrency(deriveMedianPrice(selectedTransactions)),
        caption: t('trend.indicators.latestYear'),
        icon: 'card',
        tone: 'pink',
      },
    ]
  }, [selectedTransactions, t])
  const marketAnalysis = useMemo(() => {
    const annualVariation = deriveAnnualVariation(selectedTransactions)
    const direction = annualVariation >= 0 ? 'up' : 'down'
    const variation = `${Math.abs(annualVariation).toFixed(1).replace('.', ',')}%`

    return t('trend.analysis', {
      neighborhood: t(`trend.filters.neighborhood.options.${filters.neighborhood}`),
      area: t(`trend.filters.area.options.${filters.area}`),
      period: t(`trend.filters.period.options.${filters.period}`),
      direction: t(`trend.directions.${direction}`),
      variation,
    })
  }, [filters.area, filters.neighborhood, filters.period, selectedTransactions, t])

  const selectFilter = useCallback((key: TrendFilterKey, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }))
    setExpandedFilter(null)
  }, [])
  const toggleFilter = useCallback((key: TrendFilterKey) => {
    setExpandedFilter((current) => (current === key ? null : key))
  }, [])
  const clearFilters = useCallback(() => {
    setFilters(initialFilters)
    setExpandedFilter(null)
  }, [initialFilters])

  return {
    ...localTrendAnalysisData,
    indicators,
    marketAnalysis,
    points,
    filterDefinitions: localTrendAnalysisData.filters,
    filters,
    expandedFilter,
    toggleFilter,
    selectFilter,
    clearFilters,
  }
}
