# Execucao

- Status: concluido

## AlteraÃ§Ãµes

- `src/modules/properties/services/advertisementService.ts`: adicionada leitura de `EXPO_PUBLIC_API_BASE_URL`; fallback para `localhost:3001` no web e para o IP LAN atual no mobile.
- Outputs da execução preenchidos em `outputs/20260905-203852-fix-advertisement-fetch-web/`.
- Alterações preexistentes em `package.json` foram preservadas.

## Comandos e resultados

- `npm run typecheck`: aprovado.
- `Invoke-WebRequest http://localhost:3001/advertisements?active=true&type=LANCAMENTO`: HTTP 200, corpo recebido.
- `npm run mock:api`: a tentativa adicional falhou com `EADDRINUSE` porque a porta 3001 já estava ocupada; o endpoint existente respondeu normalmente.

## Desvios, falhas e bloqueios

- Nenhum bloqueio. A conectividade com o IP fixo original expirou antes da alteração.
