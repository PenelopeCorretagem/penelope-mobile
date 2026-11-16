# Planejamento revisado

- Status: aprovado

## Contexto e modulo

O defeito esta em `src/shared/components/feedback/Alert/AlertView.tsx`:
`dismissedMessage` e reiniciado quando a mensagem traduzida muda. O alerta e
renderizado por `src/modules/trend-analysis/pages/TrendAnalysis/TrendAnalysisView.tsx`
e usa `t('trend.warning')`. A aba de tendencias permanece registrada no
layout de tabs; a remocao da chave artificial evita uma remontagem por foco,
mas uma remontagem de navegacao exige persistencia explicita.

## Plano de implementacao

1. Manter a prop opcional tipada `persistenceKey` ao `AlertView`.
2. Criar `AlertDismissalContext` em `src/shared/context`, mantendo as chaves
   dispensadas somente na memoria do provider durante a sessao.
3. Prover o contexto no layout raiz e consumi-lo no `AlertView`; remover a
   persistencia em `AsyncStorage` e qualquer tratamento silencioso de falha de
   armazenamento.
4. Manter o fluxo baseado em mensagem para alertas sem `persistenceKey`.
5. Preservar a chave especifica do alerta de tendencias e as alteracoes
   preexistentes, sem alterar tabs.

## Validacao e riscos

Executar `npm run typecheck`, revisar o diff restrito ao contexto, layout e
alerta, e executar `validate-run.ps1`. O estado inicial vazio do contexto
garante a exibicao inicial; como o provider pertence a arvore raiz, remounts de
tela e mudancas de locale preservam a dispensa apenas na sessao ativa.
