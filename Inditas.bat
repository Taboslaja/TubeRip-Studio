@echo off
setlocal
cd /d "%~dp0"
title YouTube MP3 + Video Letolto Studio
color 0B

echo ========================================================================
echo   YouTube MP3 + Video Letolto Studio - Inditas
echo ========================================================================
echo.

REM 1. LEHETOSEG: Ha Python elerheto es letezik a server.py (Webes Studio)
py --version >nul 2>&1
if not errorlevel 1 (
    if exist "server.py" (
        echo [OK] Python eszlelve! Webes Studio szerver inditasa a 3000-es porton...
        echo Nyisd meg vagy varj par masodpercet, a bongeszo automatikusan megnyilik!
        echo URL: http://localhost:3000
        py server.py
        exit /b 0
    )
)

python --version >nul 2>&1
if not errorlevel 1 (
    if exist "server.py" (
        echo [OK] Python eszlelve! Webes Studio szerver inditasa a 3000-es porton...
        echo Nyisd meg vagy varj par masodpercet, a bongeszo automatikusan megnyilik!
        echo URL: http://localhost:3000
        python server.py
        exit /b 0
    )
)

REM 2. LEHETOSEG: Ha Node.js elerheto
node -v >nul 2>&1
if not errorlevel 1 (
    echo [OK] Node.js eszlelve!
    if not exist "node_modules" (
        echo Csomagok ellenorzese es telepitese (npm install)...
        call npm install
    )
    if not exist "dist" (
        echo Webes alkalmazas felepitese (npm run build)...
        call npm run build
    )
    echo.
    echo A szerver indul... Nyisd meg a bongeszodben: http://localhost:3000
    start "" "http://localhost:3000"
    call npm run dev
    exit /b 0
)

REM 3. LEHETOSEG: Ha Python asztali felulet letezik
if exist "youtube_mp3_downloader.py" (
    echo [OK] Asztali felulet inditasa...
    start "" "youtube_mp3_downloader.py"
    exit /b 0
)

REM 4. LEHETOSEG: Onallo indito EXE
if exist "YouTube_Downloader.exe" (
    echo [OK] Onallo inditoprogram inditasa...
    start "" "YouTube_Downloader.exe"
    exit /b 0
)

REM 5. Ha semmi sincs telepitve a gepen
echo ========================================================================
echo [FIGYELEM] Nem talalhato Python vagy Node.js a gepeden!
echo.
echo A modern webes studio (http://localhost:3000) futtatasahoz szukseges
echo a Python (https://www.python.org) vagy a Node.js (https://nodejs.org).
echo ========================================================================
echo.
echo Megnyitjuk a hivatalos Python letoltesi oldalt...
start "" "https://www.python.org/downloads/"
pause
exit /b 1
