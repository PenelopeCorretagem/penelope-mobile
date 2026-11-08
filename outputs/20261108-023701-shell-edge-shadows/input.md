# Entrada

- Run ID: 20261108-023701-shell-edge-shadows
- Data: 2026-11-08
- Status: concluído
- Branch atual: main

## Tarefa

Adicionar sombreamento sutil na parte inferior do Header e na parte superior
da TabBar, destacando visualmente as áreas fixas do shell enquanto o conteúdo
é rolado.

## Critérios de aceite

1. O Header possui sombra inferior visível, sem alterar sua altura ou ações.
2. A TabBar possui sombra superior visível, sem alterar navegação ou itens.
3. O efeito é consistente em plataformas React Native/web e usa estilos já
   suportados pelo projeto.
4. Não há alteração de rotas, labels, comportamento ou arquitetura.
5. TypeScript alternativo passa.

## Restrições

- Alterar apenas `HeaderView.tsx` e `src/app/(private)/(tabs)/_layout.tsx`.
- Não adicionar dependências.
- Preservar alterações preexistentes.
