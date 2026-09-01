import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { ESTATE_TYPES } from '@constant/estateTypes'
import { APP_ROUTES } from '@constant/routes'
import {
  getAvailableCities,
  getAvailableRegions,
  PropertiesFilters,
  SortOrder,
  toAdvertisementList,
} from '@properties/pages/Properties/PropertiesModel'
import { getAllAdvertisements } from '@properties/services/advertisementService'
import { colors, spacing } from '@shared/styles/style'

type SearchModalViewProps = {
  visible: boolean
  onClose: () => void
}

type FilterValue = string | null

const defaultFilters: PropertiesFilters = {
  searchTerm: '',
  city: null,
  region: null,
  type: 'TODOS',
  sortOrder: 'none',
}

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

const toQueryParams = (filters: PropertiesFilters) => {
  const params: Record<string, string> = {}

  if (filters.searchTerm.trim()) params.searchTerm = filters.searchTerm.trim()
  if (filters.city) params.city = filters.city
  if (filters.region) params.region = filters.region
  if (filters.type !== 'TODOS') params.type = filters.type
  if (filters.sortOrder !== 'none') params.sortOrder = filters.sortOrder

  return params
}

const getFiltersFromRouteParams = (routeParams: { city?: string | string[]; region?: string | string[]; searchTerm?: string | string[]; sortOrder?: string | string[]; type?: string | string[] }) => ({
  ...defaultFilters,
  searchTerm: typeof routeParams.searchTerm === 'string' ? routeParams.searchTerm : '',
  city: typeof routeParams.city === 'string' ? routeParams.city : null,
  region: typeof routeParams.region === 'string' ? routeParams.region : null,
  type: typeof routeParams.type === 'string' && routeParams.type !== '' ? (routeParams.type as PropertiesFilters['type']) : 'TODOS',
  sortOrder: typeof routeParams.sortOrder === 'string' && routeParams.sortOrder !== '' ? (routeParams.sortOrder as PropertiesFilters['sortOrder']) : 'none',
})

export default function SearchModalView({ visible, onClose }: SearchModalViewProps) {
  const router = useRouter()
  const routeParams = useLocalSearchParams<{ city?: string | string[]; region?: string | string[]; searchTerm?: string | string[]; sortOrder?: string | string[]; type?: string | string[] }>()
  const inputRef = useRef<TextInput>(null)
  const [filters, setFilters] = useState<PropertiesFilters>(() => getFiltersFromRouteParams(routeParams))
  const [isExpanded, setIsExpanded] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [speechError, setSpeechError] = useState<string | null>(null)
  const [countryOptions, setCountryOptions] = useState<{ cities: string[]; regions: string[] }>({
    cities: [],
    regions: [],
  })

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [launch, available, underConstruction] = await Promise.all([
          getAllAdvertisements({ type: ESTATE_TYPES.LANCAMENTO.apiValue, active: true }),
          getAllAdvertisements({ type: ESTATE_TYPES.DISPONIVEL.apiValue, active: true }),
          getAllAdvertisements({ type: ESTATE_TYPES.EM_OBRAS.apiValue, active: true }),
        ])

        const groups = {
          launch: toAdvertisementList(launch),
          available: toAdvertisementList(available),
          underConstruction: toAdvertisementList(underConstruction),
        }

        setCountryOptions({
          cities: getAvailableCities(groups),
          regions: getAvailableRegions(groups),
        })
      } catch (error) {
        console.error('Falha ao carregar opções de filtro do modal', error)
      }
    }

    void loadOptions()
  }, [])

  const cityOptions = useMemo(
    () => [{ label: 'Todas', value: null }, ...countryOptions.cities.map((city) => ({ label: city, value: city }))],
    [countryOptions.cities],
  )

  const regionOptions = useMemo(
    () => [{ label: 'Todas', value: null }, ...countryOptions.regions.map((region) => ({ label: region, value: region }))],
    [countryOptions.regions],
  )

  useEffect(() => {
    const nextFilters = getFiltersFromRouteParams(routeParams)

    setFilters((currentFilters) => {
      const hasChanged = (
        currentFilters.searchTerm !== nextFilters.searchTerm
        || currentFilters.city !== nextFilters.city
        || currentFilters.region !== nextFilters.region
        || currentFilters.type !== nextFilters.type
        || currentFilters.sortOrder !== nextFilters.sortOrder
      )

      return hasChanged ? nextFilters : currentFilters
    })
  }, [routeParams.city, routeParams.region, routeParams.searchTerm, routeParams.sortOrder, routeParams.type])

  useEffect(() => {
    if (!visible) return

    setFilters(getFiltersFromRouteParams(routeParams))
    setIsExpanded(false)
    setSpeechError(null)

    const timeout = setTimeout(() => {
      inputRef.current?.focus()
    }, 150)

    return () => clearTimeout(timeout)
  }, [visible])

  useEffect(() => {
    if (!visible) return

    const startListener = ExpoSpeechRecognitionModule.addListener('start', () => setIsListening(true))
    const endListener = ExpoSpeechRecognitionModule.addListener('end', () => setIsListening(false))
    const resultListener = ExpoSpeechRecognitionModule.addListener('result', (event) => {
      const transcript = event.results[0]?.transcript?.trim()
      if (!transcript) return

      setFilters((currentFilters) => ({ ...currentFilters, searchTerm: transcript }))
    })
    const errorListener = ExpoSpeechRecognitionModule.addListener('error', (event) => {
      setSpeechError(event.message ?? 'Não foi possível reconhecer sua fala.')
      setIsListening(false)
    })

    return () => {
      startListener.remove()
      endListener.remove()
      resultListener.remove()
      errorListener.remove()
      ExpoSpeechRecognitionModule.stop()
    }
  }, [visible])

  const hasActiveFilters = Boolean(
    filters.searchTerm.trim()
      || filters.city
      || filters.region
      || filters.type !== 'TODOS'
      || filters.sortOrder !== 'none',
  )

  const handleSubmitSearch = () => {
    const normalizedFilters = {
      ...defaultFilters,
      ...filters,
      searchTerm: filters.searchTerm.trim(),
    }

    router.push({
      pathname: APP_ROUTES.imoveis,
      params: toQueryParams(normalizedFilters),
    })

    onClose()
  }

  const handleClose = () => {
    if (hasActiveFilters) {
      handleSubmitSearch()
      return
    }

    onClose()
  }

  const handleVoiceSearch = async () => {
    try {
      const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync()
      if (!permission.granted) {
        setSpeechError('Permissão de microfone negada. Habilite o acesso para usar a pesquisa por voz.')
        return
      }

      setSpeechError(null)
      setIsListening(true)
      ExpoSpeechRecognitionModule.start({
        lang: 'pt-BR',
        continuous: false,
        interimResults: true,
      })
    } catch (error) {
      console.error('Erro ao iniciar reconhecimento de voz', error)
      setSpeechError('Não foi possível iniciar a pesquisa por voz.')
      setIsListening(false)
    }
  }

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
            onPress={isListening ? () => ExpoSpeechRecognitionModule.stop() : handleVoiceSearch}
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
                onSelect={(sortOrder) => setFilters((currentFilters) => ({ ...currentFilters, sortOrder: (sortOrder ?? 'none') as SortOrder }))}
                options={sortOptions}
                value={filters.sortOrder}
              />

              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  setFilters((currentFilters) => ({
                    ...defaultFilters,
                    searchTerm: currentFilters.searchTerm,
                  }))
                }}
                style={styles.clearButton}
              >
                <Text style={styles.clearButtonText}>Limpar filtros</Text>
              </Pressable>
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
  clearButton: {
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    paddingVertical: spacing.sm,
  },
  clearButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  errorText: {
    color: colors.primary,
    fontSize: 13,
    marginBottom: spacing.sm,
  },
})
