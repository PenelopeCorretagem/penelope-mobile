import { useCallback, useMemo, useState } from 'react'
import { localDashboardData, TrendFilterKey } from './DashboardModel'

export function useDashboardViewModel() {
  const initialFilters = useMemo(
    () => Object.fromEntries(localDashboardData.filters.map((filter) => [filter.key, filter.options[0]])) as Record<TrendFilterKey, string>,
    [],
  )
  const [filters, setFilters] = useState<Record<TrendFilterKey, string>>(initialFilters)

  const selectFilter = useCallback((key: TrendFilterKey, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }, [])

  const clearFilters = useCallback(() => setFilters(initialFilters), [initialFilters])

  return {
    ...localDashboardData,
    filterDefinitions: localDashboardData.filters,
    filters,
    selectFilter,
    clearFilters,
  }
}
