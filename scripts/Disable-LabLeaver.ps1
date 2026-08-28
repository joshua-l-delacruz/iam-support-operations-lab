[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'High')]
param(
    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$EmployeeId,

    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$DisabledUsersOu,

    [string[]]$ProtectedGroups = @('Domain Users')
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Import-Module ActiveDirectory
$matches = @(Get-ADUser -Filter "EmployeeID -eq '$EmployeeId'" -Properties MemberOf, Enabled, UserPrincipalName)

if ($matches.Count -ne 1) {
    throw "Expected one lab identity for EmployeeId '$EmployeeId'; found $($matches.Count)."
}

$user = $matches[0]
$groups = foreach ($groupDn in $user.MemberOf) {
    Get-ADGroup -Identity $groupDn
}

$removableGroups = $groups | Where-Object { $_.Name -notin $ProtectedGroups }

if ($PSCmdlet.ShouldProcess($user.UserPrincipalName, 'Disable lab identity')) {
    Disable-ADAccount -Identity $user
}

foreach ($group in $removableGroups) {
    if ($PSCmdlet.ShouldProcess("$($user.UserPrincipalName) from $($group.Name)", 'Remove group membership')) {
        Remove-ADGroupMember -Identity $group -Members $user -Confirm:$false
    }
}

if ($PSCmdlet.ShouldProcess($user.UserPrincipalName, "Move to $DisabledUsersOu")) {
    Move-ADObject -Identity $user.DistinguishedName -TargetPath $DisabledUsersOu
}

[pscustomobject]@{
    EmployeeId       = $EmployeeId
    UserPrincipalName = $user.UserPrincipalName
    WasEnabled       = $user.Enabled
    RemovedGroups    = ($removableGroups.Name -join ', ')
    TargetOu         = $DisabledUsersOu
}

# Run only in an authorized lab. Begin with -WhatIf and validate all resolved targets.

