# Execucao

- Status: concluido

## Alteracoes

- `src/shared/infrastructure/apiClient.ts`: removido fallback por IP fixo; URL ausente ou sem o sufixo `/api` agora gera erro de configuracao claro.
- `src/services/propertyMediaService.ts`: chamadas de midia migradas para `apiRequest`; paths preservados e query montada com `URLSearchParams`.
- `.env.example`: esclarecidos o context path, o host de dispositivo fisico e o tratamento da chave publica.
- `.gitignore`: `.env` local adicionado ao ignore; arquivo local existente preservado.
- `outputs/20261010-123642-centralize-api-configuration/`: registrados entrada, plano, execucao, revisao e resumo.

Alteracao local anterior em `apiClient.ts` que definia o IP de fallback foi substituida pela resolucao obrigatoria via ambiente, conforme o escopo desta tarefa. Outras alteracoes preexistentes foram preservadas.

## Comandos e resultados

- `git status --short --branch`: branch `development`; confirmou alteracoes preexistentes em `package.json`, `package-lock.json` e `authTokenStorage.ts`. O `.env` local permanece no workspace e agora e ignorado.
- `npm run typecheck`: bloqueado por TS5101 em `tsconfig.json:5` (`baseUrl` existente; TypeScript instalado informa deprecacao com erro).
- `npx tsc --noEmit --ignoreDeprecations 6.0`: passou sem saida.
- Busca por `fetch`, bases de API e IPs: restou somente `fetch` centralizado em `apiClient.ts`; nenhum host fixo remanescente nos services.
- Diagnosticos do editor em `apiClient.ts` e `propertyMediaService.ts`: nenhum erro.

## Desvios, falhas e bloqueios

- O typecheck padrao continua bloqueado pela deprecacao preexistente de `baseUrl`; `tsconfig.json` nao foi alterado por estar fora do escopo.
- Os controllers do backend nao foram fornecidos; existencia e forma dos endpoints legados `/imagem_empreendimento` e `/tipo_imagem` precisam de confirmacao de contrato.
