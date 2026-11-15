# Entrada

- Run ID: 20261114-185635-fix-language-alert-remount
- Criado em: 2026-11-14T18:56:36-03:00
- Status: planejado

## Tarefa recebida

Impedir reabertura do alerta de tendencias apos troca de idioma e retorno de configuracoes.

## Objetivo e escopo

Corrigir a identidade de dispensa do alerta modal de tendencias para que a troca
de idioma nao o reabra e para que a dispensa sobreviva a eventual remontagem
causada pela navegacao. Alterar somente AlertView e seu uso em TrendAnalysisView,
alem dos artefatos desta execucao.

## Criterios de aceite

- O alerta de tendencias aparece inicialmente.
- Apos dispensa-lo, trocar o idioma nao reabre o modal.
- Se a tela for remontada ao voltar pela navegacao, o alerta dispensado nao reaparece.
- Alertas sem a nova opcao mantem o comportamento atual quando a mensagem muda.
- `npm run typecheck` e `validate-run.ps1` passam.

## Restricoes, suposicoes e fora do escopo

- Usar uma API tipada e opcional, sem flag mutavel global.
- Persistir apenas alertas que optarem explicitamente pela identidade estavel; o
  alerta de tendencias sera o unico consumidor.
- Nao alterar estrutura das abas, rotas ou traducoes.
- Branch atual: `feat/i18n`; nenhuma nova branch, commit, issue ou PR.
