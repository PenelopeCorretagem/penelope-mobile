import { useState, useEffect, useCallback } from 'react'
import { getAllAdvertisements } from '@service-penelopec/advertisementService'
import { toAdvertisementList } from '@shared/utils/advertisementNormalizer'
import { HomeModel } from './HomeModel'
import { ESTATE_TYPES } from '@constant/estateTypes'

export function useHomeViewModel() {

  // Model instanciado apenas 1 vez (correto)
  const [homeModel] = useState(() => new HomeModel())
  const [, forceUpdate] = useState(0)

  const refreshUI = useCallback(() => {
    forceUpdate(prev => prev + 1)
  }, [])

  // ======================
  // FETCH: Lançamentos
  // ======================
  const fetchLaunchAdvertisements = useCallback(async () => {
    try {
      const launchAds = await getAllAdvertisements({
        type: ESTATE_TYPES.LANCAMENTO.apiValue,
        active: true
      })

      if (Array.isArray(launchAds)) {
        homeModel.setPreLaunchAdvertisements(toAdvertisementList(launchAds))
      }
    } catch (error) {
      homeModel.setError(error instanceof Error ? error.message : 'Erro ao carregar lançamentos')
    }
  }, [homeModel])



  // ======================
  // FETCH GERAL
  // ======================
  const fetchHomeData = useCallback(async () => {
    homeModel.setLoading(true)
    homeModel.setError(null)
    refreshUI()

    try {
      await fetchLaunchAdvertisements()
    }
    catch (error) {
      homeModel.setError(error instanceof Error ? error.message : 'Erro ao carregar a Home')
    }
    finally {
      homeModel.setLoading(false)
      refreshUI()
    }
  }, [homeModel, fetchLaunchAdvertisements, refreshUI])



  // ======================
  // CARREGA AO MONTAR
  // ======================
  useEffect(() => {
    fetchHomeData()
  }, [fetchHomeData])

  const viewData = {
    isLoading: homeModel.isLoading,
    error: homeModel.error,

    hasFeaturedAdvertisement: !!homeModel.featuredAdvertisement,
    hasLaunchAdvertisements: homeModel.preLaunchAdvertisements.length > 0,

    featureImageCoverUrl: homeModel.featuredAdvertisement?.estate.coverImageUrl ?? null,
    featuredAdvertisement: homeModel.featuredAdvertisement,
    launchAdvertisements: homeModel.preLaunchAdvertisements,

    refresh: fetchHomeData
  }
  return viewData
}
