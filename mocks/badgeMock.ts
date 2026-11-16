import type { EstateBadges } from '@properties/types/badge'

export function getMockEstateBadges(estateId: number): EstateBadges {
  return {
    estateId,
    scaleMax: 10,
    badges: [
      {
        type: 'EDUCATION',
        label: 'Escolas próximas',
        score: 8.7,
        granted: true,
        status: 'CALCULATED',
        reason: null,
        explanation: 'Há escolas cadastradas em até 3 km deste empreendimento.',
        evidence: {
          schoolsWithinRadius: 6,
          nearestMeters: 420,
          radiusMeters: 3000,
          distanceMethod: 'STRAIGHT_LINE_HAVERSINE',
        },
      },
      {
        type: 'HEALTH_PRIMARY_CARE',
        label: 'UBS próxima',
        score: 8.1,
        granted: true,
        status: 'CALCULATED',
        reason: null,
        explanation: 'Há uma unidade básica de saúde em até 1,5 km deste empreendimento.',
        evidence: {
          facilityCountWithinRadius: 2,
          nearestMeters: 680,
          radiusMeters: 1500,
        },
      },
      {
        type: 'HEALTH_GENERAL_HOSPITAL',
        label: 'Hospital próximo',
        score: 7.4,
        granted: true,
        status: 'CALCULATED',
        reason: null,
        explanation: 'Há um hospital geral em até 5 km deste empreendimento.',
        evidence: {
          facilityCountWithinRadius: 1,
          nearestMeters: 3200,
          radiusMeters: 5000,
        },
      },
      {
        type: 'GREEN_PARK_NEARBY',
        label: 'Parque no entorno',
        score: 8.5,
        granted: true,
        status: 'CALCULATED',
        reason: null,
        explanation: 'Há uma área verde em até 1 km deste empreendimento.',
        evidence: {
          nearestDistanceMeters: 240,
          radiusMeters: 1000,
          distanceTarget: 'POLYGON_NOT_ENTRANCE',
        },
      },
      {
        type: 'TRANSPORT_ACCESS',
        label: 'Acesso a transporte',
        score: 7.9,
        granted: true,
        status: 'CALCULATED',
        reason: null,
        explanation: 'O empreendimento possui acesso próximo a transporte público.',
        evidence: {
          nearestMeters: 350,
          radiusMeters: 1000,
        },
      },
      {
        type: 'SAFETY_OCCURRENCES',
        label: 'Região segura',
        score: 6.8,
        granted: true,
        status: 'CALCULATED',
        reason: null,
        explanation: 'A região possui indicadores de segurança disponíveis.',
        evidence: {
          occurrencesPerThousand: 2.1,
          referencePeriod: '2026-09',
        },
      },
    ],
  }
}
