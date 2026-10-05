# Penelope Mobile

Aplicativo multiplataforma para descoberta, consulta e gestão de imóveis, construído com
React Native, Expo e TypeScript. O repositório contém o cliente; a API Spring Boot e o
serviço de interpretação por IA ficam no projeto `penelope-mobile-api`.

## Funcionalidades

- Cadastro, login, recuperação de senha e gerenciamento de perfil.
- Listagem e detalhes de imóveis, com imagens, localização e conteúdo de vídeo quando
  disponível.
- Favoritos e acesso às notificações do usuário.
- Filtros por cidade, região, tipo de anúncio e ordenação, aplicados localmente aos dados
  de anúncios.
- Pesquisa digitada ou por voz. A transcrição pode ser enviada à API de IA para extrair
  filtros estruturados, que podem ser revisados antes de aplicar.
- Filtros por dormitórios mínimos e preço máximo em reais.
- Histórico local de pesquisas.

O reconhecimento por voz requer suporte e permissão de microfone no navegador ou na
plataforma nativa. Para incluir o módulo nativo em desenvolvimento, use um development
build do Expo; Expo Go não contém todas as extensões nativas deste aplicativo. A chave
Gemini pertence somente ao backend e nunca deve ser configurada no aplicativo.

## Configuração local

1. Instale Node.js compatível com o projeto e npm.
2. Instale as dependências:

   ```powershell
   npm ci
   ```

3. Crie a configuração local baseada no exemplo:

   ```powershell
   Copy-Item .env.example .env
   ```

4. Ajuste os endereços para onde o app será executado:

   - `EXPO_PUBLIC_API_BASE_URL`: API Spring Boot, incluindo o contexto `/api`; esse
     mesmo endereço atende catálogo, autenticação e interpretação da pesquisa por IA.
   - `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`: opcional para os recursos de mapa que a utilizam.

   Em navegador e simulador iOS locais, o endereço padrão usa `localhost`. No
   emulador Android, use `10.0.2.2` para acessar os serviços na máquina de desenvolvimento.
   Em celular físico, use o IP da máquina na rede local e permita a origem do navegador em
   `CORS_ALLOWED_ORIGINS` no backend.
   As variáveis `EXPO_PUBLIC_*` são incorporadas ao bundle e são visíveis aos usuários:
   não coloque chaves privadas ou credenciais nelas. Configure a chave Gemini apenas no
   `.env` do backend.

## Executar e validar

Inicie a API Spring Boot unificada conforme as instruções do README de
`penelope-mobile-api`. A interpretação por IA é um endpoint dessa mesma API. Depois, na
raiz deste projeto:

```powershell
npm run web
```

Para verificar tipos e gerar o bundle Web:

```powershell
npm run typecheck
npx expo export --platform web
```

Se o TypeScript 6 bloquear `npm run typecheck` com TS5101 por causa de `baseUrl` no
`tsconfig.json`, use temporariamente `npx tsc --noEmit --ignoreDeprecations 6.0`. Essa
opção silencia apenas o aviso de depreciação; a migração das configurações de alias deve
ser feita antes de atualizar para uma versão do TypeScript que remova `baseUrl`.

O projeto também pode iniciar em Android ou iOS com o SDK e as ferramentas da plataforma
instalados:

```powershell
npx expo run:android
npx expo run:ios
```

`run:ios` requer macOS e Xcode. Para distribuição, use os perfis declarados em `eas.json`
com o EAS CLI, após configurar a conta e as credenciais de assinatura.

## Estrutura

- `src/app`: navegação e rotas Expo Router.
- `src/modules`: funcionalidades agrupadas por domínio, incluindo autenticação,
  propriedades e perfil.
- `src/shared`: infraestrutura, componentes, estilos, contexto e utilitários compartilhados.
- `mocks`: dados usados no fluxo de API mock quando necessário.

## Serviços relacionados

- `penelope-mobile-api`: API Spring Boot de autenticação, anúncios, favoritos, notificações,
  perfil e interpretação por IA.
- A interpretação recebe somente a transcrição e os catálogos de filtros enviados pelo app.
  O app continua carregando anúncios e aplicando os filtros sobre os dados da API principal.
