@echo off
setlocal
cd /d "%~dp0"
title YouTube MP3 + Video Letolto - Telepito

if exist "Setup.exe" (
    echo A Grafikus Telepito Varazslo inditasa...
    start "" "Setup.exe"
    exit /b 0
)

if exist "YouTube_Downloader_Setup.exe" (
    echo A Grafikus Telepito Varazslo inditasa...
    start "" "YouTube_Downloader_Setup.exe"
    exit /b 0
)

echo ========================================================================
echo   YouTube MP3 + Video Letolto Studio - Gyors Telepites
echo ========================================================================
echo.

node -v >nul 2>&1
if not errorlevel 1 (
    echo [1/2] Node.js csomagok telepitese...
    call npm install
    echo [2/2] Alkalmazas felepitese...
    call npm run build
    echo.
    echo Kesz! Inditsd el a programot az Inditas.bat vagy YouTube_Downloader.exe fajllal.
    pause
    exit /b 0
)

py --version >nul 2>&1
if not errorlevel 1 (
    py -m pip install pyinstaller yt-dlp
    if exist "setup_installer.py" (
        start "" py setup_installer.py
        exit /b 0
    )
)

python --version >nul 2>&1
if not errorlevel 1 (
    python -m pip install pyinstaller yt-dlp
    if exist "setup_installer.py" (
        start "" python setup_installer.py
        exit /b 0
    )
)

echo Nem talalhato Node.js vagy Python!
echo Megnyitjuk a Node.js letoltesi oldalt...
start "" "https://nodejs.org"
pause
exit /b 1
