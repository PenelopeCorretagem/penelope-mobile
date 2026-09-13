# Entrada

- Run ID: 20260913-082609-normalize-property-detail-screen-directories
- Criado em: 2026-09-13T08:26:09-03:00
- Status: recebido

## Tarefa recebida

Reorganizar detalhes do imóvel em PropertyDetails, PropertyGallery, PropertyPlan e PropertyVideo, normalizando nomes internos para inglês e preservando rotas em português

## Objetivo e escopo

Consolidar a feature de detalhes do imovel em `PropertyDetails` e separar as
telas em `PropertyGallery`, `PropertyPlan` e `PropertyVideo`, normalizando nomes
internos para ingles e preservando as rotas em portugues.

## Criterios de aceite

- `PropertyDetails` contem index, View, Model e ViewModel diretamente no diretorio.
- `PropertyGallery`, `PropertyPlan` e `PropertyVideo` contem index e View locais.
- Nao existem pastas `views`, `view-models`, `PropertDeytails` ou `PropertyDeytails` ativas.
- Codigo interno usa nomes em ingles; rotas continuam em portugues.
- `npm run typecheck` passa e nao ha imports para nomes antigos.

## Restricoes, suposicoes e fora do escopo

- Preservar comportamento, payloads e rotas publicas.
- Corrigir `Galery` para `Gallery`.
- Nao adicionar dependencias nem alterar a API externa.
- Branch atual: `detalhes-imovel`.
