# Saída

- Status final: concluído

## Entregas

- O pop-up informativo da IA voltou a ser exibido na tela de tendências.
- O alerta reaparece sempre que a tela recebe foco novamente, após sair para
  outra aba ou rota.
- O fechamento pelo botão `Entendi` continua funcionando.

## Validações

- TypeScript aprovado com `npx tsc --noEmit --ignoreDeprecations 6.0`.
- `git diff --check` aprovado.
- `npm run typecheck` continua bloqueado pelo `TS5101` preexistente de
  `compilerOptions.baseUrl`.

## Pendências e próximo passo

- Nenhuma pendência funcional. A correção da configuração `baseUrl` fica fora
  do escopo desta correção.
