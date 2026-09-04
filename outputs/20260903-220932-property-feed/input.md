# Entrada

- Run ID: 20260903-220932-property-feed
- Criado em: 2026-09-03T22:09:32-03:00
- Status: planejado

## Tarefa recebida

Transformar a tela de imóveis em feed vertical contínuo com carrossel de imagens nos anúncios.

## Objetivo e escopo

Remover a apresentação por categorias, exibir todos os anúncios filtrados em uma lista vertical contínua, carregar os itens progressivamente no scroll e dar ao card uma hierarquia visual focada na imagem. Cada card terá carrossel horizontal quando houver múltiplas imagens.

## Critérios de aceite

- A tela não exibe títulos ou seções separadas por tipo.
- Os anúncios filtrados aparecem em uma lista vertical única, com lote progressivo ao chegar ao fim.
- O card ocupa quase a largura e altura disponíveis, deixa o próximo item parcialmente sugerido e prioriza a imagem.
- A label continua identificando o tipo do imóvel.
- Não há tratamento visual de destaque na listagem.
- Múltiplas imagens podem ser deslizadas horizontalmente e exibem indicadores discretos.
- O `npm run typecheck` passa.

## Restrições, suposições e fora do escopo

- Manter o carregamento atual da API e os filtros existentes.
- O carregamento progressivo usa os anúncios já obtidos pela API, pois o service atual não expõe paginação remota.
- Preservar MVVM, aliases existentes e componentes usados fora desta tela.
- Não alterar rotas ou criar dependências.
