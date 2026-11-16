# Entrada

- Run ID: 20261115-150629-animate-language-dropdown
- Criado em: 2026-11-15T15:06:30-03:00
- Status: recebido

## Tarefa recebida

Aplicar animação suave ao abrir e fechar as opções de idioma nas configurações

## Objetivo e escopo

Adicionar uma animação suave à abertura e ao fechamento da lista de idiomas
nas configurações. A animação deve acompanhar a expansão/recolhimento vertical
das opções sem alterar a seleção, as traduções ou a estrutura de navegação.

## Critérios de aceite

- Abrir a opção de idioma apresenta as opções com transição vertical suave.
- Fechar a opção recolhe as opções com transição suave.
- Selecionar um idioma mantém o comportamento atual e fecha a lista animada.
- A animação funciona nos alvos React Native suportados pelo projeto.
- O typecheck permanece aprovado.

## Restrições, suposições e fora do escopo

- Reutilizar APIs e dependências já disponíveis no Expo SDK 54/React Native.
- Preservar o MVVM e as alterações existentes da lista de idiomas.
- Não adicionar dependências, persistência, rotas ou novos idiomas.
- Branch atual: `feat/i18n`; não criar ou trocar branch.
