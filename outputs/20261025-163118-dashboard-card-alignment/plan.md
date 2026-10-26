# Planejamento

- Status: aprovado

## Contexto e módulo

O módulo responsável é `src/modules/dashboard/pages/Trend`. O container
`indicators` usa `flexWrap` e os cards compactos têm largura de 48%, mas não
declaram explicitamente o alinhamento dos itens da linha.

## Plano de implementação

1. Configurar o container do grid para esticar os itens no eixo transversal.
2. Manter a composição interna dos cards iniciada no topo.
3. Preservar `indicatorCardWide` para o card de duas colunas e evitar altura
   fixa adicional.

## Validação e riscos

- Executar `npm run typecheck` e `git diff --check`.
- Verificar no diff que a alteração não modifica conteúdo nem o card amplo.
- Risco: o comportamento de `flexWrap` pode variar entre plataformas; usar
  apenas propriedades flexíveis suportadas pelo React Native.
