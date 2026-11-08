# Planejamento

- Status: aprovado

## Contexto

`FilterControl` atualmente alterna ciclicamente para a próxima opção ao tocar
no campo. O `useDashboardViewModel` já concentra os valores e a ação de seleção,
mas ainda não controla qual select está expandido.

## Implementação

1. Adicionar ao ViewModel o estado do filtro expandido e ações para alternar,
   selecionar opção e fechar o select.
2. Alterar `FilterControl` para renderizar o campo e uma lista de opções quando
   expandido, com indicação visual da opção atual.
3. Conectar os dois filtros exibidos na View ao novo estado do ViewModel.
4. Fechar o select ao escolher opção ou limpar filtros.

## Validação e riscos

- Executar `npm run typecheck` e `git diff --check`.
- Verificar acessibilidade dos campos e opções.
- Não alterar o filtro de período que não é renderizado atualmente.
