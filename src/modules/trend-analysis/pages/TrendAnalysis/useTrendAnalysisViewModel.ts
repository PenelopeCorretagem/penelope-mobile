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

export function useTrendAnalysisViewModel() {
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
    const direction = annualVariation >= 0 ? 'valorização' : 'redução'
    return [
      {
        title: 'Leitura do mercado',
        value: `${direction === 'valorização' ? 'Valorização' : 'Redução'} ${Math.abs(annualVariation).toFixed(1).replace('.', ',')}%`,
        caption: 'Comparação com o ano anterior na amostra filtrada.',
        icon: 'business',
        tone: 'pink',
        spansTwoColumns: true,
      },
      {
        title: 'Preço mediano m²',
        value: formatCurrency(deriveMedianPrice(selectedTransactions)),
        caption: 'Último ano disponível',
        icon: 'card',
        tone: 'pink',
      },
    ]
  }, [selectedTransactions])
  const marketAnalysis = useMemo(() => {
    const annualVariation = deriveAnnualVariation(selectedTransactions)
    const direction = annualVariation >= 0 ? 'valorização' : 'redução'
    const variation = `${Math.abs(annualVariation).toFixed(1).replace('.', ',')}%`

    return `Na amostra de ${filters.neighborhood}, para ${filters.area}, os preços apresentam ${direction} de ${variation} no período de ${filters.period}. Esta é uma estimativa orientativa baseada nas transações da amostra filtrada, oferecida como apoio à leitura do mercado; não representa uma previsão certa nem substitui uma análise completa.`
  }, [filters.area, filters.neighborhood, filters.period, selectedTransactions])

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
