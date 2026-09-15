# Saida

- Status final: concluido

## Entregas

O aplicativo passa a consumir a penelope-mobile-api para login, sessao JWT, catalogo de imoveis, detalhe com midias, perfil, favoritos e notificacoes. O token e armazenado com expo-secure-store e requisicoes protegidas usam Bearer automaticamente.

## Validacoes

- npm ci e npm run typecheck: aprovados.
- Revisao independente: aprovado sem achados bloqueantes apos as correcoes de sessao, midias e favoritos.

## Pendencias e proximo passo

- Configurar EXPO_PUBLIC_API_BASE_URL com /api para dispositivos fisicos.
- Configurar EXPO_PUBLIC_GOOGLE_MAPS_API_KEY para habilitar a imagem estatica do mapa.
- Adicionar testes de service para os novos contratos e remover imagemEmpreendimentoService em tarefa de limpeza dedicada.
