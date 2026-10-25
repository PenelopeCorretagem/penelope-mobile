# Entrada

- Run ID: 20261010-133614-prevent-fake-registration-success
- Criado em: 2026-10-10T13:36:14-03:00
- Status: recebido

## Tarefa recebida

Stop reporting registration success without backend request and document missing API endpoint

## Objetivo e escopo

Impedir que a tela informe cadastro concluído sem envio ao backend. Investigar o OpenAPI real na porta 8080; se a API não publicar contrato de criação de conta, exibir um erro explícito e registrar a rota como bloqueio para integração, sem inventar endpoint.

## Critérios de aceite

- O botão não pode exibir sucesso sem resposta bem-sucedida do backend.
- Sem endpoint de cadastro disponível no contrato, o app deve informar que o cadastro não foi enviado.
- A falha deve ficar visível na tela.
- `npm run typecheck` ou alternativa documentada deve validar os arquivos TypeScript.

## Restrições, suposições e fora do escopo

- A porta do backend é 8080.
- O OpenAPI acessível em `http://localhost:8080/api/v3/api-docs` lista rotas de auth, mas não lista criação de conta; não presumir que `/v1/auth/register` exista.
- Não implementar chamada para endpoint inventado. Para integrar, é necessário contrato/path e payload do backend.
- Preservar outras alterações locais preexistentes.
- Branch atual: `development`; não trocar de branch.
