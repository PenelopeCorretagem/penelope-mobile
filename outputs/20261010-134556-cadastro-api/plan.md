# Planejamento

- Status: concluido

## Contexto e mÃ³dulo

Status: aprovado.

- Módulo responsável: `auth` no app e na API.
- Evidência: `AuthController` ainda só expõe login/recuperação; `User` já persiste nome, e-mail, nascimento, senha e nível de acesso; `UserRepository` já fornece `save`.
- Reuso: `apiRequest`, `API_ROUTES`, validações de `CadastroModel`, `PasswordEncoder` e `AuthErrorCode.EMAIL_ALREADY_IN_USE`.
- O estado local do app já continha alterações no cadastro e no cliente HTTP; serão preservadas.

## Plano de implementaÃ§Ã£o

1. Criar request/response de cadastro, validação da entrada, criação de usuário CLIENTE e rota `POST /v1/auth/register` com `201 Created`.
2. Adicionar o caminho e chamada no service mobile; converter `DD/MM/YYYY` para `YYYY-MM-DD` no limite do ViewModel.
3. Substituir o bloqueio simulado no ViewModel por envio real, loading/erro e retorno ao login; trocar o calendario por input numerico com mascara e validar datas.
4. Cobrir criação, codificação da senha e e-mail duplicado no teste do serviço de autenticação.
5. Executar teste backend focado, `npm run typecheck` e validar os artefatos da execução.

Contrato público: `POST /api/v1/auth/register` (a URL-base do app já inclui `/api`); payload JSON `{ "name": "Nome completo", "birthDate": "YYYY-MM-DD", "email": "email", "password": "mínimo 6 caracteres" }`; resposta `201` JSON `{ "id": number, "name": string, "email": string, "birthDate": "YYYY-MM-DD", "accessLevel": "CLIENTE" }`.

## ValidaÃ§Ã£o e riscos

- Validar regras e compilação via teste focal de `AuthServiceTest`; validar app com `npm run typecheck`.
- Risco: o date picker emite `DD/MM/YYYY`, enquanto `LocalDate` usa ISO no JSON; transformação explícita no ViewModel evita falha de desserialização.
- Risco: conflitos no banco continuam protegidos pela checagem da aplicação e pela constraint única existente.
