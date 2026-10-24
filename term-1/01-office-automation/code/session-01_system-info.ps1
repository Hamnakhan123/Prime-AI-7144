# Edition, version and build
Get-ComputerInfo -Property OsName, OsVersion, OsBuildNumber
# How much RAM is installed (in GB)
[math]::Round((Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory / 1GB, 1)
# Is BitLocker on for drive C:? (run terminal as administrator)
Get-BitLockerVolume -MountPoint "C:" | Select-Object MountPoint, ProtectionStatus
# Install a developer tool with winget
winget install --id Git.Git -e
