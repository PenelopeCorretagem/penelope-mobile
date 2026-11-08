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

export type TransactionRecord = {
  id: string
  year: number
  neighborhood: 'Centro' | 'Jardim América'
  area: number
  pricePerSquareMeter: number
}

export type DashboardData = {
  filters: TrendFilter[]
  indicators: TrendMetric[]
  points: TrendPoint[]
}

export const mockTransactions: TransactionRecord[] = [
  { id: '2020-centro-small', year: 2020, neighborhood: 'Centro', area: 82, pricePerSquareMeter: 8200 },
  { id: '2020-centro-large', year: 2020, neighborhood: 'Centro', area: 138, pricePerSquareMeter: 9700 },
  { id: '2020-jardim-small', year: 2020, neighborhood: 'Jardim América', area: 94, pricePerSquareMeter: 8500 },
  { id: '2020-jardim-large', year: 2020, neighborhood: 'Jardim América', area: 152, pricePerSquareMeter: 10100 },
  { id: '2021-centro-small', year: 2021, neighborhood: 'Centro', area: 86, pricePerSquareMeter: 8500 },
  { id: '2021-centro-large', year: 2021, neighborhood: 'Centro', area: 142, pricePerSquareMeter: 10000 },
  { id: '2021-jardim-small', year: 2021, neighborhood: 'Jardim América', area: 97, pricePerSquareMeter: 8800 },
  { id: '2021-jardim-large', year: 2021, neighborhood: 'Jardim América', area: 158, pricePerSquareMeter: 10400 },
  { id: '2022-centro-small', year: 2022, neighborhood: 'Centro', area: 89, pricePerSquareMeter: 8900 },
  { id: '2022-centro-large', year: 2022, neighborhood: 'Centro', area: 145, pricePerSquareMeter: 10400 },
  { id: '2022-jardim-small', year: 2022, neighborhood: 'Jardim América', area: 99, pricePerSquareMeter: 9200 },
  { id: '2022-jardim-large', year: 2022, neighborhood: 'Jardim América', area: 164, pricePerSquareMeter: 10800 },
  { id: '2023-centro-small', year: 2023, neighborhood: 'Centro', area: 91, pricePerSquareMeter: 9300 },
  { id: '2023-centro-large', year: 2023, neighborhood: 'Centro', area: 149, pricePerSquareMeter: 10800 },
  { id: '2023-jardim-small', year: 2023, neighborhood: 'Jardim América', area: 102, pricePerSquareMeter: 9600 },
  { id: '2023-jardim-large', year: 2023, neighborhood: 'Jardim América', area: 169, pricePerSquareMeter: 11200 },
  { id: '2024-centro-small', year: 2024, neighborhood: 'Centro', area: 94, pricePerSquareMeter: 9800 },
  { id: '2024-centro-large', year: 2024, neighborhood: 'Centro', area: 153, pricePerSquareMeter: 11300 },
  { id: '2024-jardim-small', year: 2024, neighborhood: 'Jardim América', area: 105, pricePerSquareMeter: 10100 },
  { id: '2024-jardim-large', year: 2024, neighborhood: 'Jardim América', area: 174, pricePerSquareMeter: 11700 },
  { id: '2025-centro-small', year: 2025, neighborhood: 'Centro', area: 97, pricePerSquareMeter: 10300 },
  { id: '2025-centro-large', year: 2025, neighborhood: 'Centro', area: 157, pricePerSquareMeter: 11800 },
  { id: '2025-jardim-small', year: 2025, neighborhood: 'Jardim América', area: 108, pricePerSquareMeter: 10600 },
  { id: '2025-jardim-large', year: 2025, neighborhood: 'Jardim América', area: 179, pricePerSquareMeter: 12200 },
  { id: '2026-centro-small', year: 2026, neighborhood: 'Centro', area: 100, pricePerSquareMeter: 10800 },
  { id: '2026-centro-large', year: 2026, neighborhood: 'Centro', area: 161, pricePerSquareMeter: 12300 },
  { id: '2026-jardim-small', year: 2026, neighborhood: 'Jardim América', area: 110, pricePerSquareMeter: 11100 },
  { id: '2026-jardim-large', year: 2026, neighborhood: 'Jardim América', area: 184, pricePerSquareMeter: 12700 },
]

const fallbackPoints: TrendPoint[] = [
  { label: '2020', value: 0 },
  { label: '2021', value: 0 },
]

export function filterTransactions(
  transactions: TransactionRecord[],
  neighborhood: string,
  area: string,
): TransactionRecord[] {
  const filtered = transactions.filter((transaction) => {
    const matchesNeighborhood = neighborhood === 'Todos os bairros' || transaction.neighborhood === neighborhood
    const matchesArea =
      area === 'Todas as áreas' ||
      (area === 'Até 100 m²' && transaction.area <= 100) ||
      (area === 'Acima de 100 m²' && transaction.area > 100)

    return matchesNeighborhood && matchesArea
  })

  return filtered.length > 0 ? filtered : transactions
}

function median(values: number[]): number {
  if (values.length === 0) return 0

  const sorted = [...values].sort((left, right) => left - right)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle]
}

export function deriveAnnualPoints(transactions: TransactionRecord[]): TrendPoint[] {
  const years = [...new Set(transactions.map((transaction) => transaction.year))].sort((left, right) => left - right)
  const points = years.map((year) => ({
    label: String(year),
    value: Math.round(median(transactions.filter((transaction) => transaction.year === year).map((transaction) => transaction.pricePerSquareMeter))),
  }))

  return points.length > 0 ? points : fallbackPoints
}

export function deriveMedianPrice(transactions: TransactionRecord[]): number {
  if (transactions.length === 0) return 0

  const latestYear = Math.max(...transactions.map((transaction) => transaction.year))
  return median(transactions.filter((transaction) => transaction.year === latestYear).map((transaction) => transaction.pricePerSquareMeter))
}

export function deriveAnnualVariation(transactions: TransactionRecord[]): number {
  const points = deriveAnnualPoints(transactions)
  if (points.length < 2 || points[points.length - 2].value === 0) return 0

  return ((points[points.length - 1].value - points[points.length - 2].value) / points[points.length - 2].value) * 100
}

export function formatCurrency(value: number): string {
  return `R$ ${Math.round(value).toLocaleString('pt-BR')}`
}

export const localDashboardData: DashboardData = {
  filters: [
    { key: 'period', label: 'Período', options: ['Jan/2022 - Ago/2026', 'Último ano'] },
    { key: 'neighborhood', label: 'Bairro', options: ['Todos os bairros', 'Centro', 'Jardim América'] },
    { key: 'area', label: 'Faixa de área construída', options: ['Todas as áreas', 'Até 100 m²', 'Acima de 100 m²'] },
  ],
  indicators: [],
  points: fallbackPoints,
}
