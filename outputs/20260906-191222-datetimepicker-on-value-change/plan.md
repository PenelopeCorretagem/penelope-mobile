# Plano

1. Confirmar a assinatura instalada de `onValueChange`.
2. Trocar `onChange` por `onValueChange` em `FormView`.
3. Executar typecheck e verificar que não restou `onChange` nesse componente.

## Risco

Baixo: ambas as APIs fornecem o evento e a data selecionada; o callback existente será preservado.
