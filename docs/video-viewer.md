# Visualização de Vídeos - Tela de Detalhes do Imóvel

## Visão Geral

O sistema de vídeos foi implementado como um redirecionamento direto para o link do vídeo. Quando o usuário clica no botão **"Assistir Vídeo"**, ele é redirecionado diretamente para o endereço do vídeo (geralmente YouTube ou outro provedor).

## Funcionalidade

### Botão "Assistir Vídeo"
- Localizado na seção de ações (junto com Galeria e Planta)
- Exibe a contagem de vídeos disponíveis: `Assistir Vídeo (N)`
- Fica desabilitado se não houver vídeos
- Ao clicar, abre o primeiro vídeo do array `videos[0].url`

### Comportamento
```typescript
// Ao clicar no botão:
onPress={() => {
  if (videos.length > 0) {
    Linking.openURL(videos[0].url)  // Abre URL externa
      .catch(err => console.error('Failed to open video:', err))
  }
}}
```

## Fluxo de Funcionamento

1. **Hook carrega dados:** `usePropertDeytailsImagens()`
   - Busca todas as imagens do empreendimento
   - Separa em: imagens, plantas, vídeos

2. **PropertDeytailsView renderiza:**
   - Exibe botão "Assistir Vídeo" com contagem
   - Desabilita botão se `videos.length === 0`

3. **Interação do usuário:**
   - Clique no botão "Assistir Vídeo"
   - App abre URL externa (YouTube, Vimeo, etc)
   - Usuário assiste ao vídeo no app nativo (YouTube, navegador, etc)

## Dados do Mock

Tabela: `imagem_empreendimento` (com `fk_tipo_imagem: 3` para vídeos)

```json
{
  "id": 5,
  "fk_empreendimento": 1001,
  "fk_tipo_imagem": 3,
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

## URLs Suportadas

O app abre qualquer tipo de URL:
- **YouTube**: `https://www.youtube.com/watch?v=ID` ou `https://youtu.be/ID`
- **Vimeo**: `https://vimeo.com/ID`
- **Vídeos em arquivo**: `https://example.com/video.mp4`
- **Qualquer link de vídeo**: URLs customizadas, streaming, etc

## Dependências

A funcionalidade usa apenas:
- `Linking` do React Native (já disponível)
- Hook `usePropertDeytailsImagens` para carregar dados

**Não requer:**
- `react-native-webview`
- Componentes adicionais
- Configuração especial

## Implementação na PropertDeytailsView

```typescript
<Pressable
  onPress={() => {
    if (videos.length > 0) {
      Linking.openURL(videos[0].url)
        .catch(err => console.error('Failed to open video:', err))
    }
  }}
  style={[styles.actionButtonFull, styles.actionButtonFilled]}
  disabled={videos.length === 0}
>
  <Ionicons name="videocam" size={18} color={colors.white} />
  <Text style={styles.actionButtonTextFilled}>Assistir Vídeo ({videos.length})</Text>
</Pressable>
```

## Estados do Botão

| Estado | Comportamento |
|--------|---------------|
| `videos.length > 0` | Ativo, abre primeiro vídeo |
| `videos.length === 0` | Desabilitado (disabled) |

## Exemplo de Uso

```typescript
// No mock:
{
  "id": 5,
  "fk_empreendimento": 1001,
  "fk_tipo_imagem": 3,
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}

// Na tela de detalhes:
const { videos } = usePropertDeytailsImagens()
// videos = [{ id: 5, url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", ... }]

// Ao clicar no botão:
// → Abre: https://www.youtube.com/watch?v=dQw4w9WgXcQ
// → No app nativo do YouTube ou navegador
```

## Tratamento de Erros

Se o `Linking.openURL` falhar (URL inválida, app não instalado, etc):

```typescript
.catch(err => console.error('Failed to open video:', err))
```

## Vantagens desta Abordagem

✅ **Simples**: Sem componentes adicionais complexos
✅ **Leve**: Menor impacto na performance do app
✅ **Flexível**: Funciona com qualquer provedor de vídeo
✅ **Nativo**: Usa player nativo do dispositivo (YouTube app, navegador, etc)
✅ **Sem dependências extras**: Usa apenas Linking do React Native

## Limitações

⚠️ Apenas abre o **primeiro vídeo** do array
- Solução: Se houver múltiplos vídeos, considerar navegação para tela dedicada

⚠️ Abre **URL externa** (sai do app)
- Necessário ter YouTube app ou navegador instalado

⚠️ Sem **preview** de vídeo na tela de detalhes
- O usuário não vê informações antes de clicar

## Futuras Melhorias (se necessário)

- [ ] Exibir todos os vídeos (com suporte a múltiplos)
- [ ] Preview com thumbnail do YouTube
- [ ] Tela dedicada para vídeos (como Galeria e Planta)
- [ ] Player integrado via WebView
- [ ] Descrição ou título do vídeo na tela

## Troubleshooting

### Botão não funciona
- Verificar se `videos.length > 0`
- Verificar se URL é válida
- Verificar se YouTube app ou navegador está instalado

### URL não abre
- Verificar URL no mock
- Verificar se é uma URL válida e acessível
- Testar URL manualmente no navegador

### Erro em console
- Verificar `.catch()` error message
- Validar formato da URL

