import { useCallback, useMemo, useState } from 'react'
import {
  deriveAnnualPoints,
  deriveAnnualVariation,
  deriveMedianPrice,
  filterTransactions,
  formatCurrency,
  localDashboardData,
  mockTransactions,
  TrendFilterKey,
  TrendMetric,
} from './DashboardModel'

export function useDashboardViewModel() {
  const initialFilters = useMemo(
    () => Object.fromEntries(localDashboardData.filters.map((filter) => [filter.key, filter.options[0]])) as Record<TrendFilterKey, string>,
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
        title: 'Analise da IA',
        value: '',
        caption: `Com base na amostra filtrada, observa-se uma tendência de ${direction} dos imóveis, considerando localização e faixa de área.`,
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
      {
        title: 'Variação anual',
        value: `${annualVariation >= 0 ? '+' : ''}${annualVariation.toFixed(1).replace('.', ',')}%`,
        caption: 'Mesmo ano do ano anterior',
        icon: 'trending-up',
        tone: 'green',
      },
    ]
  }, [selectedTransactions])

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
    ...localDashboardData,
    indicators,
    points,
    filterDefinitions: localDashboardData.filters,
    filters,
    expandedFilter,
    toggleFilter,
    selectFilter,
    clearFilters,
  }
}
