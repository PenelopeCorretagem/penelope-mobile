# Entrada

- Run ID: 20260911-005706-integrar-api-unificada
- Criado em: 2026-09-11T00:57:06-03:00
- Status: recebido

## Tarefa recebida

Integrar o aplicativo móvel à penelope-mobile-api: autenticação com Bearer token, catálogo de imóveis, perfil autenticado, favoritos e notificações.

## Objetivo e escopo

Substituir os clientes simulados pelos contratos da penelope-mobile-api para autenticacao, catalogo de imoveis, perfil autenticado, favoritos e notificacoes.

## CritÃ©rios de aceite

- O token JWT e persistido com expo-secure-store e enviado em requisicoes autenticadas.
- O login usa POST /v1/auth/login e mantem as validacoes locais.
- Os servicos migrados usam a base configuravel da API unificada.
- A verificacao de tipos termina sem erros.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- EXPO_PUBLIC_API_BASE_URL deve incluir o sufixo /api quando definido.
- Cadastro, contato e upload de imagem de perfil permanecem fora do escopo por nao possuirem contrato de backend nesta etapa.
- Nao persistir credenciais; somente o token de acesso e armazenado.
