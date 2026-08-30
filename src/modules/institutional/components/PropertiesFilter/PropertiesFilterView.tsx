import { useState } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { ESTATE_TYPES } from '@constant/estateTypes'
import Button from '@shared/components/ui/Button'
import Text from '@shared/components/ui/Text'
import { colors, spacing } from '@shared/styles/style'
import { PropertiesFilters, SortOrder } from '@institutional/pages/Properties/PropertiesModel'

type PropertiesFilterProps = {
  cities: string[]
  filters: PropertiesFilters
  onChange: (updates: Partial<PropertiesFilters>) => void
  onClear: () => void
  regions: string[]
}

type FilterValue = string | null

const sortOptions: Array<{ label: string; value: SortOrder }> = [
  { label: 'Sem ordenação', value: 'none' },
  { label: 'A a Z', value: 'asc' },
  { label: 'Z a A', value: 'desc' },
]

type OptionGroupProps = {
  label: string
  onSelect: (value: FilterValue) => void
  options: Array<{ label: string; value: FilterValue }>
  value: FilterValue
}

function OptionGroup({ label, onSelect, options, value }: OptionGroupProps) {
  return (
    <View style={styles.optionGroup}>
      <Text style={styles.optionLabel}>{label}</Text>
      <View style={styles.options}>
        {options.map((option) => (
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ checked: value === option.value }}
            key={`${label}-${option.value ?? 'all'}`}
            onPress={() => onSelect(option.value)}
            style={[styles.option, value === option.value && styles.optionSelected]}
          >
            <Text style={value === option.value ? styles.optionTextSelected : styles.optionText}>{option.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default function PropertiesFilterView({ cities, filters, onChange, onClear, regions }: PropertiesFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          accessibilityLabel="Buscar imóveis"
          onChangeText={(searchTerm) => onChange({ searchTerm })}
          placeholder="Buscar por título, cidade ou descrição"
          placeholderTextColor={colors.mutedText}
          style={styles.searchInput}
          value={filters.searchTerm}
        />
        <Pressable
          accessibilityLabel={isExpanded ? 'Fechar filtros' : 'Abrir filtros'}
          accessibilityRole="button"
          onPress={() => setIsExpanded((value) => !value)}
          style={styles.filtersButton}
        >
          <Text style={styles.filtersButtonText}>Filtros</Text>
        </Pressable>
      </View>

      {isExpanded ? (
        <View style={styles.expandedContent}>
          <OptionGroup
            label="Cidade"
            onSelect={(city) => onChange({ city })}
            options={[{ label: 'Todas', value: null }, ...cities.map((city) => ({ label: city, value: city }))]}
            value={filters.city}
          />
          <OptionGroup
            label="Região"
            onSelect={(region) => onChange({ region })}
            options={[{ label: 'Todas', value: null }, ...regions.map((region) => ({ label: region, value: region }))]}
            value={filters.region}
          />
          <OptionGroup
            label="Tipo"
            onSelect={(type) => onChange({ type: (type ?? 'TODOS') as PropertiesFilters['type'] })}
            options={[
              { label: 'Todos', value: 'TODOS' },
              ...Object.values(ESTATE_TYPES).map(({ domainKey, filterLabel }) => ({ label: filterLabel, value: domainKey })),
            ]}
            value={filters.type}
          />
          <OptionGroup
            label="Ordenação"
            onSelect={(sortOrder) => onChange({ sortOrder: (sortOrder ?? 'none') as SortOrder })}
            options={sortOptions}
            value={filters.sortOrder}
          />
          <Button onPress={onClear}>Limpar filtros</Button>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  searchRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  searchInput: {
    backgroundColor: colors.white,
    borderColor: colors.primaryLight,
    borderRadius: 6,
    borderWidth: 1,
    color: colors.text,
    flex: 1,
    minHeight: 44,
    paddingHorizontal: spacing.md,
  },
  filtersButton: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 6,
    justifyContent: 'center',
    minWidth: 86,
    paddingHorizontal: spacing.sm,
  },
  filtersButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  expandedContent: {
    backgroundColor: colors.white,
    borderRadius: 6,
    gap: spacing.md,
    padding: spacing.md,
  },
  optionGroup: {
    gap: spacing.sm,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  option: {
    borderColor: colors.secondaryLight,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  optionSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  optionText: {
    fontSize: 13,
  },
  optionTextSelected: {
    color: colors.white,
    fontSize: 13,
  },
})