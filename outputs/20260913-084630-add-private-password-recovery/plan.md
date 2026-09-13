# Planejamento

- Status: aprovado

## Contexto e módulo

`PasswordView` vive em `src/modules/settings/submodules/acount` e está sob o
grupo privado `(acount)`, mas usa `APP_ROUTES.auth.recuperar_senha`. A tela
pública de recuperação vive no módulo `auth` e deve continuar separada.

## Plano de implementação

1. Criar `pages/PasswordRecovery` com View e index, usando o mesmo layout e
	Form de Password.
2. Adicionar `APP_ROUTES.recuperacao_senha` e a rota privada correspondente.
3. Alterar apenas o helper de Password para o destino privado.
4. Validar TypeScript e a coexistência dos dois fluxos.

## Validação e riscos

- `npm run typecheck`.
- Busca de referências confirma Login público e Password privado.
- Risco: confundir a rota privada com a pública; mitigado por constantes e
	arquivos de rota distintos.
