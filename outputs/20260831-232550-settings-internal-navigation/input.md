# Entrada

- Run ID: 20260831-232550-settings-internal-navigation
- Criado em: 2026-08-31T23:25:50-03:00
- Status: concluido

## Tarefa recebida

Fazer itens de configuracoes abrirem conteudo dentro da propria rota, mantendo Sair na rota de login

## Objetivo e escopo

Fazer os itens de conteudo de Configuracoes abrirem detalhes dentro da propria
rota `configuracoes`, mantendo somente `Sair` como navegacao para login.

## CritÃ©rios de aceite

- Ajustar conta, Trocar senha, Sobre e Contato nao usam mais rotas separadas.
- Esses itens exibem conteudo interno na tela de Configuracoes.
- Sair navega para `APP_ROUTES.auth.login`.
- `npm run typecheck` passa.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Preservar a centralizacao de rotas.
- Nao criar navigator paralelo.
