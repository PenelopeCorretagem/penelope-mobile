# Plano aprovado

## Evidencias e modulo responsavel

`src/modules/properties/services/advertisementService.ts` concentra a chamada HTTP usada tanto por `usePropertiesViewModel` quanto por `useSearchModalViewModel`. A URL esta fixa em `http://192.168.0.172:3001`, e a verificacao local expirou ao tentar acessar esse endpoint.

## Implementacao

1. Importar `Platform` no service.
2. Resolver a URL por `EXPO_PUBLIC_API_BASE_URL`, com `http://localhost:3001` no web e o IP LAN atual nas demais plataformas.
3. Manter a assinatura e o comportamento de `getAllAdvertisements`.

## Validacao

- Executar `npm run typecheck`.
- Executar o mock e verificar a resposta do endpoint local, se o ambiente permitir.
- Executar `validate-run.ps1` ao final.

## Riscos

- Sem o processo `json-server`, qualquer URL continuara indisponivel; isso sera registrado como pre-requisito operacional.
- Um ambiente web remoto deve definir `EXPO_PUBLIC_API_BASE_URL` com uma API acessivel pelo navegador.
