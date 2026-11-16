# Entrada

- Run ID: 20261115-145358-settings-language-dropdown
- Criado em: 2026-11-15T14:53:59-03:00
- Status: executado

## Tarefa recebida

Adicionar lista suspensa de idiomas nas configurações, permitindo abrir/fechar e selecionar o idioma desejado

## Objetivo e escopo

Alterar a opção de idioma da tela de configurações para abrir uma lista suspensa
com todos os idiomas atualmente suportados pelo app. O usuário deve conseguir
selecionar um idioma e fechar a lista ao tocar novamente na opção principal sem
alterar o idioma.

Escopo limitado à tela de configurações e à reutilização das traduções/recursos
já existentes em `i18n`; não inclui adicionar novos idiomas nem redesenhar a
shell de navegação.

## Critérios de aceite

- Tocar em "Idioma" abre as opções de todos os idiomas suportados.
- Tocar em uma opção altera o idioma ativo e atualiza o texto da tela.
- Tocar novamente em "Idioma" fecha as opções quando elas estiverem abertas.
- A opção atualmente selecionada é identificável na lista.
- A implementação mantém a separação View/ViewModel existente e passa no
  typecheck.

## Restrições, suposições e fora do escopo

- Idiomas suportados são os recursos registrados em `i18n/index.js` (`pt` e
  `en`); a lista não deve duplicar essa fonte.
- A interação deve usar componentes e estilos já adotados pelo projeto, sem
  dependência nova.
- Não alterar persistência de idioma, traduções ou rotas.
- Branch atual: não criar ou trocar branch. Branch sugerida: não aplicável.
