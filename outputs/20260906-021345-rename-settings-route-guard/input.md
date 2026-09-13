# Entrada

- Run ID: 20260906-021345-rename-settings-route-guard
- Criado em: 2026-09-06T02:13:45-03:00
- Status: concluída

## Tarefa recebida

Renomear e separar os guards de rota raiz e submódulos de Configurações

## Objetivo e escopo

Renomear o guard de Configurações para expressar que ele verifica submódulos internos.

## CritÃ©rios de aceite

`isSettingsSubmoduleRoute` detecta telas internas, enquanto `isSettingsRootRoute` detecta apenas a Tab principal.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

Preservar a navegação e o comportamento visual do Header.
