import { useCallback, useEffect, useMemo, useRef, useState, type SetStateAction } from 'react'
import { Platform, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router'
import Constants from 'expo-constants'
import { PROPERTY_TYPES } from '@constant/propertyTypes'
import { APP_ROUTES, isAppRouteActive } from '@shared/constants/routes'
import {
  getAvailableCities,
  getAvailableRegions,
  PropertyTypeFilter,
  PropertiesFilters,
  SortOrder,
  toAdvertisementList,
} from '@properties/pages/Properties/PropertiesModel'
import { getAllAdvertisements } from '@properties/services/advertisementService'
import { interpretPropertySearch } from '@properties/services/propertySearchService'
import {
  defaultFilters,
  getFiltersFromRouteParams,
  hasActiveFilters,
  SEARCH_HISTORY_LIMIT,
  SEARCH_HISTORY_STORAGE_KEY,
  SearchHistoryEntry,
  sortOptions,
  toQueryParams,
} from './SearchModalModel'

export type SearchModalViewModelProps = {
  visible: boolean
  onClose: () => void
}

type SpeechRecognitionModule = typeof import('expo-speech-recognition').ExpoSpeechRecognitionModule

let speechRecognitionModule: SpeechRecognitionModule | null = null

const getSpeechRecognitionModule = () => {
  if (speechRecognitionModule) return speechRecognitionModule
  if (Platform.OS === 'web' || Constants.appOwnership === 'expo') return null

  try {
    speechRecognitionModule = require('expo-speech-recognition').ExpoSpeechRecognitionModule as SpeechRecognitionModule
    return speechRecognitionModule
  } catch {
    return null
  }
}

export function useSearchModalViewModel({ visible, onClose }: SearchModalViewModelProps) {
  const router = useRouter()
  const pathname = usePathname()
  const routeParams = useLocalSearchParams<{ city?: string | string[]; maxPrice?: string | string[]; minBedrooms?: string | string[]; region?: string | string[]; searchTerm?: string | string[]; sortOrder?: string | string[]; type?: string | string[] }>()
  const isFavoritesRoute = isAppRouteActive(pathname, APP_ROUTES.favoritos)
  const isPropertiesListRoute = isAppRouteActive(pathname, APP_ROUTES.imoveis)
  const isSearchWithinProperties = isFavoritesRoute || isPropertiesListRoute
  const inputRef = useRef<TextInput>(null)
  const lastAppliedFiltersRef = useRef<PropertiesFilters>(getFiltersFromRouteParams(routeParams))
  const [filters, setFilters] = useState<PropertiesFilters>(() => getFiltersFromRouteParams(routeParams))
  const [isExpanded, setIsExpanded] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [speechError, setSpeechError] = useState<string | null>(null)
  const [aiSearchError, setAiSearchError] = useState<string | null>(null)
  const [isInterpretingSearch, setIsInterpretingSearch] = useState(false)
  const [countryOptions, setCountryOptions] = useState<{ cities: string[]; regions: string[] }>({
    cities: [],
    regions: [],
  })
  const [searchHistory, setSearchHistory] = useState<SearchHistoryEntry[]>([])

  const updateFilters = useCallback((update: SetStateAction<PropertiesFilters>) => {
    setAiSearchError(null)
    setFilters(update)
  }, [])

  const persistSearchHistory = useCallback(async (entry: SearchHistoryEntry) => {
    const normalizedEntry = { ...entry }
    const currentHistory = searchHistory.filter((item) => JSON.stringify(item) !== JSON.stringify(normalizedEntry))
    const nextHistory = [normalizedEntry, ...currentHistory].slice(0, SEARCH_HISTORY_LIMIT)

    setSearchHistory(nextHistory)
    try {
      await AsyncStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(nextHistory))
    } catch (error) {
      console.error('Falha ao salvar histórico de pesquisa', error)
    }
  }, [searchHistory])

  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(SEARCH_HISTORY_STORAGE_KEY)
        if (!storedHistory) return

        const parsedHistory = JSON.parse(storedHistory) as unknown
        if (Array.isArray(parsedHistory)) {
          const compatibleHistory = parsedHistory
            .filter((entry): entry is Partial<SearchHistoryEntry> => typeof entry === 'object' && entry !== null)
            .map((entry): SearchHistoryEntry => ({
              ...defaultFilters,
              searchTerm: typeof entry.searchTerm === 'string' ? entry.searchTerm : '',
              city: typeof entry.city === 'string' ? entry.city : null,
              region: typeof entry.region === 'string' ? entry.region : null,
              type: typeof entry.type === 'string' ? entry.type as PropertiesFilters['type'] : 'TODOS',
              sortOrder: entry.sortOrder === 'asc' || entry.sortOrder === 'desc' ? entry.sortOrder : 'distance',
              minBedrooms: typeof entry.minBedrooms === 'number' && entry.minBedrooms > 0 ? entry.minBedrooms : null,
              maxPrice: typeof entry.maxPrice === 'number' && entry.maxPrice > 0 ? entry.maxPrice : null,
            }))
          setSearchHistory(compatibleHistory.slice(0, SEARCH_HISTORY_LIMIT))
        }
      } catch (error) {
        console.error('Falha ao carregar histórico de pesquisa', error)
      }
    }

    void loadSearchHistory()
  }, [])

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [launch, available, underConstruction] = await Promise.all([
          getAllAdvertisements({ type: PROPERTY_TYPES.LANCAMENTO.apiValue, active: true }),
          getAllAdvertisements({ type: PROPERTY_TYPES.DISPONIVEL.apiValue, active: true }),
          getAllAdvertisements({ type: PROPERTY_TYPES.EM_OBRAS.apiValue, active: true }),
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
    if (!isSearchWithinProperties) {
      const clearedFilters = { ...defaultFilters }
      lastAppliedFiltersRef.current = clearedFilters
      setFilters(clearedFilters)
      return
    }

    const nextFilters = getFiltersFromRouteParams(routeParams)
    const hasRouteFilters = Boolean(
      nextFilters.searchTerm.trim()
      || nextFilters.city
      || nextFilters.region
      || nextFilters.type !== 'TODOS'
      || nextFilters.sortOrder !== 'distance'
      || nextFilters.minBedrooms !== null
      || nextFilters.maxPrice !== null,
    )

    const resolvedFilters = hasRouteFilters ? nextFilters : lastAppliedFiltersRef.current
    lastAppliedFiltersRef.current = resolvedFilters

    setFilters((currentFilters) => {
      const hasChanged = (
        currentFilters.searchTerm !== resolvedFilters.searchTerm
        || currentFilters.city !== resolvedFilters.city
        || currentFilters.region !== resolvedFilters.region
        || currentFilters.type !== resolvedFilters.type
        || currentFilters.sortOrder !== resolvedFilters.sortOrder
        || currentFilters.minBedrooms !== resolvedFilters.minBedrooms
        || currentFilters.maxPrice !== resolvedFilters.maxPrice
      )

      return hasChanged ? resolvedFilters : currentFilters
    })
  }, [isSearchWithinProperties, routeParams.city, routeParams.maxPrice, routeParams.minBedrooms, routeParams.region, routeParams.searchTerm, routeParams.sortOrder, routeParams.type])

  useEffect(() => {
    if (!visible) return

    if (!isSearchWithinProperties) {
      const clearedFilters = { ...defaultFilters }
      lastAppliedFiltersRef.current = clearedFilters
      setFilters(clearedFilters)
      setIsExpanded(false)
      setSpeechError(null)
      setAiSearchError(null)
      return
    }

    const nextFilters = getFiltersFromRouteParams(routeParams)
    const hasRouteFilters = Boolean(
      nextFilters.searchTerm.trim()
      || nextFilters.city
      || nextFilters.region
      || nextFilters.type !== 'TODOS'
      || nextFilters.sortOrder !== 'distance'
      || nextFilters.minBedrooms !== null
      || nextFilters.maxPrice !== null,
    )

    const resolvedFilters = hasRouteFilters ? nextFilters : lastAppliedFiltersRef.current
    lastAppliedFiltersRef.current = resolvedFilters
    setFilters(resolvedFilters)
    setIsExpanded(false)
    setSpeechError(null)
    setAiSearchError(null)
  }, [isSearchWithinProperties, routeParams.city, routeParams.maxPrice, routeParams.minBedrooms, routeParams.region, routeParams.searchTerm, routeParams.sortOrder, routeParams.type, visible])

  useEffect(() => {
    if (!visible) return

    const module = getSpeechRecognitionModule()
    if (!module) return

    const startListener = module.addListener('start', () => setIsListening(true))
    const endListener = module.addListener('end', () => setIsListening(false))
    const resultListener = module.addListener('result', (event) => {
      const transcript = event.results[0]?.transcript?.trim()
      if (!transcript) return

      updateFilters((currentFilters) => ({ ...currentFilters, searchTerm: transcript }))
    })
    const errorListener = module.addListener('error', (event) => {
      setSpeechError(event.message ?? 'Não foi possível reconhecer sua fala.')
      setIsListening(false)
    })

    return () => {
      startListener.remove()
      endListener.remove()
      resultListener.remove()
      errorListener.remove()
      module.stop()
    }
  }, [updateFilters, visible])

  const hasActiveFilterState = hasActiveFilters(filters)

  const applySearch = useCallback((nextFilters: PropertiesFilters, historySearchTerm = nextFilters.searchTerm) => {
    const normalizedFilters = {
      ...defaultFilters,
      ...nextFilters,
      searchTerm: nextFilters.searchTerm.trim(),
    }

    lastAppliedFiltersRef.current = normalizedFilters
    setFilters(normalizedFilters)
    const params = toQueryParams(normalizedFilters)

    if (hasActiveFilters(normalizedFilters)) {
      void persistSearchHistory({ ...normalizedFilters, searchTerm: historySearchTerm })
    }

    if (isSearchWithinProperties) {
      router.setParams(params)
    } else {
      router.push({ pathname: APP_ROUTES.imoveis, params })
    }

    inputRef.current?.blur()
    onClose()
  }, [isSearchWithinProperties, onClose, persistSearchHistory, router])

  const handleSubmitSearch = useCallback(async () => {
    if (isInterpretingSearch) return

    const normalizedFilters = {
      ...defaultFilters,
      ...filters,
      searchTerm: filters.searchTerm.trim(),
    }
    const historySearchTerm = filters.searchTerm
    const transcript = historySearchTerm.trim()
    setAiSearchError(null)

    if (!transcript) {
      applySearch(normalizedFilters)
      return
    }

    if (transcript.length > 500) {
      setAiSearchError('A busca pode ter no máximo 500 caracteres.')
      return
    }

    inputRef.current?.blur()
    setIsInterpretingSearch(true)
    try {
      const interpretation = await interpretPropertySearch({
        transcript,
        cities: countryOptions.cities.slice(0, 100),
        regions: countryOptions.regions.slice(0, 100),
        propertyTypes: ['TODOS', ...Object.values(PROPERTY_TYPES).map(({ domainKey }) => domainKey)] as PropertyTypeFilter[],
      })

      const hasStructuredFilter = Boolean(
        interpretation.city
        || interpretation.region
        || interpretation.type !== 'TODOS'
        || interpretation.minBedrooms
        || interpretation.maxPrice
        || interpretation.sortOrder !== 'distance',
      )

      applySearch({
        ...normalizedFilters,
        searchTerm: interpretation.searchTerm.trim() || (hasStructuredFilter ? '' : transcript),
        city: normalizedFilters.city ?? interpretation.city,
        region: normalizedFilters.region ?? interpretation.region,
        type: normalizedFilters.type !== 'TODOS' ? normalizedFilters.type : interpretation.type,
        sortOrder: normalizedFilters.sortOrder !== 'distance' ? normalizedFilters.sortOrder : interpretation.sortOrder,
        minBedrooms: normalizedFilters.minBedrooms ?? interpretation.minBedrooms,
        maxPrice: normalizedFilters.maxPrice ?? interpretation.maxPrice,
      }, historySearchTerm)
    } catch (error) {
      console.error('Falha ao interpretar pesquisa com IA', error)
      setAiSearchError(error instanceof Error ? error.message : 'Não foi possível interpretar sua busca com IA.')
    } finally {
      setIsInterpretingSearch(false)
    }
  }, [applySearch, countryOptions.cities, countryOptions.regions, filters, isInterpretingSearch])

  const handleClose = useCallback(() => {
    if (isInterpretingSearch) return
    inputRef.current?.blur()
    onClose()
  }, [isInterpretingSearch, onClose])

  const handleSelectSearchHistory = useCallback((entry: SearchHistoryEntry) => {
    updateFilters(entry)
    lastAppliedFiltersRef.current = entry
    setIsExpanded(false)
    inputRef.current?.blur()
    const params = toQueryParams(entry)

    if (isSearchWithinProperties) {
      router.setParams(params)
    } else {
      router.push({ pathname: APP_ROUTES.imoveis, params })
    }

    onClose()
  }, [isSearchWithinProperties, onClose, router, updateFilters])

  const handleVoiceSearch = useCallback(async (shouldStart = !isListening) => {
    const module = getSpeechRecognitionModule()

    if (!module) {
      setSpeechError('Pesquisa por voz indisponível neste ambiente. Use um development build do aplicativo.')
      return
    }

    if (!shouldStart) {
      setIsListening(false)
      module.stop()
      handleSubmitSearch()
      return
    }

    try {
      const permission = await module.requestPermissionsAsync()
      if (!permission.granted) {
        setSpeechError('Permissão de microfone negada. Habilite o acesso para usar a pesquisa por voz.')
        return
      }

      setSpeechError(null)
      setIsListening(true)
      module.start({
        lang: 'pt-BR',
        continuous: false,
        interimResults: true,
      })
    } catch (error) {
      console.error('Erro ao iniciar reconhecimento de voz', error)
      setSpeechError('Não foi possível iniciar a pesquisa por voz.')
      setIsListening(false)
    }
  }, [handleSubmitSearch, isListening])

  const resetFilters = useCallback(() => {
    setAiSearchError(null)
    updateFilters((currentFilters) => ({
      ...defaultFilters,
      searchTerm: currentFilters.searchTerm,
    }))

    router.setParams({
      searchTerm: '',
      city: '',
      region: '',
      type: 'TODOS',
      sortOrder: 'distance',
      minBedrooms: '',
      maxPrice: '',
    })
  }, [router, updateFilters])

  return {
    filters,
    setFilters,
    updateFilters,
    isExpanded,
    setIsExpanded,
    isListening,
    speechError,
    aiSearchError,
    isInterpretingSearch,
    cityOptions,
    regionOptions,
    sortOptions,
    inputRef,
    hasActiveFilters: hasActiveFilterState,
    handleClose,
    handleSubmitSearch,
    handleVoiceSearch,
    resetFilters,
    searchHistory,
    handleSelectSearchHistory,
  }
}

export default useSearchModalViewModel
