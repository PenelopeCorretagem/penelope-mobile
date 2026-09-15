# Planejamento

- Status: em execucao

## Contexto e modulo

O aplicativo Expo consome a penelope-mobile-api no contexto /api. A autenticacao retorna um JWT em POST /v1/auth/login, e os recursos protegidos usam Authorization Bearer.

## Plano de implementacao

1. Criar infraestrutura compartilhada para URL, requisicoes JSON e token seguro.
2. Migrar AuthContext e Login para o contrato real de login.
3. Migrar catalogo, perfil, favoritos e notificacoes mantendo View -> ViewModel -> Service -> Infrastructure.
4. Validar tipos e registrar revisao e pendencias.

## Validacao e riscos

- Executar npm run typecheck apos cada fatia de integracao.
- A URL local de API pode exigir EXPO_PUBLIC_API_BASE_URL em dispositivo fisico.
- A documentacao local declara Expo 54, mas package.json e package-lock.json declaram Expo 57; a dependencia instalada segue o manifesto efetivo.
