# Planejamento

- Status: aprovado

## Contexto e módulo

Internacionalização é infraestrutura compartilhada, com recursos em `i18n/` na
raiz e consumo pelas Views existentes. O entry point efetivo é
`expo-router/entry`; o primeiro layout carregado é `src/app/_layout.tsx`.

## Plano de implementação

1. Instalar `i18next`, `react-i18next` e `expo-localization` compatíveis com o
   Expo efetivamente instalado (57).
2. Criar `i18n/index.js` e os dois JSON, normalizando o idioma retornado por
   `getLocales`, suportando `pt`/`en` e usando inglês como fallback.
3. Inicializar o i18n no início de `src/app/_layout.tsx`.
4. Migrar textos fixos de interface nas Views e componentes identificados:
   autenticação, imóveis, configurações, tendências e componentes compartilhados,
   incluindo labels, placeholders, estados, alertas, acessibilidade e abas.
5. Adicionar seleção de idioma na seção Aplicativo de `SettingsView`, chamando
   `i18n.changeLanguage` e refletindo a alteração imediatamente.
6. Usar interpolação para contagens/etapas e `Trans` somente quando houver
   elementos React estilizados na tradução.
7. Conferir chaves correspondentes e executar validações.

## Camadas, reutilização e limites

- `useTranslation`/`Trans` serão usados diretamente nas Views, sem estado global
  paralelo; ViewModels permanecem responsáveis por estado e efeitos.
- Não modificar serviços, APIs, modelos de dados, rotas ou shell.
- Nomes próprios, endereços, dados cadastrados e conteúdo da API permanecem
  dinâmicos e fora das traduções.
- A preferência manual será em memória, pois persistência não foi solicitada.

## Validação e riscos

- Verificar sincronização dos JSON, rodar `npm run typecheck` e revisar
  literais de interface nos arquivos afetados.
- O repositório está em Expo 57, embora a documentação mencione SDK 54; não
  haverá downgrade especulativo.
- JSON será carregado em JavaScript sem alterar aliases ou contratos TypeScript.
