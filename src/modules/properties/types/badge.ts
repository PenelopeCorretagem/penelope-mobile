export type BadgeType =
  | 'EDUCATION'
  | 'HEALTH_PRIMARY_CARE'
  | 'HEALTH_GENERAL_HOSPITAL'
  | 'GREEN_PARK_NEARBY'
  | 'TRANSPORT_ACCESS'
  | 'SAFETY_OCCURRENCES'

export type PropertyBadge = {
  type: BadgeType
  label: string
  score: number | null
  granted: boolean
  status: 'CALCULATED' | 'UNAVAILABLE'
  reason: string | null
  explanation: string
  evidence: Record<string, unknown>
}

export type EstateBadges = {
  estateId: number
  scaleMax: number
  badges: PropertyBadge[]
}
