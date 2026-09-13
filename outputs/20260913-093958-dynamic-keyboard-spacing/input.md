# Entrada

- Run ID: 20260913-093958-dynamic-keyboard-spacing
- Criado em: 2026-09-13T09:39:58-03:00
- Status: planejado

## Tarefa recebida

Substituir padding fixo por espaçamento dinâmico baseado na altura do teclado

## Objetivo e escopo

Substituir o espaço fixo usado para revelar o botão acima do teclado por um
padding dinâmico, baseado na altura real do teclado e removido ao fechá-lo.

## Critérios de aceite

- O padding inferior é zero quando o teclado está fechado.
- O padding acompanha `event.endCoordinates.height` enquanto o teclado está aberto.
- Autenticação, conta, senha, recuperação e contato continuam compilando.

## Restrições, suposições e fora do escopo

- Usar eventos nativos do React Native, sem nova dependência.
- Preservar o fluxo atual de foco e rolagem.
- Não alterar regras de negócio, rotas ou serviços.
