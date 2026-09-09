export type TipoImagem = {
  id: number
  descricao: 'Imagem' | 'Planta' | 'Vídeo'
}

export type ImagemEmpreendimento = {
  id: number
  fk_empreendimento: number
  fk_tipo_imagem: number
  url: string
  tipoImagem?: TipoImagem
}
