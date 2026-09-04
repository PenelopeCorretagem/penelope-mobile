# Planejamento

- Status: concluído

## Contexto e módulo

O SearchModal é um componente compartilhado usado no Header e controlado por filtros de imóveis armazenados em query params. A lógica já estava correta em termos de sincronização com a rota, mas estava concentrada em um único arquivo e o botão de limpar filtros era um Pressable inline, fora do padrão do projeto.

## Plano de implementação

1. Extrair as regras de mapeamento e normalização dos filtros para um model dedicado.
2. Mover a lógica de estado, efeitos, sincronização com a rota e ações do modal para um viewmodel.
3. Manter a View focada na renderização dos grupos de opções, input e botão compartilhado.
4. Substituir o Pressable inline por ButtonView usando a API do componente compartilhado.
5. Validar com npm run typecheck.

## Validação e riscos

- Risco principal: regressão na sincronização entre modal e rota; mitigado preservando a lógica vigente e encapsulando a mesma em um hook.
- Validação: TypeScript do projeto com tsc --noEmit.
- Risco secundário: estilo visual do botão compartilhado divergir; mitigado usando o mesmo padrão de fundo/ação do projeto.
