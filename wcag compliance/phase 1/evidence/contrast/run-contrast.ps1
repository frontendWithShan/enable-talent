$ErrorActionPreference = "Stop"

$chromePath = "C:\Users\Owner\.browser-driver-manager\chrome\win64-145.0.7632.76\chrome-win64\chrome.exe"
$driverPath = "C:\Users\Owner\.browser-driver-manager\chromedriver\win64-145.0.7632.76\chromedriver-win64\chromedriver.exe"

$routes = @(
  @{ Key = "home"; Path = "/" },
  @{ Key = "about-us"; Path = "/about-us" },
  @{ Key = "accessibility-policy"; Path = "/accessibility-policy" },
  @{ Key = "blogs"; Path = "/blogs" },
  @{ Key = "blogs-slugs"; Path = "/blogs/sample-slug" },
  @{ Key = "careers"; Path = "/careers" },
  @{ Key = "careers-jobId"; Path = "/careers/sample-id" },
  @{ Key = "enableacademy"; Path = "/enableacademy" },
  @{ Key = "events"; Path = "/events" },
  @{ Key = "faqs"; Path = "/faqs" },
  @{ Key = "foremployers"; Path = "/foremployers" },
  @{ Key = "foremployers-agent"; Path = "/foremployers/agent" },
  @{ Key = "fortalents"; Path = "/fortalents" },
  @{ Key = "mission"; Path = "/mission" },
  @{ Key = "privacy-policy"; Path = "/privacy-policy" },
  @{ Key = "programs-awards"; Path = "/programs-awards" },
  @{ Key = "responsible-ai"; Path = "/responsible-ai" },
  @{ Key = "students"; Path = "/students" }
)

$baseUrl = "http://localhost:4173"
$outputDir = "wcag compliance/evidence/contrast"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$summary = @()
foreach ($route in $routes) {
  $url = "$baseUrl$($route.Path)"
  $out = Join-Path $outputDir "$($route.Key)-contrast.json"
  Write-Output "RUNNING: $url"
  & npx -y @axe-core/cli `
    $url `
    --rules color-contrast `
    --save (Split-Path -Leaf $out) `
    --dir $outputDir `
    --chrome-path $chromePath `
    --chromedriver-path $driverPath `
    --load-delay 1000 `
    --timeout 120
  $exitCode = $LASTEXITCODE
  $summary += [PSCustomObject]@{
    route = $route.Path
    file = (Split-Path -Leaf $out)
    exit_code = $exitCode
  }
}

$summary | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $outputDir "contrast-summary.json") -Encoding utf8
Write-Output "DONE"
