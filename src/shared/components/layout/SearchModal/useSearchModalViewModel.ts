import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Platform, TextInput } from 'react-native'
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router'
import Constants from 'expo-constants'
import { ESTATE_TYPES } from '@constant/estateTypes'
import { APP_ROUTES, isAppRouteActive } from '@constant/routes'
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
      || nextFilters.sortOrder !== 'none',
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
      || nextFilters.sortOrder !== 'none',
    )

    const resolvedFilters = hasRouteFilters ? nextFilters : lastAppliedFiltersRef.current
    lastAppliedFiltersRef.current = resolvedFilters
    setFilters(resolvedFilters)
    setIsExpanded(true)
    setSpeechError(null)

    const timeout = setTimeout(() => {
      inputRef.current?.focus()
    }, 150)

    return () => clearTimeout(timeout)
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

    if (isSearchWithinProperties) {
      router.setParams(params)
    } else {
      router.push({
        pathname: APP_ROUTES.imoveis,
        params,
      })
    }

    onClose()
  }, [filters, isSearchWithinProperties, onClose, router])

  const handleClose = useCallback(() => {
    if (hasActiveFilterState) {
      handleSubmitSearch()
      return
    }

    onClose()
  }, [handleSubmitSearch, hasActiveFilterState, onClose])

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
      sortOrder: 'none',
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
  }
}

export default useSearchModalViewModel
