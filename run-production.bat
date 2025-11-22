@echo off
echo ========================================
echo QTrustBid - Production Build
echo ========================================
echo.
echo Step 1: Building the app...
echo (This takes about 30 seconds)
echo.

npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Build failed!
    echo Check the error messages above.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Step 2: Starting Production Server...
echo ========================================
echo.
echo SUCCESS! Open your browser to:
echo.
echo    http://localhost:4173
echo.
echo Press Ctrl+C to stop the server
echo.

npm run preview

pause
