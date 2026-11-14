import { Ionicons } from '@expo/vector-icons'
import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { PROPERTY_TYPES } from '@constant/propertyTypes'
import { APP_ROUTES } from '@shared/constants/routes'
import { PropertiesFilters } from '@properties/pages/Properties/PropertiesModel'
import ButtonView from '@shared/components/ui/Button'
import { colors, spacing } from '@shared/styles/style'
import { useSearchModalViewModel } from './useSearchModalViewModel'
import { getSearchHistoryLabel } from './SearchModalModel'
import { useTranslation } from 'react-i18next'

type SearchModalViewProps = {
  visible: boolean
  onClose: () => void
}

type FilterValue = string | null

type OptionGroupProps = {
  label: string
  onSelect: (value: FilterValue) => void
  options: Array<{ label?: string; labelKey?: string; value: FilterValue }>
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
  const { t } = useTranslation()
  const {
    filters,
    handleClose,
    handleSubmitSearch,
    handleVoiceSearch,
    isExpanded,
    isListening,
    speechError,
    aiSearchError,
    isInterpretingSearch,
    cityOptions,
    regionOptions,
    sortOptions,
    updateFilters,
    setIsExpanded,
    inputRef,
    hasActiveFilters,
    resetFilters,
    searchHistory,
    handleSelectSearchHistory,
  } = useSearchModalViewModel({ visible, onClose })

  return (
    <Modal
      animationType="slide"
      onRequestClose={handleClose}
      transparent={false}
      visible={visible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('search.close')}
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
              editable={!isInterpretingSearch}
              maxLength={500}
              onChangeText={(searchTerm) => updateFilters((currentFilters) => ({ ...currentFilters, searchTerm }))}
              onSubmitEditing={handleSubmitSearch}
              placeholder={t('search.placeholder')}
              placeholderTextColor={colors.mutedText}
              returnKeyType="search"
              style={styles.searchInput}
              value={filters.searchTerm}
            />
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isListening ? t('search.stopVoice') : t('search.voice')}
            disabled={isInterpretingSearch}
            onPress={isListening ? () => handleVoiceSearch(false) : () => handleVoiceSearch(true)}
            style={styles.actionButton}
          >
            <Ionicons name={isListening ? 'mic' : 'mic-outline'} size={22} color={colors.secondary} />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isExpanded ? t('search.closeFilters') : t('search.openFilters')}
            onPress={() => setIsExpanded((value) => !value)}
            style={styles.actionButton}
          >
            <Ionicons name="options-outline" size={22} color={colors.secondary} />
          </Pressable>
        </View>

        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          {speechError ? <Text style={styles.errorText}>{t(speechError)}</Text> : null}
          {aiSearchError ? <Text style={styles.errorText}>{t(aiSearchError)}</Text> : null}
          {isInterpretingSearch ? (
            <View style={styles.aiLoading}>
              <ActivityIndicator color={colors.primary} size="small" />
              <Text style={styles.aiLoadingText}>{t('search.interpreting')}</Text>
            </View>
          ) : null}
          {isExpanded ? (
            <View style={styles.filterPanel}>
              <OptionGroup
                label={t('search.city')}
                onSelect={(city) => updateFilters((currentFilters) => ({ ...currentFilters, city }))}
                options={cityOptions.map((option) => ({
                  ...option,
                  label: 'label' in option ? option.label : t(option.labelKey),
                }))}
                value={filters.city}
              />
              <OptionGroup
                label={t('search.region')}
                onSelect={(region) => updateFilters((currentFilters) => ({ ...currentFilters, region }))}
                options={regionOptions.map((option) => ({
                  ...option,
                  label: 'label' in option ? option.label : t(option.labelKey),
                }))}
                value={filters.region}
              />
              <OptionGroup
                label={t('search.type')}
                onSelect={(type) => updateFilters((currentFilters) => ({ ...currentFilters, type: (type ?? 'TODOS') as PropertiesFilters['type'] }))}
                options={[
                  { label: t('common.all'), value: 'TODOS' },
                  ...Object.values(PROPERTY_TYPES).map(({ domainKey }) => ({ label: t(`search.typeOptions.${domainKey}`), value: domainKey })),
                ]}
                value={filters.type}
              />
              <OptionGroup
                label={t('search.sort')}
                onSelect={(sortOrder) => updateFilters((currentFilters) => ({ ...currentFilters, sortOrder: (sortOrder ?? 'distance') as PropertiesFilters['sortOrder'] }))}
                options={sortOptions.map((option) => ({ label: t(option.labelKey), value: option.value }))}
                value={filters.sortOrder}
              />

              <ButtonView
                accessibilityLabel={t('common.clearFilters')}
                label={t('common.clearFilters')}
                onPress={resetFilters}
                style={({ pressed }) => ({
                  backgroundColor: colors.secondary,
                  borderRadius: 8,
                  marginTop: spacing.sm,
                  opacity: pressed ? 0.8 : 1,
                })}
              />
              <ButtonView
                accessibilityLabel={t('common.applyFilters')}
                disabled={isInterpretingSearch}
                label={isInterpretingSearch ? t('search.interpretingShort') : filters.searchTerm.trim() ? t('search.aiSearch') : t('common.applyFilters')}
                onPress={handleSubmitSearch}
                style={({ pressed }) => ({
                  backgroundColor: colors.primary,
                  borderRadius: 8,
                  marginTop: spacing.sm,
                  opacity: pressed ? 0.8 : 1,
                })}
              />
            </View>
          ) : searchHistory.length > 0 ? (
            <View style={styles.historyPanel}>
              <Text style={styles.historyTitle}>{t('search.recent')}</Text>
              {searchHistory.map((entry, index) => (
                <Pressable
                  accessibilityRole="button"
                  key={`${entry.searchTerm}-${entry.city}-${entry.region}-${entry.type}-${index}`}
                  onPress={() => handleSelectSearchHistory(entry)}
                  style={styles.historyItem}
                >
                  <Ionicons name="time-outline" size={18} color={colors.mutedText} />
                  <Text style={styles.historyText}>
                    {(() => {
                      const label = getSearchHistoryLabel(entry)
                      return 'value' in label ? label.value : t(label.key, label.params ?? {})
                    })()}
                  </Text>
                </Pressable>
              ))}
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
    paddingBottom: 160,
  },
  filterPanel: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: spacing.md,
  },
  historyPanel: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
  },
  historyTitle: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  historyItem: {
    alignItems: 'center',
    borderBottomColor: colors.primaryLight,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  historyText: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
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
  aiLoading: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  aiLoadingText: { color: colors.mutedText, fontSize: 13 },
})
