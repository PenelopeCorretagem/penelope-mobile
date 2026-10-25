import { useCallback, useMemo, useState } from 'react'
import { localDashboardData, TrendFilterKey } from './DashboardModel'

export function useDashboardViewModel() {
  const initialFilters = useMemo(
    () => Object.fromEntries(localDashboardData.filters.map((filter) => [filter.key, filter.options[0]])) as Record<TrendFilterKey, string>,
    [],
  )
  const [filters, setFilters] = useState<Record<TrendFilterKey, string>>(initialFilters)
  const [expandedFilter, setExpandedFilter] = useState<TrendFilterKey | null>(null)

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
    filterDefinitions: localDashboardData.filters,
    filters,
    expandedFilter,
    toggleFilter,
    selectFilter,
    clearFilters,
  }
}
