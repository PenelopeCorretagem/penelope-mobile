export const PROPERTY_TYPES = {
  LANCAMENTO: {
    domainKey: 'LANCAMENTO',
    apiValue: 'LANCAMENTO',
    filterLabel: 'Lançamentos',
    cardLabel: 'Lançamento',
    cardColor: 'primary',
  },
  DISPONIVEL: {
    domainKey: 'DISPONIVEL',
    apiValue: 'DISPONIVEL',
    filterLabel: 'Disponíveis',
    cardLabel: 'Disponível',
    cardColor: 'secondary',
  },
  EM_OBRAS: {
    domainKey: 'EM_OBRAS',
    apiValue: 'EM_OBRAS',
    filterLabel: 'Em Obras',
    cardLabel: 'Em Obras',
    cardColor: 'secondaryLight',
  },
} as const

export type PropertyTypeKey = (typeof PROPERTY_TYPES)[keyof typeof PROPERTY_TYPES]['domainKey']
export type PropertyType = (typeof PROPERTY_TYPES)[keyof typeof PROPERTY_TYPES]['apiValue']

export function isPropertyType(value: unknown): value is PropertyType {
  return Object.values(PROPERTY_TYPES).some(({ apiValue }) => apiValue === value)
}