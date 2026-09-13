# Planejamento

- Status: aprovado

## Contexto e módulo

O módulo responsável é `src/modules/properties`. A evidência principal é que
`src/types/Advertisement.ts` é consumido pelo normalizador, Services, Models e
Views, portanto é um type de domínio do módulo, não um DTO. `Contact.ts` é um
modelo compartilhado de UI. Já `src/modules/properties/dtos/*` e
`src/shared/dtos/*` representam payloads/associações da API.

O serviço `src/services/imagemEmpreendimentoService.ts` é o ponto que mantém o
nome legado e transforma dados snake_case em categorias usadas pela feature.

## Plano de implementação

1. Criar `src/modules/properties/types/advertisement.ts` e
	`src/shared/types/contact.ts`, migrar imports e remover a dependência dos
	arquivos globais equivalentes.
2. Adaptar o serviço de mídia para usar `PropertyMediaDto`, `MediaTypeDto` e
	`MEDIA_TYPES`, convertendo o payload legado uma única vez e classificando por
	ID; remover o tipo `ImagemEmpreendimento`.
3. Reorganizar `PropertDeytails` em `views/`, `components/` e `view-models/`.
	Manter o `index.ts` como entrada da feature e atualizar apenas os arquivos de
	rota que importam as Views filhas.
4. Executar typecheck, revisar imports/arquitetura e validar os artefatos da
	execução.

## Validação e riscos

- Checagem discriminante inicial: `npm run typecheck` deve detectar qualquer
	campo incompatível durante a troca de `ImagemEmpreendimento` para
	`PropertyMediaDto`.
- Validar ausência de imports dos nomes legados com busca textual.
- Risco: o endpoint usa campos em português/snake_case; mitigação: DTO raw local
	e mapeamento explícito no Service.
- Risco: mover arquivos pode quebrar imports de rotas; mitigação: preservar o
	`index.ts` da feature e rodar typecheck imediatamente após a mudança.
