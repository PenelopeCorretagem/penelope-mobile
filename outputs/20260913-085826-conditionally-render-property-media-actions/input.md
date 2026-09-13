# Entrada

- Run ID: 20260913-085826-conditionally-render-property-media-actions
- Criado em: 2026-09-13T08:58:26-03:00
- Status: recebido

## Tarefa recebida

Exibir botoes de galeria, planta e video apenas quando houver midia correspondente

## Objetivo e escopo

Exibir os botões de galeria, planta e vídeo em PropertyDetails apenas quando
existir mídia correspondente.

## Critérios de aceite

- Galeria aparece somente quando `images.length > 0`.
- Planta aparece somente quando `plans.length > 0`.
- Vídeo aparece somente quando `videos.length > 0`.
- `npm run typecheck` passa.

## Restrições, suposições e fora do escopo

- Manter os handlers e as rotas existentes.
- Não alterar o carregamento de mídia.
