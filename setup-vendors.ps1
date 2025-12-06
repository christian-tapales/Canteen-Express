# Run this script to import the vendor accounts
# Make sure MySQL is installed and running

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Canteen Express - Create Vendor Accounts" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Find MySQL executable
$mysqlPaths = @(
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Server 9.0\bin\mysql.exe",
    "C:\xampp\mysql\bin\mysql.exe",
    "C:\wamp64\bin\mysql\mysql8.0.27\bin\mysql.exe"
)

$mysqlExe = $null
foreach ($path in $mysqlPaths) {
    if (Test-Path $path) {
        $mysqlExe = $path
        Write-Host "Found MySQL at: $path" -ForegroundColor Green
        break
    }
}

if (-not $mysqlExe) {
    # Try to find mysql in PATH
    try {
        $mysqlExe = (Get-Command mysql -ErrorAction Stop).Source
        Write-Host "Found MySQL in PATH: $mysqlExe" -ForegroundColor Green
    } catch {
        Write-Host "ERROR: MySQL not found!" -ForegroundColor Red
        Write-Host "Please install MySQL or add it to your PATH." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Alternative: Use MySQL Workbench to run create_vendors.sql" -ForegroundColor Yellow
        exit 1
    }
}

Write-Host ""
Write-Host "This will create the following accounts:" -ForegroundColor Yellow
Write-Host "  - 3 Vendor accounts (one for each shop)" -ForegroundColor White
Write-Host "  - 1 Admin account" -ForegroundColor White
Write-Host "  - 2 Customer test accounts" -ForegroundColor White
Write-Host ""
Write-Host "All passwords will be: password" -ForegroundColor Green
Write-Host ""

# Prompt for MySQL password
$password = Read-Host "Enter MySQL root password" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host ""
Write-Host "Running SQL script..." -ForegroundColor Cyan

# Run the SQL script
try {
    Get-Content "create_vendors.sql" | & $mysqlExe -u root "-p$plainPassword" canteen_express_db 2>&1 | Out-String
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "SUCCESS! Vendor accounts created!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "You can now login with:" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Vendors:" -ForegroundColor Yellow
        Write-Host "  vendor.campuscafe@canteen.com / password" -ForegroundColor White
        Write-Host "  vendor.lunchcorner@canteen.com / password" -ForegroundColor White
        Write-Host "  vendor.snackshack@canteen.com / password" -ForegroundColor White
        Write-Host ""
        Write-Host "Admin:" -ForegroundColor Yellow
        Write-Host "  admin@canteen.com / password" -ForegroundColor White
        Write-Host ""
        Write-Host "Customers:" -ForegroundColor Yellow
        Write-Host "  alice.customer@email.com / password" -ForegroundColor White
        Write-Host "  bob.customer@email.com / password" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "ERROR: Failed to create accounts" -ForegroundColor Red
        Write-Host "Check the error message above" -ForegroundColor Yellow
    }
} catch {
    Write-Host ""
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

# Clean up password from memory
$plainPassword = $null
