[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$RunDirectory
)

$ErrorActionPreference = 'Stop'
$requiredFiles = @(
    'input.md',
    'plan.md',
    'execution.md',
    'review.md',
    'summary.md'
)
$errors = [System.Collections.Generic.List[string]]::new()

if (-not (Test-Path -LiteralPath $RunDirectory -PathType Container)) {
    throw "Diretório de execução não encontrado: $RunDirectory"
}

foreach ($file in $requiredFiles) {
    $path = Join-Path $RunDirectory $file

    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        $errors.Add("Arquivo ausente: $file")
        continue
    }

    $content = Get-Content -Raw -Encoding utf8 -LiteralPath $path
    if ([string]::IsNullOrWhiteSpace($content)) {
        $errors.Add("Arquivo vazio: $file")
        continue
    }

    if ($content -match '(?im)^Não iniciado\.\s*$') {
        $errors.Add("Arquivo ainda contém conteúdo do scaffold: $file")
    }

    if ($content -match '(?im)^- (?:Status|Status final|Veredito): não iniciado\s*$') {
        $errors.Add("Arquivo ainda não finalizado: $file")
    }
}

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Error $_ }
    exit 1
}

Write-Output "Output válido: $RunDirectory"
