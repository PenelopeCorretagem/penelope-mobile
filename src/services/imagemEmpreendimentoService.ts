import { ImagemEmpreendimento, TipoImagem } from '@dtos/ImagemEmpreendimento'

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3001'

export async function getImagemEmpreendimentoByAdvertisementId(
  advertisementId: number
): Promise<{ imagens: ImagemEmpreendimento[]; plantas: ImagemEmpreendimento[]; videos: ImagemEmpreendimento[] }> {
  try {
    const imagensResponse = await fetch(`${API_BASE_URL}/imagem_empreendimento?fk_empreendimento=${advertisementId}`)
    const tiposResponse = await fetch(`${API_BASE_URL}/tipo_imagem`)

    if (!imagensResponse.ok || !tiposResponse.ok) {
      throw new Error('Failed to fetch images or types')
    }

    const imagensData: ImagemEmpreendimento[] = await imagensResponse.json()
    const tiposData: TipoImagem[] = await tiposResponse.json()

    const tiposMap = new Map(tiposData.map(tipo => [tipo.id, tipo]))

    const enrichedImagens = imagensData.map(imagem => ({
      ...imagem,
      tipoImagem: tiposMap.get(imagem.fk_tipo_imagem),
    }))

    const imagens = enrichedImagens.filter(img => img.tipoImagem?.descricao === 'Imagem')
    const plantas = enrichedImagens.filter(img => img.tipoImagem?.descricao === 'Planta')
    const videos = enrichedImagens.filter(img => img.tipoImagem?.descricao === 'Vídeo')

    return { imagens, plantas, videos }
  } catch (error) {
    console.error('Error fetching advertisement images:', error)
    throw new Error('Falha ao carregar imagens do imóvel')
  }
}

export async function getAllImagemEmpreendimento(): Promise<ImagemEmpreendimento[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/imagem_empreendimento`)

    if (!response.ok) {
      throw new Error('Failed to fetch images')
    }

    const data: ImagemEmpreendimento[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching all images:', error)
    throw new Error('Falha ao carregar imagens')
  }
}
