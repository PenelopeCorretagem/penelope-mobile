# Entrada

- Run ID: 20260913-101529-centralize-property-detail-routes
- Criado em: 2026-09-13T10:15:29-03:00
- Status: planejado

## Tarefa recebida

Ajustar as rotas de galeria e planta para usar APP_ROUTES

## Objetivo e escopo

Centralizar os segmentos de galeria e planta usados na navegação de detalhes de
imóveis em `APP_ROUTES`, removendo strings literais do ViewModel.

## Critérios de aceite

- Os destinos de galeria e planta continuam iguais em runtime.
- O ViewModel não contém os segmentos literais `galeria` ou `planta`.
- `npm run typecheck` passa.

## Restrições, suposições e fora do escopo

- Preservar a API de navegação e o parâmetro dinâmico do imóvel.
- Não alterar telas, serviços ou comportamento de carregamento.
