# Planejamento

- Status: aprovado

## Contexto e módulo

- Componente compartilhado `AlertView`, usado em apresentação modal.
- A tela de tendências já controla a reexibição; esta tarefa altera somente a
  apresentação do modal.

## Plano de implementação

1. Criar uma paleta modal por variante para reaproveitar cores de ícone, faixa e
   fundo.
2. Reorganizar o card com faixa de destaque, cabeçalho com ícone e fechamento,
   eyebrow, título, mensagem alinhada à esquerda e botão de largura confortável.
3. Preservar dismissal externo, botão `Entendi`, loading e acessibilidade.

## Validação e riscos

- Executar `npm run typecheck`, workaround TypeScript conhecido e `git diff
  --check`.
- Como o componente é compartilhado, verificar que as variantes `error`,
  `success` e `info` continuam tipadas e com estilos válidos.
