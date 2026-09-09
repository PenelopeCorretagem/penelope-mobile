# Imagens do Empreendimento - Sistema de Mock

## Estrutura do Mock

O sistema de imagens do empreendimento foi configurado com as seguintes tabelas no `mocks/db.json`:

### Tabela: `tipo_imagem`
Define os tipos de mídia disponíveis:
```json
{
  "id": 1,
  "descricao": "Imagem"  // "Imagem", "Planta" ou "Vídeo"
}
```

### Tabela: `imagem_empreendimento`
Armazena as imagens associadas aos empreendimentos:
```json
{
  "id": 1,
  "fk_empreendimento": 1001,      // ID da propaganda (advertisement)
  "fk_tipo_imagem": 1,             // Referência para tipo_imagem.id
  "url": "https://..."             // URL da imagem, planta ou vídeo
}
```

## Tipos TypeScript

### `TipoImagem`
```typescript
type TipoImagem = {
  id: number
  descricao: 'Imagem' | 'Planta' | 'Vídeo'
}
```

### `ImagemEmpreendimento`
```typescript
type ImagemEmpreendimento = {
  id: number
  fk_empreendimento: number
  fk_tipo_imagem: number
  url: string
  tipoImagem?: TipoImagem  // Enriquecido após busca
}
```

Localização: `src/types/ImagemEmpreendimento.ts`

## Serviço: `imagemEmpreendimentoService`

Localização: `src/services/imagemEmpreendimentoService.ts`

### Função: `getImagemEmpreendimentoByAdvertisementId(advertisementId: number)`

Busca todas as imagens, plantas e vídeos de um empreendimento específico.

**Retorno:**
```typescript
{
  imagens: ImagemEmpreendimento[]      // Apenas tipo "Imagem"
  plantas: ImagemEmpreendimento[]      // Apenas tipo "Planta"
  videos: ImagemEmpreendimento[]       // Apenas tipo "Vídeo"
}
```

**Exemplo:**
```typescript
const { imagens, plantas, videos } = await getImagemEmpreendimentoByAdvertisementId(1001)

imagens.forEach(img => console.log(img.url))  // URLs das imagens
plantas.forEach(p => console.log(p.url))      // URLs das plantas
videos.forEach(v => console.log(v.url))       // URLs dos vídeos
```

### Função: `getAllImagemEmpreendimento()`

Busca todas as imagens do banco (sem filtro por empreendimento).

**Retorno:** `ImagemEmpreendimento[]`

## Hook: `usePropertDeytailsImagens`

Localização: `src/modules/properties/pages/PropertDeytails/usePropertDeytailsImagens.ts`

Hook customizado que gerencia o estado de carregamento de imagens para a tela de detalhes.

**Retorno:**
```typescript
{
  imagens: ImagemEmpreendimento[]
  plantas: ImagemEmpreendimento[]
  videos: ImagemEmpreendimento[]
  isLoading: boolean
  error: string | null
}
```

**Exemplo de uso:**
```typescript
export function GaleriaView() {
  const { imagens, plantas, videos, isLoading, error } = usePropertDeytailsImagens()

  if (isLoading) return <ActivityIndicator />
  if (error) return <Alert message={error} />

  return (
    <>
      <Text>{imagens.length} imagens</Text>
      <Text>{plantas.length} plantas</Text>
      <Text>{videos.length} vídeos</Text>
    </>
  )
}
```

## Dados de Exemplo

O mock já contém dados para os 4 empreendimentos de exemplo:

- **Empreendimento 1001** (Cobertura Duplex):
  - 3 imagens
  - 1 planta
  - 1 vídeo

- **Empreendimento 1002** (Casa em Condomínio):
  - 2 imagens
  - 1 planta

- **Empreendimento 1003** (Sala Comercial):
  - 1 imagem
  - 1 planta

- **Empreendimento 1004** (Casa com Acessibilidade):
  - 2 imagens
  - 1 planta

## Integração com a Tela de Detalhes

Para integrar com a tela `PropertDeytailsView`, basta usar o hook:

```typescript
import { usePropertDeytailsImagens } from './usePropertDeytailsImagens'

export function PropertDeytailsView() {
  const { imagens, plantas, videos } = usePropertDeytailsImagens()

  return (
    <ScrollView>
      {/* ... outras seções ... */}

      {/* Galeria de imagens */}
      <Section>
        <Heading>Galeria ({imagens.length})</Heading>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {imagens.map(img => (
            <Image key={img.id} source={{ uri: img.url }} style={{ width: 200, height: 150 }} />
          ))}
        </ScrollView>
      </Section>

      {/* Plantas */}
      {plantas.length > 0 && (
        <Section>
          <Heading>Plantas ({plantas.length})</Heading>
          {plantas.map(planta => (
            <Image key={planta.id} source={{ uri: planta.url }} />
          ))}
        </Section>
      )}

      {/* Vídeos */}
      {videos.length > 0 && (
        <Section>
          <Heading>Vídeos ({videos.length})</Heading>
          {videos.map(video => (
            <Text key={video.id}>{video.url}</Text>
          ))}
        </Section>
      )}
    </ScrollView>
  )
}
```

## Iniciar o Mock Server

```bash
npm run mock:api
```

Ou com Expo Dev:
```bash
npm run dev:mock
```

A API estará disponível em `http://localhost:3001`

## Endpoints Disponíveis

- `GET /tipo_imagem` - Lista todos os tipos de imagem
- `GET /imagem_empreendimento` - Lista todas as imagens
- `GET /imagem_empreendimento?fk_empreendimento=1001` - Imagens de um empreendimento específico
- `POST /imagem_empreendimento` - Criar nova imagem
- `PATCH /imagem_empreendimento/:id` - Atualizar imagem
- `DELETE /imagem_empreendimento/:id` - Deletar imagem
