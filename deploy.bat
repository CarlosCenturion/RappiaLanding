@echo off
echo 🚀 Desplegando RAPPIBELLION a Cloudflare Pages...
echo.

echo 📁 Verificando archivos...
if not exist "index.html" (
    echo ❌ Error: index.html no encontrado
    pause
    exit /b 1
)

if not exist "styles.css" (
    echo ❌ Error: styles.css no encontrado
    pause
    exit /b 1
)

if not exist "script.js" (
    echo ❌ Error: script.js no encontrado
    pause
    exit /b 1
)

echo ✅ Archivos principales encontrados
echo.

echo 🌐 Desplegando a Cloudflare Pages...
wrangler pages deploy . --project-name rappibellion --commit-dirty=true

if %errorlevel% equ 0 (
    echo.
    echo ✅ ¡Despliegue exitoso!
    echo 🌍 Tu sitio está disponible en: https://rappibellion.pages.dev
    echo.
    echo 📱 También puedes acceder desde:
    echo    - https://ae81d012.rappibellion.pages.dev
    echo.
) else (
    echo.
    echo ❌ Error en el despliegue
    echo.
)

pause
