# Planejamento

- Status: aprovado

## Contexto e modulo

Existem duas arvores concorrentes, `PropertDeytails` e `PropertyDeytails`,
ambas com pastas genericas `views` e `view-models`. As rotas apontam
parcialmente para a segunda arvore, que ainda possui o typo `Deytails`.

## Plano de implementacao

1. Consolidar a arvore principal em `PropertyDetails`, com arquivos diretamente
	no diretorio raiz e nomes internos em ingles.
2. Mover as telas para `PropertyGallery`, `PropertyPlan` e `PropertyVideo`, cada
	uma com `index.tsx` e View local; compartilhar o hook de midia no diretorio
	`PropertyDetails`.
3. Atualizar as quatro rotas do Expo Router para importar os novos indexes.
4. Remover arvores antigas e validar TypeScript, referencias e estrutura.

## Validacao e riscos

- `npm run typecheck` detecta imports e caminhos quebrados.
- Busca textual confirma ausencia de nomes antigos e pastas genericas.
- Risco principal: imports relativos quebrados durante a movimentacao; atualizar
	cada import e rodar typecheck imediatamente.
