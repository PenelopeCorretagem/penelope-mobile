export type TrendDirection = 'up' | 'down'

export type TrendFilterKey = 'period' | 'neighborhood' | 'area'

export type TrendFilter = {
  key: TrendFilterKey
  label: string
  options: string[]
}

export type TrendMetric = {
  title: string
  value: string
  caption: string
  icon: 'card' | 'trending-up' | 'business' | 'calendar'
  tone: 'pink' | 'green' | 'neutral'
}

export type TrendPoint = {
  label: string
  value: number
}

export type TrendIndicator = {
  title: string
  value: string
  caption: string
  direction: TrendDirection
}

export type DashboardData = {
  filters: TrendFilter[]
  indicators: TrendMetric[]
  points: TrendPoint[]
}

export const localDashboardData: DashboardData = {
  filters: [
    { key: 'period', label: 'Período', options: ['Jan/2022 - Ago/2026', 'Último ano'] },
    { key: 'neighborhood', label: 'Bairro', options: ['Todos os bairros', 'Centro', 'Jardim América'] },
    { key: 'area', label: 'Faixa de área construída', options: ['Todas as áreas', 'Até 100 m²', 'Acima de 100 m²'] },
  ],
  indicators: [
    { title: 'Preço mediano m²', value: 'R$ 11.450', caption: 'Último mês disponível', icon: 'card', tone: 'pink' },
    { title: 'Variação anual', value: '+8,4%', caption: 'Mesmo mês ano anterior', icon: 'trending-up', tone: 'green' },
    { title: 'Transações', value: '14.820', caption: 'No período selecionado', icon: 'business', tone: 'pink' },
    { title: 'Atualização', value: '15/Ago/2024', caption: 'Data da base cadastral', icon: 'calendar', tone: 'neutral' },
  ],
  points: [
    { label: 'Jan', value: 72 },
    { label: 'Fev', value: 76 },
    { label: 'Mar', value: 74 },
    { label: 'Abr', value: 84 },
    { label: 'Mai', value: 81 },
    { label: 'Jun', value: 94 },
    { label: 'Jul', value: 103 },
    { label: 'Ago', value: 115 },
  ],
}
