# Planejamento

- Status: concluído

## Contexto e módulo

Correção no modal de busca global em [src/shared/components/layout/SearchModal/SearchModalView.tsx](../../src/shared/components/layout/SearchModal/SearchModalView.tsx), que alimenta os filtros da tela de propriedades em [src/modules/properties/pages/Properties/usePropertiesViewModel.ts](../../src/modules/properties/pages/Properties/usePropertiesViewModel.ts). O problema era a navegação e a persistência da URL não serem tratadas de forma consistente quando a rota de imóveis já estava ativa.

## Plano de implementação

1. Observar o caminho atual com `usePathname` para detectar quando o modal está aberto sobre `/imoveis`.
2. Transformar os filtros em params de rota de forma consistente, incluindo valores vazios para limpar campos.
3. Usar `router.setParams` quando o usuário já estiver na tela de imóveis, e `router.push` quando vier de outra rota.
4. Revalidar o arquivo alterado e o projeto com `npm run typecheck`.

## Validação e riscos

- Risco baixo: o ajuste é localizado ao modal e à serialização dos filtros.
- Validação principal: confirmar que o arquivo alterado não tem erros de TypeScript e registrar que a checagem global do projeto falha por erros preexistentes em imports de Footer.
