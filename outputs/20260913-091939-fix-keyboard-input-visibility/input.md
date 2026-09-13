# Entrada

- Run ID: 20260913-091939-fix-keyboard-input-visibility
- Criado em: 2026-09-13T09:19:39-03:00
- Status: planejado

## Tarefa recebida

Corrigir o teclado cobrindo o input focado nas telas com formulários

## Objetivo e escopo

Garantir que o campo de texto focado permaneça visível acima do teclado virtual
nas telas de conta, senha, recuperação de senha, autenticação e contato.
O escopo inclui os containers de formulário e os componentes de input já
existentes; não inclui troca de biblioteca de navegação ou redesign.

## CritÃ©rios de aceite

- Ao focar campos baixos, a tela rola para que o conteúdo não fique coberto pelo teclado.
- O comportamento continua funcionando em Android e iOS sem quebrar o envio dos formulários.
- `npm run typecheck` passa.

## RestriÃ§Ãµes, suposiÃ§µes e fora do escopo

- Reutilizar React Native e os componentes existentes, sem nova dependência.
- A rolagem até o fim do formulário é aceitável para garantir a visibilidade do campo focado.
- Não alterar contratos de API, rotas ou regras de validação.
- Branch atual: `detalhes-imovel`.
