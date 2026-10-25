# Saida

- Status final: concluido

## Entregas

- A URL do backend agora e configurada explicitamente via `EXPO_PUBLIC_API_BASE_URL` com context path `/api`; foi removido fallback por IP local.
- Servicos de midia usam a infraestrutura HTTP compartilhada e mantem os paths atuais.
- `.env` local foi adicionado ao ignore; `.env.example` descreve a configuracao publica esperada.

## Validacoes

- `npx tsc --noEmit --ignoreDeprecations 6.0`: passou.
- Diagnosticos nos arquivos TS alterados: sem erros.
- `npm run typecheck`: nao passou devido ao TS5101 ja presente em `tsconfig.json:5`.

## Pendencias e proximo passo

- Confirmar no contrato/controladores Spring se `/imagem_empreendimento` e `/tipo_imagem` estao disponiveis sob `/api`.
- Configurar o valor adequado em `.env.local` durante desenvolvimento ou nas variaveis EAS para builds. Nunca colocar segredo de servidor em `EXPO_PUBLIC_*`.
