# Execucao 20260905-203852-fix-advertisement-fetch-web

## Data

2026-09-05

## Tarefa recebida

Corrigir os erros `TypeError: Failed to fetch` ao carregar anuncios e opcoes de filtro no web.

## Objetivo e escopo

Tornar a URL da API de anuncios configuravel e selecionar um endpoint local apropriado para o web, preservando o acesso via IP da rede local no mobile.

## Criterios de aceite

- O web usa `http://localhost:3001` por padrao quando o mock local e executado.
- `EXPO_PUBLIC_API_BASE_URL` pode sobrescrever a URL em qualquer plataforma.
- O mobile continua usando o endpoint LAN atual por padrao.
- `npm run typecheck` passa.
- O fluxo de filtros e listagem continua usando o mesmo service e ViewModels.

## Restricoes e suposicoes

- O backend/mock deve estar em execucao para que o fetch responda.
- Nao sera alterado o contrato de `getAllAdvertisements` nem a camada MVVM.
- A falha de conectividade observada foi causada pela URL fixa inacessivel no ambiente web.

## Fora do escopo

- Alterar o backend, CORS ou o formato dos anuncios.
- Criar navegacao, telas ou dependencias novas.

## Branch

- Atual: `feat-home`
- Sugerida: nenhuma; a tarefa sera executada na branch atual sem criar branch.
