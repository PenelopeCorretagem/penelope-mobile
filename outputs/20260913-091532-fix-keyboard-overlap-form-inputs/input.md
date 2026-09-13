# Entrada

- Run ID: 20260913-091532-fix-keyboard-overlap-form-inputs
- Criado em: 2026-09-13T09:15:32-03:00
- Status: recebido

## Tarefa recebida

Manter o input focado visivel acima do teclado em formularios mobile

## Objetivo e escopo

Garantir que o campo focado permaneça visível na área disponível quando o teclado
do celular abrir, nos formulários de autenticação, conta, senha, recuperação e busca.

## Critérios de aceite

- Android redimensiona o contêiner ao abrir o teclado.
- iOS ajusta os insets do ScrollView automaticamente.
- Existe espaço inferior suficiente para rolar até o campo focado.
- `npm run typecheck` e diagnósticos dos arquivos alterados passam.

## Restrições, suposições e fora do escopo

- Preservar campos, validações e comportamento dos formulários.
- Não adicionar dependências.
- Validação visual em dispositivo físico não está disponível nesta execução.
