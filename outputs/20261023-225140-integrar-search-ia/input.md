# Entrada

- Run ID: 20261023-225140-integrar-search-ia
- Criado em: 2026-10-23T22:51:40-03:00
- Status: concluido

## Tarefa recebida

Integrar SearchModal ao endpoint de interpretação IA e aplicar filtros inferidos na listagem de imóveis.

## Objetivo e escopo

Integrar a SearchModal à rota existente de interpretação de busca por IA e aplicar os filtros interpretados ao feed de Imóveis/Favoritos.

## CritÃ©rios de aceite

- Texto ou transcrição de voz é enviado com os catálogos permitidos ao backend.
- Filtros de cidade, região, tipo, termo, dormitórios, preço e ordenação são aplicados na listagem.
- Erro de IA fica visível e impede a aplicação de uma busca textual sem interpretação.
- O histórico salva exatamente o texto digitado ou transcrito, não apenas o termo reduzido retornado pela IA.
- Typecheck passa.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Preservar filtros manuais, histórico e o contrato existente do backend.
- A validação runtime do provedor Gemini depende da chave e do serviço configurados no backend.
