# Entrada

- Run ID: 20260906-190444-cadastro-step-validation
- Status: recebido

## Objetivo e escopo

Corrigir o cadastro para que `Continuar` valide somente os campos da etapa 1 e `Cadastrar` valide todos os campos, incluindo os da etapa 2.

## Critérios de aceite

- Clicar em `Continuar` não grava erros de e-mail ou senha.
- A etapa 1 continua impedindo o avanço quando inválida.
- Campos da etapa 2 não são validados durante a digitação antes do cadastro.
- Clicar em `Cadastrar` valida todos os campos.
- `npm run typecheck` passa.

## Restrições

Alterar somente o ViewModel do cadastro; preservar o fluxo de navegação e os textos existentes.
