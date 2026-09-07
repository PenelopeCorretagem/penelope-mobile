# ExecuÃ§Ã£o

- Status: concluído

## Alterações

- Instalado `expo-location` compatível com Expo 57 e configurada a permissão foreground em `app.json`.
- Adicionados latitude/longitude opcionais aos contratos, normalizador e mocks.
- Criado `src/services/locationService.ts` para solicitar permissão e posição atual.
- Adicionado cálculo Haversine, ordenação por distância e fallback para imóveis sem coordenadas.
- Atualizados ViewModel, filtro de busca e cards para distância padrão e opções alfabéticas.

## Comandos e resultados

- `npx expo install expo-location`: concluído; `expo-location@57.0.16` instalado.
- `npm run typecheck`: aprovado.
- `npx expo config --type public`: aprovado; permissões Android coarse/fine geradas e plugin iOS configurado.
- Busca por referências à ordenação `none`: nenhuma encontrada.

## Desvios, falhas e bloqueios

- O backend atual não fornece coordenadas nos contratos antigos; os campos permanecem opcionais e os mocks receberam coordenadas aproximadas por cidade.
- Não foi feita geocodificação externa nem rastreamento contínuo.

