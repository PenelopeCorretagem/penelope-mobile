# Entrada

- Run ID: 20261010-123642-centralize-api-configuration
- Criado em: 2026-10-10T12:36:42-03:00
- Status: recebido

## Tarefa recebida

Configure o frontend para consumir o backend usando variáveis de ambiente e serviços centralizados

## Objetivo e escopo

Configurar o frontend para consumir o backend Spring usando a URL definida no ambiente, incluindo o context path `/api`, e unificar as chamadas de serviços através da infraestrutura HTTP compartilhada.

Escopo: resolver a URL-base em um único ponto, remover fallback de IP de máquina, migrar chamadas diretas de mídia para o cliente compartilhado, documentar `.env.example` e evitar rastreamento acidental de `.env` local.

## CritÃ©rios de aceite

- Todos os serviços usam `EXPO_PUBLIC_API_BASE_URL` com o prefixo `/api` definido uma única vez.
- Nenhum IP de máquina fica hardcoded como fallback no código.
- Chamadas de mídia passam pelo cliente compartilhado e preservam os endpoints atuais.
- `.env.example` documenta o formato da URL; `.env` local não é rastreado.
- `npm run typecheck` passa.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Preservar alterações locais existentes em `apiClient.ts`, `package.json`, `package-lock.json` e `.env`.
- O contrato do backend fornecido define context path `/api`; portanto, `EXPO_PUBLIC_API_BASE_URL` inclui `/api` e endpoints de service são sufixos sem esse prefixo.
- Não foram fornecidos os controllers/rotas completas do backend; manter os caminhos de endpoint já usados pelo frontend, sem inventar novos.
- Não alterar a navegação do Expo Router; distinguir rotas HTTP de destinos de navegação (`APP_ROUTES`).
- Branch atual: `development`; branch sugerida: sem alteração.
