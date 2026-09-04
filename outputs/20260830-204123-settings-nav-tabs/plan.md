# Planejamento

- Status: concluído

## Contexto e módulo

A aplicação estava com rotas e aliases apontando para módulos antigos (`institutional`, `contact`), o que quebrou a compilação. O trabalho foi organizado em torno dos módulos atuais: `auth`, `home`, `properties`, `dashboard` e `settings`.

## Plano de implementação

1. Corrigir os aliases e os imports quebrados para a organização atual dos módulos.
2. Ajustar o layout raiz para exibir o bottom tab em vez do header antigo em rotas internas.
3. Implementar a navegação inferior com home, imóveis, dashboard e configurações e os ícones correspondentes.
4. Criar a tela de configurações e a tela de conta seguindo o padrão da aplicação.
5. Atualizar `AGENTS.md` e `docs/development-workflow.md` para refletir os módulos e a nova navegação.
6. Validar com `npm run typecheck` e registrar os resultados.

## Validação e riscos

- Risco principal: imports legado para antigas pastas ainda continuarem espalhados no código.
- Validação: `tsc --noEmit` após as correções.
- Branch sugerida: manter a branch atual e não trocar sem solicitação.
