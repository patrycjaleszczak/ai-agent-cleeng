@echo off
REM Playwright Workshop - PowerPoint Converter (Windows)
REM This script converts the markdown presentation to PowerPoint format

echo.
echo 🎭 Playwright Workshop - PowerPoint Converter
echo ==============================================
echo.

REM Check if pandoc is installed
where pandoc >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Pandoc is not installed!
    echo.
    echo Please install Pandoc first:
    echo.
    echo   choco install pandoc
    echo.
    echo Or download from: https://pandoc.org/installing.html
    echo.
    pause
    exit /b 1
)

echo ✅ Pandoc found!
echo.

REM Check if markdown file exists
if not exist "Playwright_Workshop_Presentation.md" (
    echo ❌ Error: Playwright_Workshop_Presentation.md not found!
    echo Please run this script from the workspace directory.
    echo.
    pause
    exit /b 1
)

echo 📄 Converting presentation...
echo.

REM Convert to PowerPoint
pandoc Playwright_Workshop_Presentation.md -o Playwright_Workshop.pptx -t pptx --slide-level=2

if %ERRORLEVEL% EQU 0 (
    echo ✅ Success! PowerPoint created: Playwright_Workshop.pptx
    echo.
    echo 📊 Your presentation is ready with 62 slides covering:
    echo    • Reports ^& Reporters (25 min^)
    echo    • Debugging ^& Analysis (25 min^)
    echo    • Test Stability (30 min^)
    echo    • Q^&A ^& Wrap-up (10 min^)
    echo.
    echo 🎯 Next steps:
    echo    1. Open Playwright_Workshop.pptx in PowerPoint
    echo    2. Apply your company theme
    echo    3. Review speaker notes
    echo    4. Practice your demos
    echo    5. You're ready to present!
    echo.
) else (
    echo ❌ Error: Conversion failed!
    echo.
    echo Try manual conversion or see POWERPOINT_CONVERSION_GUIDE.md
    echo.
    pause
    exit /b 1
)

pause
