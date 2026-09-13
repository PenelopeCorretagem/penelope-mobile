# Entrada

- Run ID: 20260913-093618-fix-keyboard-submit-button
- Criado em: 2026-09-13T09:36:18-03:00
- Status: planejado

## Tarefa recebida

Garantir que o botão de envio permaneça acessível acima do teclado

## Objetivo e escopo

Garantir que os botoes de envio permaneçam acessíveis acima do teclado virtual
nas telas de autenticação, conta, senha, recuperação e contato.

## Critérios de aceite

- Os containers possuem espaço rolável abaixo do botão.
- O botão pode ser alcançado enquanto o teclado está aberto.
- `npm run typecheck` passa.

## Restrições, suposições e fora do escopo

- Reutilizar `KeyboardAvoidingView` e `ScrollView` existentes.
- Não adicionar dependências ou alterar regras de envio.
- Branch atual: `detalhes-imovel`.
