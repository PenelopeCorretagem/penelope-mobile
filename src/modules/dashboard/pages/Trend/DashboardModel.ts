export type TrendDirection = 'up' | 'down'

export type TrendPoint = {
  label: string
  value: number
  direction: TrendDirection
  change: string
}

export type TrendSummary = {
  title: string
  value: string
  description: string
  direction: TrendDirection
}

export type DashboardData = {
  summary: TrendSummary
  points: TrendPoint[]
}

export const localDashboardData: DashboardData = {
  summary: {
    title: 'Interesse em imóveis',
    value: '+18,4%',
    description: 'crescimento médio nos últimos meses',
    direction: 'up',
  },
  points: [
    { label: 'Mai', value: 42, direction: 'up', change: '+8%' },
    { label: 'Jun', value: 51, direction: 'up', change: '+21%' },
    { label: 'Jul', value: 47, direction: 'down', change: '-8%' },
    { label: 'Ago', value: 64, direction: 'up', change: '+36%' },
    { label: 'Set', value: 73, direction: 'up', change: '+14%' },
    { label: 'Out', value: 82, direction: 'up', change: '+12%' },
  ],
}
