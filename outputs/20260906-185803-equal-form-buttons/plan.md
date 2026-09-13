# Plano

1. Atualizar `FormView` para usar alinhamento vertical stretch na linha de ações.
2. Aplicar `flex: 1` ao botão de voltar para igualar a largura do botão principal.
3. Executar `npm run typecheck` e revisar o diff da alteração.

## Escopo arquitetural

Alteração visual em componente reutilizável de `src/shared`; não envolve Model, ViewModel, service, rota ou navegação.

## Risco

Baixo. Os callbacks e a lógica condicional dos botões não serão modificados.
