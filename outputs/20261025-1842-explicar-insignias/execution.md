# Execução

- Adicionadas definições de título, ícone e explicação para Segurança, Área Verde e Transporte.
- As insignias agora usam `Pressable`, incluem ícone de informação e labels de acessibilidade.
- Adicionado modal para exibir a explicação da insignia selecionada.
- `npm.cmd run typecheck`: bloqueado por `TS5101` preexistente sobre `baseUrl`.
- `npx.cmd tsc --noEmit --ignoreDeprecations 6.0`: aprovado.
- Corrigida a origem das insignias: a tela agora consome somente badges concedidas pela API (`granted: true`), com evidências para montar a explicação.
- Removidas as insignias fixas de Segurança e Transporte, pois não há regra/API de concessão para elas no estado atual do projeto.
- As explicações passaram a usar quantidade, raio, distância e nome da evidência quando disponíveis.
- Por decisão de demonstração, as insignias fixas de Segurança, Área Verde e Transporte foram restauradas, sem depender da API.
- As mensagens demonstrativas foram detalhadas para explicar o significado de cada insignia.
