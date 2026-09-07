Status: aprovado

# Plano

## Módulo e evidências

O módulo responsável é `src/modules/settings/submodules/acount/pages/Account`. `AccountView` hoje usa apenas `DEFAULT_USER_PROFILE` em estado local e `SettingsView` calcula iniciais diretamente do mesmo mock estático. O cliente de anúncios já define o padrão de URL para o json-server.

## Camadas afetadas

- Model: adicionar `profileImage?: string | null` ao perfil.
- Service: criar serviço de perfil com leitura e atualização de `users/1`.
- ViewModel: carregar, salvar e controlar seleção/remoção da imagem e campos.
- View: adicionar avatar, ações de escolher/remover e estados de carregamento/erro.
- DTO/mock: incluir `profileImage: null` no único usuário.
- Configuração: adicionar `expo-image-picker` e plugin/permissões somente se exigido pela SDK.

## Sequência

1. Atualizar dependência e contrato do usuário/mock.
2. Criar service e ViewModel do perfil.
3. Adaptar `AccountView` para consumir o ViewModel e renderizar avatar.
4. Adaptar `SettingsView` para exibir a imagem persistida e fallback.
5. Rodar typecheck e revisar acessibilidade, loading, erro e persistência.

## Validação

- `npm run typecheck`.
- Verificação do JSON do mock e do contrato `GET/PATCH /users/1`.
- Revisão arquitetural contra `docs/development-workflow.md`.

## Riscos e decisões

- URI local não é upload de produção; é a representação solicitada para o mock.
- Em web, o seletor depende do suporte do `expo-image-picker`; a interface mantém a opção e trata cancelamento/erro.
# Planejamento

- Status: aprovado e executado

## Contexto e módulo

O módulo responsável é `src/modules/settings/submodules/acount/pages/Account`.
AccountView mantinha estado local e SettingsView lia um perfil estático; o mock
não tinha coleção `users`. A solução adiciona um service para `GET/PATCH /users/1`
e um ViewModel compartilhado pelas duas Views.

## Plano de implementação

- Adicionar `profileImage` opcional ao DTO/model e um usuário único no mock.
- Instalar `expo-image-picker` compatível com o SDK instalado e registrar o plugin.
- Criar `profileService.ts` e `useProfileViewModel.ts` para carregar, selecionar,
  remover e salvar a URI, com loading e erro.
- Renderizar imagem ou iniciais em AccountView e SettingsView sem alterar rotas.

## Validação e riscos

- Rodar `npm run typecheck` após cada ajuste relevante.
- Validar JSON e exercitar GET/PATCH no json-server em porta isolada.
- URI local atende ao mock; upload binário e backend de produção ficam fora do escopo.
