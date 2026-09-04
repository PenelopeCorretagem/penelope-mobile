# Revisão

- Status: concluído
- Veredito: aprovado para o escopo do bug, com bloqueio de checagem global por erros preexistentes

## Achados

- A rota de imóveis passou a receber a mesma estrutura de params do modal em todas as transições.
- O modal agora distingue entre navegação inicial e atualização da rota atual, evitando perda do estado ao localizar-se em `/imoveis`.
- O estado de filtros continua derivado dos params da URL, o que é o comportamento correto para o fluxo da tela de propriedades.

## Checklist e validações

- [x] Código alterado diretamente no ponto do bug.
- [x] Mantém `APP_ROUTES` como fonte de navegação.
- [x] Não introduziu erros locais no arquivo corrigido.
- [x] `npm run typecheck` executado e registrado.
- [x] Bloqueio global documentado sem esconder falha.
