# ExecuÃ§Ã£o

- Status: concluído

## AlteraÃ§Ãµes

## Alterações

- Separados `PropertyType`, `Address`, `PropertyImage`, `Amenity`, `Property` e
	`Advertisement` em arquivos próprios.
- Renomeados `EstateType`, `EstateImage` e `Estate` para `PropertyType`,
	`PropertyImage` e `Property`.
- Alterado o modelo de domínio de `advertisement.estate` para
	`advertisement.property`.
- Atualizados Properties Model, Advertisement Card, Property Details e o
	normalizador.
- Mantido `estate` somente como campo do payload externo recebido pela API.

## Comandos e resultados

## Comandos e resultados

- `npm run typecheck`: aprovado.
- `git diff --check`: aprovado.
- Busca de `EstateType`, `EstateImage`, acessos `.estate` e `getEstate`: sem
	usos no domínio; restaram apenas referências necessárias ao payload externo.

## Desvios, falhas e bloqueios

## Desvios, falhas e bloqueios

- O diagnóstico do editor ainda reportou arquivos removidos de uma execução
	anterior; `npm run typecheck` não reportou erros nos arquivos atuais.
