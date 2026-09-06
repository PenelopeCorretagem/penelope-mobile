# Entrada

- Run ID: 20260906-190724-property-details
- Criado em: 2026-09-06T19:07:24-03:00
- Status: planejado
- Branch atual: detalhes-imovel
- Branch sugerida: manter a branch atual; nenhuma troca necessária

## Tarefa recebida

Criar a tela `propertyDetails` para compilar as informações do imóvel e receber o ID do imóvel ao clicar em uma ação ou ícone do card.

## Objetivo e escopo

- Tornar a rota dinâmica de detalhes compatível com o ID usado pelo `AdvertisementCardView`.
- Buscar o anúncio correspondente no endpoint existente `/advertisements`, usando o normalizador compartilhado.
- Implementar a tela de detalhes em MVVM com imagem, título, localização, tipo, área, dormitórios, descrição, diferenciais e preço quando disponíveis.
- Cobrir estados de carregamento, erro e anúncio não encontrado.

## Critérios de aceite

- A ação `Saiba Mais` do card navega para o detalhe com o ID do anúncio.
- A rota dinâmica lê o parâmetro e exibe os dados normalizados do anúncio correto.
- A tela apresenta os campos disponíveis e omite ou sinaliza campos ausentes sem quebrar.
- Loading, erro com retry e não encontrado são estados visíveis.
- View não chama API; ViewModel concentra estado/efeitos/service; Model permanece puro.
- Aliases existentes e `APP_ROUTES` são respeitados; não são criadas strings literais de rota em View/ViewModel.
- `npm run typecheck` passa.
- O run é validado por `validate-run.ps1`.

## Restrições, suposições e fora do escopo

- O serviço não tem endpoint individual; o detalhe filtrará a lista retornada por `/advertisements`.
- `price` será tratado como campo opcional do anúncio, pois pode não existir no contrato normalizado nem nos mocks atuais.
- A rota base `APP_ROUTES.detalhes` permanece `imoveis/detalhes-imovel`; será adicionada apenas a rota dinâmica no diretório real do Expo Router.
- Preservar alterações preexistentes e não alterar shell, filtros ou contratos não relacionados.
- Não adicionar dependências, autenticação nova, edição, contato ou persistência do imóvel.
