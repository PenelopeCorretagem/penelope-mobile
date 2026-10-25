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
  icon: 'card' | 'trending-up' | 'business'
  tone: 'pink' | 'green'
  spansTwoColumns?: boolean
}

export type TrendPoint = {
  label: string
  value: number
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
    { title: 'Analise da IA', value: '', caption: 'Com base na análise dos dados, observa-se uma tendência de valorização dos imóveis, impulsionada pela demanda, localização estratégica e pelo aquecimento gradual do mercado imobiliário.', icon: "business", tone: 'pink', spansTwoColumns: true },
    { title: 'Preço mediano m²', value: 'R$ 11.450', caption: 'Último mês disponível', icon: 'card', tone: 'pink' },
    { title: 'Variação anual', value: '+8,4%', caption: 'Mesmo mês ano anterior', icon: 'trending-up', tone: 'green' },
  ],
  points: [
  { label: '2020', value: 81 },
  { label: '2021', value: 84 },
  { label: '2022', value: 88 },
  { label: '2023', value: 92 },
  { label: '2024', value: 95 },
  { label: '2025', value: 99 },
  { label: '2026', value: 103 },
  ],
}
