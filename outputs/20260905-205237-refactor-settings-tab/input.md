# Execução: refactor-settings-tab

Status: em planejamento

## Objetivo

Refatorar o fluxo de Perfil e Configurações para que Configurações seja uma Tab de primeiro nível com três destinos visíveis: Imóveis, Favoritos e Configurações. O perfil passa a ser a tela interna de edição acessada pelo cabeçalho e pela opção Meu perfil.

## Escopo

- Ajustar rotas e layouts do Expo Router relacionados a `(private)/(tabs)`.
- Remover a Tab Perfil e referências de navegação legadas.
- Criar a apresentação de Configurações com cabeçalho de usuário, seções e linhas de opção.
- Transformar a tela de conta em formulário editável com salvar e voltar.
- Preservar senha, contato, sobre e logout existentes.
- Reutilizar tema, ícones, Header e SettingsOption existentes.

## Critérios de aceite

- A barra inferior exibe exatamente Imóveis, Favoritos e Configurações.
- Configurações usa ícone de engrenagem e cores active/inactive já existentes.
- O cabeçalho de Configurações não exibe botão de engrenagem para abrir a própria tela.
- Meu perfil e o cartão do usuário abrem a edição de perfil.
- Edição exibe avatar, nome, e-mail e telefone, permite editar e salvar em memória e possui voltar.
- Alterar senha, contato, sobre e logout continuam acessíveis.
- Lista rola, respeita o shell existente e não duplica navigator.
- Não restam rotas ou links de Tab Perfil.
- `npm run typecheck` passa.

## Restrições e suposições

- Não há contexto, store ou service de dados do usuário no código atual; os valores pessoais já existentes serão centralizados como estado inicial do domínio, sem inventar uma API.
- Não será alterada a navegação de imóveis, favoritos ou autenticação fora do caminho necessário.
- Alterações preexistentes em `package.json`, `src/modules/properties/services/advertisementService.ts` e outputs anteriores são preservadas.

## Branch

- Atual: `feat-home`
- Sugestão: manter a branch atual; nenhuma troca será feita.
