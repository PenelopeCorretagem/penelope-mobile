# Entrada

- Run ID: 20260915-220939-fix-secure-store-delete
- Criado em: 2026-09-15T22:09:39-03:00
- Status: concluído

## Tarefa recebida

Corrigir falha de deleteItemAsync do expo-secure-store durante hidratação da sessão

## Objetivo e escopo

Usar armazenamento compatível com web no módulo compartilhado de tokens,
mantendo SecureStore no Android e iOS. Não alterar autenticação ou navegação.

## CritÃ©rios de aceite

- Web usa AsyncStorage para leitura, gravação e remoção.
- Nativo continua usando SecureStore.
- A checagem TypeScript passa com o override documentado.
- Os outputs passam na validação do workflow.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- AsyncStorage já é dependência instalada e tem suporte web.
- Tokens web têm garantias diferentes do armazenamento nativo.
- Alterações preexistentes de dependências foram preservadas.
