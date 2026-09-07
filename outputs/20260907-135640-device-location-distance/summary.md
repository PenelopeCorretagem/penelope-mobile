# SaÃ­da

- Status final: concluído

## Entregas

Foi implementado o uso de localização foreground no mobile, com distância em quilômetros nos cards, ordenação padrão por proximidade e filtro com distância, A a Z e Z a A. A implementação tolera permissão negada e dados sem coordenadas.

## Validações

`npm run typecheck`, `npm ls expo-location --depth=0` e `npx expo config --type public` foram aprovados.

## Pendências e próximo passo

Validar em development build Android/iOS, pois a permissão de localização depende do runtime nativo e não pode ser confirmada no typecheck/web.

