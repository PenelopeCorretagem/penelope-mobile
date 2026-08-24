[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[a-z0-9]+(?:-[a-z0-9]+)*$')]
    [string]$Slug,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$Task,

    [string]$OutputsRoot = 'outputs'
)

$ErrorActionPreference = 'Stop'

$runId = '{0}-{1}' -f (Get-Date -Format 'yyyyMMdd-HHmmss'), $Slug
$runDirectory = Join-Path $OutputsRoot $runId

if (Test-Path -LiteralPath $runDirectory) {
    throw "O diretório da execução já existe: $runDirectory"
}

New-Item -ItemType Directory -Path $runDirectory | Out-Null
$timestamp = (Get-Date).ToString('yyyy-MM-ddTHH:mm:ssK')

$files = @{
    'input.md' = @"
# Entrada

- Run ID: $runId
- Criado em: $timestamp
- Status: recebido

## Tarefa recebida

$Task

## Objetivo e escopo

Não iniciado.

## Critérios de aceite

Não iniciado.

## Restrições, suposições e fora do escopo

Não iniciado.
"@
    'plan.md' = @"
# Planejamento

- Status: não iniciado

## Contexto e módulo

Não iniciado.

## Plano de implementação

Não iniciado.

## Validação e riscos

Não iniciado.
"@
    'execution.md' = @"
# Execução

- Status: não iniciado

## Alterações

Não iniciado.

## Comandos e resultados

Não iniciado.

## Desvios, falhas e bloqueios

Não iniciado.
"@
    'review.md' = @"
# Revisão

- Status: não iniciado
- Veredito: não iniciado

## Achados

Não iniciado.

## Checklist e validações

Não iniciado.
"@
    'summary.md' = @"
# Saída

- Status final: não iniciado

## Entregas

Não iniciado.

## Validações

Não iniciado.

## Pendências e próximo passo

Não iniciado.
"@
}

foreach ($entry in $files.GetEnumerator()) {
    $path = Join-Path $runDirectory $entry.Key
    Set-Content -LiteralPath $path -Value $entry.Value -Encoding utf8
}

(Resolve-Path -LiteralPath $runDirectory).Path
