# Saida

- Status final: parcial

## Entregas

- Removido o falso sucesso do cadastro: agora o formulário avisa que não enviou os dados enquanto a API não oferecer endpoint de criação.
- Confirmado que o backend atende na porta 8080 e que seu OpenAPI atual não lista rota de cadastro.

## Validacoes

- `npx tsc --noEmit --ignoreDeprecations 6.0`: passou.
- `npm run typecheck`: impedido por TS5101 preexistente relacionado a `baseUrl` no `tsconfig.json`.
- OpenAPI local inspecionado sem risco de executar conteúdo remoto.

## Pendencias e proximo passo

- Para enviar cadastro ao backend, adicionar/publicar no Spring a rota de criação e fornecer método, path, campos do payload e formato da resposta. Depois integrar esse contrato em `API_ROUTES`, service e ViewModel.
