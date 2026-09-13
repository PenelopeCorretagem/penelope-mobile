# Plano

1. Limitar `handleNext` aos campos `nomeCompleto` e `dataNascimento`.
2. Evitar validação antecipada dos campos da etapa 2 em `updateField`.
3. Manter `handleSubmit` como ponto de validação completa.
4. Executar `npm run typecheck` e revisar o ViewModel.

## Escopo

`src/modules/auth/pages/Cadastro/useCadastroViewModel.ts`. Sem alterações em rotas, serviços ou componentes visuais.

## Risco

Baixo: a mudança afeta somente quando os erros são calculados e não altera os callbacks de submissão ou navegação.
