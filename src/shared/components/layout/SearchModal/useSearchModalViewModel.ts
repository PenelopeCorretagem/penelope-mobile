import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Platform, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router'
import Constants from 'expo-constants'
import { PROPERTY_TYPES } from '@constant/propertyTypes'
import { APP_ROUTES, isAppRouteActive } from '@shared/constants/routes'
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
  const routeParams = useLocalSearchParams<{ city?: string | string[]; region?: string | string[]; searchTerm?: string | string[]; sortOrder?: string | string[]; type?: string | string[] }>()
  const isFavoritesRoute = isAppRouteActive(pathname, APP_ROUTES.favoritos)
  const isPropertiesListRoute = isAppRouteActive(pathname, APP_ROUTES.imoveis)
  const isSearchWithinProperties = isFavoritesRoute || isPropertiesListRoute
  const inputRef = useRef<TextInput>(null)
  const lastAppliedFiltersRef = useRef<PropertiesFilters>(getFiltersFromRouteParams(routeParams))
  const [filters, setFilters] = useState<PropertiesFilters>(() => getFiltersFromRouteParams(routeParams))
  const [isExpanded, setIsExpanded] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [speechError, setSpeechError] = useState<string | null>(null)
  const [countryOptions, setCountryOptions] = useState<{ cities: string[]; regions: string[] }>({
    cities: [],
    regions: [],
  })
  const [searchHistory, setSearchHistory] = useState<SearchHistoryEntry[]>([])

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
        if (Array.isArray(parsedHistory)) setSearchHistory(parsedHistory.slice(0, SEARCH_HISTORY_LIMIT))
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
      || nextFilters.sortOrder !== 'distance',
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
      )

      return hasChanged ? resolvedFilters : currentFilters
    })
  }, [isSearchWithinProperties, routeParams.city, routeParams.region, routeParams.searchTerm, routeParams.sortOrder, routeParams.type])

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
      || nextFilters.sortOrder !== 'distance',
    )

    const resolvedFilters = hasRouteFilters ? nextFilters : lastAppliedFiltersRef.current
    lastAppliedFiltersRef.current = resolvedFilters
    setFilters(resolvedFilters)
    setIsExpanded(false)
    setSpeechError(null)
  }, [isSearchWithinProperties, routeParams.city, routeParams.region, routeParams.searchTerm, routeParams.sortOrder, routeParams.type, visible])

  useEffect(() => {
    if (!visible) return

    const module = getSpeechRecognitionModule()
    if (!module) return

    const startListener = module.addListener('start', () => setIsListening(true))
    const endListener = module.addListener('end', () => setIsListening(false))
    const resultListener = module.addListener('result', (event) => {
      const transcript = event.results[0]?.transcript?.trim()
      if (!transcript) return

      setFilters((currentFilters) => ({ ...currentFilters, searchTerm: transcript }))
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
  }, [visible])

  const hasActiveFilterState = hasActiveFilters(filters)

  const handleSubmitSearch = useCallback(() => {
    const normalizedFilters = {
      ...defaultFilters,
      ...filters,
      searchTerm: filters.searchTerm.trim(),
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
  }, [filters, isSearchWithinProperties, onClose, persistSearchHistory, router])

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
    })
  }, [router])

  return {
    filters,
    setFilters,
    isExpanded,
    setIsExpanded,
    isListening,
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
