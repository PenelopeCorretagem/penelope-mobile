import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ImagemEmpreendimento } from '@dtos/ImagemEmpreendimento'
import { getImagemEmpreendimentoByAdvertisementId } from '@service-penelopec/imagemEmpreendimentoService'
import { getRouteId } from './PropertDeytailsModel'

type ImagensState = {
  imagens: ImagemEmpreendimento[]
  plantas: ImagemEmpreendimento[]
  videos: ImagemEmpreendimento[]
  isLoading: boolean
  error: string | null
}

const initialState: ImagensState = {
  imagens: [],
  plantas: [],
  videos: [],
  isLoading: true,
  error: null,
}

export function usePropertDeytailsImagens() {
  const params = useLocalSearchParams()
  const routeId = getRouteId(params.id)
  const [state, setState] = useState<ImagensState>(initialState)

  useEffect(() => {
    if (!routeId) {
      setState(prev => ({ ...prev, isLoading: false, error: 'ID inválido' }))
      return
    }

    const loadImagens = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }))
        const result = await getImagemEmpreendimentoByAdvertisementId(routeId)
        setState(prev => ({
          ...prev,
          imagens: result.imagens,
          plantas: result.plantas,
          videos: result.videos,
          isLoading: false,
        }))
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Erro ao carregar imagens',
        }))
      }
    }

    loadImagens()
  }, [routeId])

  return state
}
