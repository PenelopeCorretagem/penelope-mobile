# Planejamento

- Status: concluído

## Contexto e modulo

O modulo responsavel e `src/modules/properties`. `PropertiesModel` concentra filtros e ordenacao; `usePropertiesViewModel` concentra efeitos e estado; `SearchModalModel/View` expoe as opcoes; `AdvertisementCardView` apresenta os dados. A integracao do dispositivo ficara em `src/services`.

## Plano de implementacao

1. Adicionar `expo-location` e configurar a mensagem de permissao no manifesto Expo.
2. Tornar latitude/longitude opcionais no endereco e transportar os campos no normalizador/mock.
3. Adicionar calculo Haversine e ordenacao `distance` no Model.
4. Solicitar localizacao foreground no ViewModel e tratar recusa sem bloquear a tela.
5. Atualizar modal e parametros de rota para `distance`, `asc` e `desc`.
6. Exibir distancia nos cards e registrar a execucao.

## Validacao e riscos

Executar `npm run typecheck` e `validate-run.ps1`. O Model permanece puro, o ViewModel concentra localizacao e a View nao acessa APIs. Enderecos sem coordenadas permanecem suportados.

