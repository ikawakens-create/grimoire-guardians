$path = ".\src\data\worlds.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$script:i = 1
$evaluator = [System.Text.RegularExpressions.MatchEvaluator] {
    param($m)
    "order: " + ($script:i++)
}
$regex = [System.Text.RegularExpressions.Regex]::new("order:\s*\d+")
$newContent = $regex.Replace($content, $evaluator)
[System.IO.File]::WriteAllText($path, $newContent, [System.Text.Encoding]::UTF8)
Write-Host "Successfully updated order in worlds.js"
