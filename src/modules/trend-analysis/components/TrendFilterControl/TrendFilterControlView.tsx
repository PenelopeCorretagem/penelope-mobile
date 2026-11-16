import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet, View } from 'react-native'
import Text from '@shared/components/ui/Text'
import { colors, spacing } from '@shared/styles/style'
import { TrendFilter, TrendFilterKey } from '../../pages/TrendAnalysis/TrendAnalysisModel'
import { useTranslation } from 'react-i18next'

type TrendFilterControlProps = {
  filter: TrendFilter
  value: string
  expanded: boolean
  onToggle: (key: TrendFilterKey) => void
  onSelect: (key: TrendFilterKey, value: string) => void
}

export default function TrendFilterControlView({ filter, value, expanded, onToggle, onSelect }: TrendFilterControlProps) {
  const { t } = useTranslation()
  const label = t(filter.labelKey)
  const translateOption = (option: string) => t(`trend.filters.${filter.key}.options.${option}`)
  return (
    <View style={styles.filterControl}>
      <Pressable
        accessibilityHint={expanded ? t('trend.filters.closeOptions') : t('trend.filters.openOptions')}
        accessibilityLabel={`${label}: ${translateOption(value)}`}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={() => onToggle(filter.key)}
        style={styles.filterTrigger}
      >
        <Text style={styles.filterLabel}>{label}</Text>
        <View style={styles.filterValueRow}>
          <Text style={styles.filterValue}>{translateOption(value)}</Text>
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={16} color={colors.secondaryLight} />
        </View>
      </Pressable>
      {expanded && (
        <View accessibilityLabel={t('trend.filters.optionsFor', { label })} style={styles.optionsList}>
          {filter.options.map((option) => (
            <Pressable
              accessibilityLabel={`${label}: ${translateOption(option)}`}
              accessibilityRole="button"
              accessibilityState={{ selected: option === value }}
              key={option}
              onPress={() => onSelect(filter.key, option)}
              style={[styles.option, option === value && styles.selectedOption]}
            >
              <Text style={[styles.optionText, option === value && styles.selectedOptionText]}>{translateOption(option)}</Text>
              {option === value && <Ionicons name="checkmark" size={16} color={colors.primary} />}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  filterControl: { backgroundColor: '#f7f9fc', borderColor: '#dfe5ee', borderRadius: 12, borderWidth: 1, marginBottom: spacing.sm, overflow: 'hidden' },
  filterTrigger: { paddingHorizontal: spacing.md, paddingVertical: 10 },
  filterLabel: { color: colors.secondaryLight, fontSize: 11, marginBottom: 4, textAlign: 'left' },
  filterValueRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  filterValue: { color: colors.text, fontSize: 13, textAlign: 'left' },
  optionsList: { borderColor: '#dfe5ee', borderTopWidth: 1, paddingVertical: 4 },
  option: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: 10 },
  selectedOption: { backgroundColor: '#fff0f8' },
  optionText: { color: colors.text, fontSize: 13, textAlign: 'left' },
  selectedOptionText: { color: colors.primary, fontWeight: '700' },
})
