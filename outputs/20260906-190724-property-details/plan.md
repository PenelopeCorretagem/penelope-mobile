# Planejamento

- Status: aprovado para execução

## Contexto e módulo

O módulo responsável é `src/modules/properties`. O card já usa `router.push(`${APP_ROUTES.detalhes}/${advertisement.id}`)`, enquanto a rota existente exporta a tela placeholder por `detalhes-imovel.tsx`. O serviço disponível é `getAllAdvertisements`, e a resposta precisa passar por `toAdvertisementList` antes de chegar à View.

## Reuso e decisões

- Reutilizar `Advertisement`, `toAdvertisementList`, `getAdvertisementImageUrls`, `PROPERTY_TYPES`, componentes `Section`, `Text`, `Heading`, `Button` e `Alert`, além dos estilos compartilhados.
- Adicionar `price?: number | string` ao modelo normalizado e ao normalizador para exibição condicional sem exigir o campo no mock.
- Adicionar `getAdvertisementById(id)` ao service, fazendo uma chamada às fontes existentes e filtrando pelo ID normalizado.
- Manter a rota base `imoveis/detalhes-imovel` como `detalhes-imovel/index.tsx` e criar `detalhes-imovel/[id].tsx`, ambos exportando a mesma feature.

## Sequência de implementação

1. Atualizar tipos/normalizador e service para suportar a consulta por ID.
2. Criar `PropertDeytailsModel.ts` com formatação e validação pura do parâmetro.
3. Criar `usePropertDeytailsViewModel.ts` para ler `id`, carregar anúncio, controlar loading/erro/não encontrado e retry.
4. Substituir a View placeholder por uma apresentação com galeria simples, dados principais, diferenciais, preço e estados assíncronos.
5. Criar a rota dinâmica `[id].tsx`, preservando a rota base atual.

## Validação, riscos e pendências

- Rodar `npm run typecheck` imediatamente após a implementação.
- Revisar aliases, direção MVVM, parâmetros de rota e ausência de chamadas HTTP na View.
- Rodar `validate-run.ps1` ao final.
- Risco: APIs/mocks podem omitir `price`, imagens ou diferenciais; a View deve renderizar placeholders condicionais sem falhar.
- Risco: ID inválido ou ausente; tratar como erro de não encontrado sem chamada inválida.
