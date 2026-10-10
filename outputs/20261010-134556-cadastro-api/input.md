# Entrada

- Run ID: 20261010-134556-cadastro-api
- Criado em: 2026-10-10T13:45:56-03:00
- Status: concluido

## Tarefa recebida

Expor cadastro de usuário na API e integrar o formulário mobile ao endpoint real.

## Objetivo e escopo

Adicionar cadastro real de conta na API e integrar a tela Cadastro do app ao endpoint.
Status: concluido.

## CritÃ©rios de aceite

- API documenta `POST /v1/auth/register`, recebe `name`, `birthDate`, `email` e `password`, e retorna `201` com dados públicos do usuário criado.
- App recebe a data em input textual com máscara `DD/MM/AAAA`, valida o valor, converte para ISO, exibe erros e bloqueia envios duplicados durante o processamento.
- Senha é codificada; e-mail existente não cria outra conta.
- `npm run typecheck` e testes relevantes do backend passam.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Não enviar `confirmSenha` à API; ela existe apenas para validação local.
- Preservar alterações preexistentes nos dois repositórios. Branch atual: `development` (app) e `main` (API); sugestão: `feature/register-account`.
- Não alterar autenticação automática; após cadastro, redirecionar para login.
