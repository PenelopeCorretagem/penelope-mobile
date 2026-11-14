# Entrada

- Run ID: 20261114-130852-internationalization
- Status: concluído
- Branch atual: `feat/i18n`

## Tarefa

Adicionar suporte de interface em português e inglês, com detecção do idioma do
dispositivo, fallback para inglês, troca manual reativa e migração de textos
fixos das Views/componentes reais, sem traduzir dados dinâmicos.

## Critérios de aceite

- `pt` e `en` suportados; códigos regionais normalizados e fallback em `en`.
- Recursos JSON sincronizados, interpolação sem escape e troca reativa.
- Textos fixos migrados nas superfícies do plano; dados de API preservados.
- Seletor manual de idioma em Configurações.
- `npm run typecheck` e `validate-run.ps1` aprovados.

## Restrições e suposições

- Preservar MVVM, estilos, navegação e alterações preexistentes.
- Usar versões compatíveis com Expo 57 já presente no `package.json`.
- Preferência manual somente em memória; sem tradução de dados da API.
- Nenhuma alteração de branch, commit, issue ou PR.
