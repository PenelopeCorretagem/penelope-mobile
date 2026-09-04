# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

O unico uso de DateTimePicker esta em AuthScreenView.tsx e usa onChange, depreciado na versao 9.1.0.

## Plano de implementaÃ§Ã£o

Trocar por onValueChange, onDismiss e onNeutralButtonPress, separando selecao de data e fechamento do picker.

## ValidaÃ§Ã£o e riscos

Executar typecheck e busca por onChange em DateTimePicker.
