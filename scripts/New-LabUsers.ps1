[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'Medium')]
param(
    [Parameter(Mandatory)]
    [ValidateScript({ Test-Path -LiteralPath $_ -PathType Leaf })]
    [string]$CsvPath,

    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$TargetOu,

    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$UserPrincipalNameSuffix
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Import-Module ActiveDirectory
$users = Import-Csv -LiteralPath $CsvPath

foreach ($user in $users) {
    if ($user.Status -notin @('Active', 'PreHire')) {
        Write-Verbose "Skipping $($user.EmployeeId) because status is $($user.Status)."
        continue
    }

    $existing = Get-ADUser -Filter "EmployeeID -eq '$($user.EmployeeId)'" -ErrorAction SilentlyContinue
    if ($existing) {
        Write-Warning "Skipping $($user.EmployeeId): an identity with this EmployeeID already exists."
        continue
    }

    $displayName = "$($user.GivenName) $($user.Surname)"
    $upn = "$($user.SamAccountName)@$UserPrincipalNameSuffix"

    $parameters = @{
        Name                 = $displayName
        GivenName            = $user.GivenName
        Surname              = $user.Surname
        DisplayName          = $displayName
        SamAccountName       = $user.SamAccountName
        UserPrincipalName    = $upn
        EmployeeID           = $user.EmployeeId
        Department           = $user.Department
        Title                = $user.Title
        Path                 = $TargetOu
        Enabled              = $false
        ChangePasswordAtLogon = $true
    }

    if ($PSCmdlet.ShouldProcess($upn, 'Create disabled fictional lab user')) {
        New-ADUser @parameters
        Write-Output "Created disabled lab identity: $upn"
    }
}

# Recommended first run:
# .\New-LabUsers.ps1 -CsvPath ..\sample-data\lab-users.csv `
#   -TargetOu 'OU=Lab Users,DC=example,DC=test' `
#   -UserPrincipalNameSuffix 'example.test' -WhatIf

