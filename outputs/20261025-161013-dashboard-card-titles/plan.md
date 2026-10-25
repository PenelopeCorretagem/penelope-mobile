# Planejamento

- Status: aprovado

## Contexto e módulo

O módulo responsável é `src/modules/dashboard/pages/Trend`. A View renderiza
cada indicador e atualmente posiciona o ícone e o título em linhas separadas.
O Model e o ViewModel não precisam de alterações.

## Plano de implementação

1. Envolver o ícone e o título em uma linha flexível.
2. Ajustar os estilos para alinhar verticalmente os elementos e permitir que o
   título ocupe o espaço restante.
3. Preservar o valor, legenda e estilos de tom existentes.

## Validação e riscos

- Executar `npm run typecheck` e `git diff --check`.
- Verificar que a linha não causa overflow para títulos longos e funciona no
  card compacto e no card amplo.
