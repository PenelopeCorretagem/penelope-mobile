# Entrada

- Run ID: 20261010-142316-modernize-form-status-alert
- Criado em: 2026-10-10T14:23:16-03:00
- Status: recebido

## Tarefa recebida

Show form status alerts as centered project-styled popup without red or green colors

## Objetivo e escopo

Apresentar o status do formulário em um pop-up centralizado, moderno e coerente com a paleta do projeto, sem usar vermelho/verde para diferenciar estados.

Escopo: adicionar apresentação modal opcional ao componente Alert e usá-la apenas nos status do FormView; manter outros usos do Alert inline.

## CritÃ©rios de aceite

- Status do formulário aparece no centro da tela como pop-up com fundo de sobreposição.
- Mensagem modal permanece visível por no mínimo 2 segundos antes de aceitar fechamento por botão, toque fora ou botão voltar do Android.
- Durante loading, popup continua sem permitir fechamento.
- Variantes error/success/info usam a paleta de marca existente, sem vermelho ou verde.
- Alertas fora do formulário mantêm o layout inline.
- Typecheck da mudança passa, consideradas as depreciações preexistentes do TypeScript.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Preservar alterações locais recentes em `AlertView`, `FormView`, `AuthScreenView` e fluxo de cadastro.
- Reutilizar `colors` e `spacing` existentes e manter a API atual compatível por padrão inline.
- Não alterar mensagens, variantes ou fluxo de cadastro; limitar a mudança à apresentação visual e ao fechamento do popup.
- Branch atual: `development`; não trocar de branch.
