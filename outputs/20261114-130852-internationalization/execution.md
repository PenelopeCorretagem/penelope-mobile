# Execução

Status: concluído

## Arquivos e decisões

Criados `i18n/index.js` e `i18n/idiomas/pt.json` e `en.json`. Alterados
`package.json`, `package-lock.json`, `app.json`, `tsconfig.json`, layouts e
Views de autenticação, configurações, propriedades, tendências e componentes
compartilhados de formulário, cabeçalho, busca e card.

`expo-localization` foi instalado via `npx expo install` para SDK 57; `i18next`
e `react-i18next` via npm. A preferência manual alterna pt/en em memória.
Interpolação foi usada para etapas, contagens e distâncias. `Trans` não foi
necessário porque nenhuma tradução migrada exigiu elementos React estilizados.

## Comandos e resultados

- `npx expo install expo-localization`: sucesso; plugin adicionado.
- `npm install i18next react-i18next`: sucesso; npm reportou 21 vulnerabilidades.
- `npm run typecheck`: sucesso.
- Verificação Node de chaves pt/en: sucesso; chaves sincronizadas.
- `validate-run.ps1 -RunDirectory outputs/20261114-130852-internationalization`:
  sucesso (`Output válido`).

## Falhas e pendências

A primeira execução de `npm run typecheck` falhou porque TypeScript 6 exige
`ignoreDeprecations` para o `baseUrl` existente; a opção foi adicionada ao
`tsconfig.json` e a execução seguinte passou. Não foram executados testes de UI
em dispositivo/emulador; não há suíte automatizada configurada.

## Rodada 2 — correções focadas

Status: concluído

Corrigidos somente os achados da revisão:

- `FormView` agora recebe `submittingText`, permitindo textos de carregamento
  específicos para login, cadastro e recuperação de senha.
- `TrendAnalysis` passou a usar códigos internos estáveis nos filtros e chaves
  i18n para labels, opções, indicadores, análise, acessibilidade e eixos.
- O erro da listagem de imóveis passou a ser uma chave (`properties.loadError`)
  traduzida na View, sem traduzir ou expor detalhes técnicos.
- JSONs `pt` e `en` foram atualizados e verificados com as mesmas chaves.
- O formulário de alteração de senha também recebeu o texto de loading do
  próprio fluxo.

Arquivos alterados nesta rodada: `FormView`, `AuthScreenView`, Views de
autenticação, `AccountView`, `usePropertiesViewModel`, `PropertiesView`,
arquivos Model/ViewModel/View do Trend Analysis, `TrendFilterControlView` e os
dois JSONs de idioma.

Comandos:

- `npm run typecheck`: sucesso.
- Verificação Node de chaves pt/en: sucesso.

## Rodada 3 — correções focadas

Status: concluído

- TrendAnalysis traduz o label do período pela chave do código interno.
- PasswordView usa i18n em título, subtítulo, campos, placeholders e
  validações.
- AccountView traduz mensagens de erro/sucesso do ViewModel; validações e
  mensagens do perfil passaram a ser códigos estáveis.
- Recursos `pt` e `en` receberam as chaves correspondentes e permaneceram
  sincronizados.

Comandos:

- `npm run typecheck`: sucesso.
- Verificação Node de chaves pt/en: sucesso.
- `validate-run.ps1 -RunDirectory outputs/20261114-132752-internationalization-round3`:
  sucesso.

## Rodada 5 — achados finais da auditoria

Status: concluído

### Arquivos e decisões

- Migradas as Views `PropertyVideoView`, `PropertyPlanView`, `NotificationsModalView`,
  `AboutView`, `ContactsView`, `ContactFormView` e `AlertView` para `useTranslation`,
  preservando estilos, navegação e dados de API.
- Mensagens de erro do ViewModel de notificações passaram a ser chaves estáveis,
  resolvidas na View.
- Validações e mensagens de sucesso/erro de `LoginModel`, `CadastroModel`,
  `useLoginViewModel` e `useCadastroViewModel` passaram a códigos i18n; as Views
  resolvem as chaves sem traduzir erros técnicos retornados pela API.
- `SearchModalModel` agora mantém códigos de ordenação e retorna descritores de
  apresentação para o histórico; `PropertyDetailsModel` mantém dados dinâmicos e
  códigos/fallbacks, enquanto a View traduz labels derivados.
- Recursos `pt` e `en` receberam chaves idênticas para as superfícies da rodada.

### Comandos e resultados

- `npm run typecheck`: sucesso.
- Verificação Node de parse e sincronização de chaves dos JSONs: sucesso (275 chaves
  em cada idioma).
- `git diff --check`: sucesso, apenas avisos de normalização de fim de linha do Git.

### Desvios e pendências

- A auditoria mais recente disponível foi a revisão da rodada 4; seus achados e a
  lista solicitada foram usados como escopo desta rodada.
- Teste visual em dispositivo/emulador continua não executado por indisponibilidade.

## Rodada 6 — correções finais focadas

Status: concluído

### Arquivos e decisões

- `SearchModalModel`, `useSearchModalViewModel` e `SearchModalView` passaram a
  usar chaves i18n para labels/opções de filtros e mensagens de erro, mantendo
  os valores internos (`TODOS`, `LANCAMENTO`, `DISPONIVEL`, `EM_OBRAS`,
  `distance`, `asc` e `desc`) inalterados.
- As mensagens de erro de voz, limite de caracteres e interpretação por IA
  agora são códigos estáveis resolvidos pela View; detalhes técnicos continuam
  apenas no console.
- `ImageCarouselModal` passou a usar a tradução comum para o
  `accessibilityLabel` do botão de fechar, sem alterar a apresentação visual.
- As chaves `search.typeOptions` e `search.errors` foram adicionadas de forma
  sincronizada a `pt.json` e `en.json`.

### Comandos e resultados

- `npm run typecheck`: aprovado após uma correção pontual de narrowing TypeScript.
  A primeira execução encontrou apenas o erro de união de opções recém-introduzida.
- `git diff --check`: aprovado; Git exibiu somente avisos preexistentes de
  normalização LF/CRLF.
- Checagem Node de chaves pt/en: aprovada, 284 chaves em cada idioma.
- `validate-run.ps1 -RunDirectory outputs/20261114-130852-internationalization`:
  aprovado (`Output válido`).

### Restrições e pendências

- Nenhuma alteração visual, de navegação, API ou comportamento de filtros foi
  feita.
- Teste visual em dispositivo/emulador não foi executado.
