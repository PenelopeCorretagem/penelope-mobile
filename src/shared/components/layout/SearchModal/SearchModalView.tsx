import { Ionicons } from '@expo/vector-icons'
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { ESTATE_TYPES } from '@constant/estateTypes'
import { APP_ROUTES } from '@constant/routes'
import { PropertiesFilters } from '@properties/pages/Properties/PropertiesModel'
import ButtonView from '@shared/components/ui/Button'
import { colors, spacing } from '@shared/styles/style'
import { useSearchModalViewModel } from './useSearchModalViewModel'

type SearchModalViewProps = {
  visible: boolean
  onClose: () => void
}

type FilterValue = string | null

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

export default function SearchModalView({ visible, onClose }: SearchModalViewProps) {
  const {
    filters,
    handleClose,
    handleSubmitSearch,
    handleVoiceSearch,
    isExpanded,
    isListening,
    speechError,
    cityOptions,
    regionOptions,
    sortOptions,
    setFilters,
    setIsExpanded,
    inputRef,
    hasActiveFilters,
    resetFilters,
  } = useSearchModalViewModel({ visible, onClose })

  return (
    <Modal
      animationType="slide"
      onRequestClose={handleClose}
      transparent={false}
      visible={visible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Fechar pesquisa"
            onPress={handleClose}
            style={styles.actionButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.secondary} />
          </Pressable>

          <View style={styles.searchInputContainer}>
            <TextInput
              ref={inputRef}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(searchTerm) => setFilters((currentFilters) => ({ ...currentFilters, searchTerm }))}
              onSubmitEditing={handleSubmitSearch}
              placeholder="Pesquisar imóveis"
              placeholderTextColor={colors.mutedText}
              returnKeyType="search"
              style={styles.searchInput}
              value={filters.searchTerm}
            />
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isListening ? 'Parar pesquisa por voz' : 'Pesquisa por voz'}
            onPress={isListening ? () => handleVoiceSearch(false) : () => handleVoiceSearch(true)}
            style={styles.actionButton}
          >
            <Ionicons name={isListening ? 'mic' : 'mic-outline'} size={22} color={colors.secondary} />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isExpanded ? 'Fechar filtros' : 'Abrir filtros'}
            onPress={() => setIsExpanded((value) => !value)}
            style={styles.actionButton}
          >
            <Ionicons name="options-outline" size={22} color={colors.secondary} />
          </Pressable>
        </View>

        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          {speechError ? <Text style={styles.errorText}>{speechError}</Text> : null}

          {isExpanded ? (
            <View style={styles.filterPanel}>
              <OptionGroup
                label="Cidade"
                onSelect={(city) => setFilters((currentFilters) => ({ ...currentFilters, city }))}
                options={cityOptions}
                value={filters.city}
              />
              <OptionGroup
                label="Região"
                onSelect={(region) => setFilters((currentFilters) => ({ ...currentFilters, region }))}
                options={regionOptions}
                value={filters.region}
              />
              <OptionGroup
                label="Tipo"
                onSelect={(type) => setFilters((currentFilters) => ({ ...currentFilters, type: (type ?? 'TODOS') as PropertiesFilters['type'] }))}
                options={[
                  { label: 'Todos', value: 'TODOS' },
                  ...Object.values(ESTATE_TYPES).map(({ domainKey, filterLabel }) => ({ label: filterLabel, value: domainKey })),
                ]}
                value={filters.type}
              />
              <OptionGroup
                label="Ordenação"
                onSelect={(sortOrder) => setFilters((currentFilters) => ({ ...currentFilters, sortOrder: (sortOrder ?? 'none') as PropertiesFilters['sortOrder'] }))}
                options={sortOptions}
                value={filters.sortOrder}
              />

              <ButtonView
                accessibilityLabel="Limpar filtros"
                label="Limpar filtros"
                onPress={resetFilters}
                style={({ pressed }) => ({
                  backgroundColor: colors.secondary,
                  borderRadius: 8,
                  marginTop: spacing.sm,
                  opacity: pressed ? 0.8 : 1,
                })}
              />
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomColor: colors.primaryLight,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 34,
  },
  searchInputContainer: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: '#f3f3f3',
    borderRadius: 14,
    color: colors.text,
    fontSize: 15,
    minHeight: 40,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  body: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bodyContent: {
    padding: spacing.md,
  },
  filterPanel: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: spacing.md,
  },
  optionGroup: {
    marginBottom: spacing.md,
  },
  optionLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    borderColor: colors.secondaryLight,
    borderRadius: 6,
    borderWidth: 1,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  optionSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  optionText: {
    color: colors.text,
    fontSize: 13,
  },
  optionTextSelected: {
    color: colors.white,
    fontSize: 13,
  },
  errorText: {
    color: colors.primary,
    fontSize: 13,
    marginBottom: spacing.sm,
  },
})
