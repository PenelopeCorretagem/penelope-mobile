import { useMemo } from 'react'
import { localDashboardData } from './DashboardModel'

export function useDashboardViewModel() {
  return useMemo(() => localDashboardData, [])
}
