# Entrada

- Run ID: 20261023-234934-account-success-alert-redirect
- Criado em: 2026-10-23T23:49:34-03:00
- Status: concluido

## Tarefa recebida

Exibir AlertView de sucesso por 1,5 segundos antes de redirecionar após salvar perfil ou senha.

## Objetivo e escopo

Mostrar AlertView de sucesso por 1,5 segundos antes de redirecionar após salvar dados do perfil ou senha.

## CritÃ©rios de aceite

- Perfil: após salvar com sucesso, manter alerta modal de sucesso por 1,5 s e então abrir Configurações.
- Senha: ao submeter, mostrar o mesmo alerta por 1,5 s e então abrir Configurações.
- Alertas de sucesso não exibem botão de confirmação.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Preservar o tratamento de erro do perfil e a rota centralizada `APP_ROUTES.configuracoes`.
