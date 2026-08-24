export const ESTATE_TYPES = {
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

export type EstateTypeKey = (typeof ESTATE_TYPES)[keyof typeof ESTATE_TYPES]['domainKey']