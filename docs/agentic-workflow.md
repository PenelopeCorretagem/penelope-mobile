# Workflow com agentes

O agente `penelope-development` conduz tarefas do Penelope Mobile em cinco fases:

```text
input -> planejamento -> execução -> revisão -> saída
```

Cada execução é registrada em `outputs/<run-id>/` com `input.md`, `plan.md`,
`execution.md`, `review.md` e `summary.md`.

No GitHub Copilot, o agente principal executa as fases em sequência. Quando houver
subagentes disponíveis, a exploração e a revisão podem ser delegadas a agentes
somente leitura; a implementação deve permanecer em uma única fase escritora.

Para criar os artefatos manualmente:

```powershell
powershell -ExecutionPolicy Bypass -File .agents/skills/penelope-development/scripts/new-run.ps1 -Slug contatos -Task 'Implementar a tela de contatos'
```

Para validar uma execução concluída:

```powershell
powershell -ExecutionPolicy Bypass -File .agents/skills/penelope-development/scripts/validate-run.ps1 -RunDirectory outputs/20260823-120000-contatos
```

O workflow não cria Issue, Pull Request, merge, branch ou publicação externa sem
pedido explícito.

## Regras arquiteturais atuais

- `src/constants/routes.ts` é a fonte única dos destinos de navegação. Os agentes
	devem preferir `APP_ROUTES` via `@constant/routes` e rejeitar novas strings de
	rota espalhadas pelo código.
- A aplicação usa o shell de `src/app/app/_layout.tsx`: `HeaderView` com busca
	global via `SearchModalView` e `TabNavigator` inferior.
- A navegação principal é `Home`, `Imóveis`, `Dashboard`, `Favoritos` e `Perfil`.
- `Configurações` é uma rota Stack sem TabNavigator, acessada pela engrenagem do Perfil.
- A organização vigente dos módulos é `auth`, `home`, `properties` e `profile`.
- `Footer` e o menu hamburguer não fazem parte do shell atual. Não devem ser
	reintroduzidos sem requisito explícito.
