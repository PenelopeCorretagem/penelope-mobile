# Saida

- Status final: concluido

## Entregas

- Cadastro real implementado em `POST /api/v1/auth/register`.
- Payload: `{ "name": string, "birthDate": "YYYY-MM-DD", "email": string, "password": string }`.
- Resposta `201 Created`: `{ "id": number, "name": string, "email": string, "birthDate": "YYYY-MM-DD", "accessLevel": "CLIENTE" }`.
- O app submete o cadastro real, mostra falhas e retorna a pessoa ao login apos sucesso.
- Data de nascimento agora e digitada com mascara `DD/MM/AAAA`, sem abrir calendario.

## ValidaÃ§Ãµes

- `npx tsc --noEmit --ignoreDeprecations 6.0`: passou.
- Typecheck repetido apos a mascara da data: passou.
- `get_errors` e `git diff --check`: sem erros relevantes.
- `npm run typecheck`: bloqueado pelo TS5101 preexistente (`baseUrl` deprecated no TypeScript 6).
- Teste Java focal: pendente por ausencia de Maven e Maven Wrapper.

## PendÃªncias e prÃ³ximo passo

- Para executar os testes do backend, disponibilizar Maven e JDK 21; depois rodar `mvn -Dtest=AuthServiceTest test` na raiz da API.
