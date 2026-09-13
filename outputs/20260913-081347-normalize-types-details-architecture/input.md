# Entrada

- Run ID: 20260913-081347-normalize-types-details-architecture
- Criado em: 2026-09-13T08:13:47-03:00
- Status: recebido

## Tarefa recebida

Normalizar DTOs e types, substituir ImagemEmpreendimento por mediaTypes e reorganizar a feature de detalhes do imóvel conforme MVVM

## Objetivo e escopo

Normalizar a fronteira entre DTOs de transporte e types de domínio/UI, substituir
o tipo legado `ImagemEmpreendimento` pelo contrato de mídia já existente e
reorganizar a feature de detalhes do imóvel em camadas explícitas.

O escopo inclui os modelos atualmente em `src/types`, os imports relacionados,
o serviço de imagens do empreendimento e a pasta da feature de detalhes. Não
inclui alteração de payloads do mock/API nem mudança de rotas públicas.

## CritÃ©rios de aceite

- DTOs permanecem reservados a contratos de API; modelos usados por Views,
	ViewModels e normalizadores vivem em `types` do módulo ou `shared/types`.
- Nenhum código de produção importa `ImagemEmpreendimento` ou o arquivo
	`src/types/ImagemEmpreendimento.ts` permanece como contrato ativo.
- O serviço de mídia retorna `PropertyMediaDto` com `propertyId`, `mediaTypeId`
	e `mediaType`, usando `MEDIA_TYPES`/`MediaTypeDto` para classificação.
- Detalhes do imóvel separa Views, componentes e ViewModels/Model sem quebrar as
	três rotas de mídia nem a rota principal.
- `npm run typecheck` e `validate-run.ps1` concluem sem erros novos.

## Restrições, suposições e fora do escopo

- Preservar alterações preexistentes, incluindo `package-lock.json` modificado
	pelo usuário/comando anterior.
- Manter os aliases existentes em `tsconfig.json` e a árvore pública do Expo
	Router.
- O endpoint legado usa `fk_empreendimento`, `fk_tipo_imagem` e `descricao`;
	o serviço fará a adaptação local para o DTO normalizado.
- Não adicionar dependências nem remodelar a API externa.
- Branch atual: `detalhes-imovel`; branch sugerida: nenhuma.
