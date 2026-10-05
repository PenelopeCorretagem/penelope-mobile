import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Platform, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router'
import Constants from 'expo-constants'
import { PROPERTY_TYPES } from '@constant/propertyTypes'
import { APP_ROUTES, isAppRouteActive } from '@shared/constants/routes'
import { interpretPropertySearch } from '@properties/services/propertySearchService'
import {
  getAvailableCities,
  getAvailableRegions,
  PropertiesFilters,
  SortOrder,
  toAdvertisementList,
} from '@properties/pages/Properties/PropertiesModel'
import { getAllAdvertisements } from '@properties/services/advertisementService'
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
  if (Platform.OS !== 'web' && Constants.appOwnership === 'expo') return null

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
  const routeParams = useLocalSearchParams<{
    city?: string | string[]
    maxPrice?: string | string[]
    minBedrooms?: string | string[]
    region?: string | string[]
    searchTerm?: string | string[]
    sortOrder?: string | string[]
    type?: string | string[]
  }>()
  const isFavoritesRoute = isAppRouteActive(pathname, APP_ROUTES.favoritos)
  const isPropertiesListRoute = isAppRouteActive(pathname, APP_ROUTES.imoveis)
  const isSearchWithinProperties = isFavoritesRoute || isPropertiesListRoute
  const inputRef = useRef<TextInput>(null)
  const lastAppliedFiltersRef = useRef<PropertiesFilters>(getFiltersFromRouteParams(routeParams))
  const [filters, setFilters] = useState<PropertiesFilters>(() => getFiltersFromRouteParams(routeParams))
  const [isExpanded, setIsExpanded] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isInterpretingSearch, setIsInterpretingSearch] = useState(false)
  const [speechError, setSpeechError] = useState<string | null>(null)
  const [countryOptions, setCountryOptions] = useState<{ cities: string[]; regions: string[] }>({
    cities: [],
    regions: [],
  })
  const [searchHistory, setSearchHistory] = useState<SearchHistoryEntry[]>([])
  const latestTranscriptRef = useRef('')
  const submitVoiceSearchRef = useRef(false)
  const handleAiSearchRef = useRef<((transcript: string) => Promise<void>) | null>(null)

  const persistSearchHistory = useCallback(async (entry: SearchHistoryEntry) => {
    const normalizedEntry = {
      ...entry,
      searchTerm: entry.searchTerm.trim(),
    }
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
          const historyEntries = parsedHistory
            .filter((entry): entry is Partial<SearchHistoryEntry> => (
              typeof entry === 'object' && entry !== null && !Array.isArray(entry)
            ))
            .slice(0, SEARCH_HISTORY_LIMIT)
            .map((entry) => ({ ...defaultFilters, ...entry }))
          setSearchHistory(historyEntries)
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
  }, [isSearchWithinProperties, routeParams.city, routeParams.maxPrice, routeParams.minBedrooms, routeParams.region, routeParams.searchTerm, routeParams.sortOrder, routeParams.type, visible])

  const hasActiveFilterState = hasActiveFilters(filters)

  const submitSearch = useCallback((searchFilters: PropertiesFilters) => {
    const normalizedFilters = {
      ...defaultFilters,
      ...searchFilters,
      searchTerm: searchFilters.searchTerm.trim(),
    }

    lastAppliedFiltersRef.current = normalizedFilters
    setFilters(normalizedFilters)

    const params = toQueryParams(normalizedFilters)

    if (hasActiveFilters(normalizedFilters)) void persistSearchHistory(normalizedFilters)

    if (isSearchWithinProperties) {
      router.setParams(params)
    } else {
      router.push({
        pathname: APP_ROUTES.imoveis,
        params,
      })
    }

    onClose()
  }, [isSearchWithinProperties, onClose, persistSearchHistory, router])

  const handleSubmitSearch = useCallback(() => {
    submitSearch(filters)
  }, [filters, submitSearch])

  const handleAiSearch = useCallback(async (transcript: string) => {
    setIsInterpretingSearch(true)
    setSpeechError(null)

    try {
      const interpretedFilters = await interpretPropertySearch({
        transcript,
        cities: countryOptions.cities,
        regions: countryOptions.regions,
      })
      submitSearch({
        ...defaultFilters,
        ...interpretedFilters,
      })
    } catch (error) {
      console.error('Falha ao interpretar a pesquisa por voz', error)
      setSpeechError(error instanceof Error
        ? error.message
        : 'Não foi possível interpretar a pesquisa por voz.')
    } finally {
      setIsInterpretingSearch(false)
    }
  }, [countryOptions.cities, countryOptions.regions, submitSearch])

  handleAiSearchRef.current = handleAiSearch

  useEffect(() => {
    if (!visible) return

    const module = getSpeechRecognitionModule()
    if (!module) return

    const startListener = module.addListener('start', () => setIsListening(true))
    const endListener = module.addListener('end', () => {
      setIsListening(false)
      if (!submitVoiceSearchRef.current) return

      submitVoiceSearchRef.current = false
      const transcript = latestTranscriptRef.current.trim()
      if (!transcript) {
        setSpeechError('Não foi possível reconhecer uma pesquisa. Tente novamente.')
        return
      }

      void handleAiSearchRef.current?.(transcript)
    })
    const resultListener = module.addListener('result', (event) => {
      const transcript = event.results[0]?.transcript?.trim()
      if (!transcript) return

      latestTranscriptRef.current = transcript
      setFilters((currentFilters) => ({ ...currentFilters, searchTerm: transcript }))
    })
    const errorListener = module.addListener('error', (event) => {
      submitVoiceSearchRef.current = false
      setSpeechError(event.message ?? 'Não foi possível reconhecer sua fala.')
      setIsListening(false)
    })

    return () => {
      submitVoiceSearchRef.current = false
      startListener.remove()
      endListener.remove()
      resultListener.remove()
      errorListener.remove()
      module.stop()
    }
  }, [visible])

  const handleClose = useCallback(() => {
    inputRef.current?.blur()
    onClose()
  }, [onClose])

  const handleSelectSearchHistory = useCallback((entry: SearchHistoryEntry) => {
    setFilters(entry)
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
  }, [isSearchWithinProperties, onClose, router])

  const handleVoiceSearch = useCallback(async (shouldStart = !isListening) => {
    const module = getSpeechRecognitionModule()

    if (!module) {
      setSpeechError('O reconhecimento de fala não está disponível neste navegador ou dispositivo.')
      return
    }

    if (!module.isRecognitionAvailable()) {
      setSpeechError('O reconhecimento de fala não está disponível neste navegador ou dispositivo.')
      return
    }

    if (!shouldStart) {
      try {
        module.stop()
      } catch (error) {
        console.error('Erro ao parar o reconhecimento de voz', error)
        submitVoiceSearchRef.current = false
        setSpeechError('Não foi possível encerrar a pesquisa por voz.')
        setIsListening(false)
      }
      return
    }

    try {
      const permission = await module.requestPermissionsAsync()
      if (!permission.granted) {
        setSpeechError('Permissão de microfone negada. Habilite o acesso para usar a pesquisa por voz.')
        return
      }

      setSpeechError(null)
      latestTranscriptRef.current = ''
      submitVoiceSearchRef.current = true
      setFilters((currentFilters) => ({ ...currentFilters, searchTerm: '' }))
      setIsListening(true)
      module.start({
        lang: 'pt-BR',
        continuous: false,
        interimResults: true,
      })
    } catch (error) {
      console.error('Erro ao iniciar reconhecimento de voz', error)
      submitVoiceSearchRef.current = false
      setSpeechError('Não foi possível iniciar a pesquisa por voz.')
      setIsListening(false)
    }
  }, [isListening])

  const resetFilters = useCallback(() => {
    setFilters((currentFilters) => ({
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
  }, [router])

  return {
    filters,
    setFilters,
    isExpanded,
    setIsExpanded,
    isListening,
    isInterpretingSearch,
    speechError,
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
