@echo off
setlocal
cd /d "%~dp0"
title YouTube MP3 Letolto - Telepito EXE Keszito

echo ========================================================================
echo   YouTube MP3 + Video Letolto - Telepito EXE Fordito (Setup Wizard)
echo ========================================================================
echo.
echo Ez a script elkesziti a grafikus "YouTube_Downloader_Setup.exe" telepitot,
echo amelyben a felhasznalo megadhatja a telepitesi celmappat!
echo.

if not exist "setup_installer.py" (
    echo HIBA: Nem talalhato a setup_installer.py fajl!
    pause
    exit /b 1
)

echo [1/3] PyInstaller ellenorzese...
py -m PyInstaller --version >nul 2>&1
if errorlevel 1 (
    echo A PyInstaller telepitese pip segitsegevel...
    py -m pip install pyinstaller
)

echo.
echo [2/3] Grafikus Telepito EXE forditasa (Setup Wizard)...
py -m PyInstaller --onefile --windowed --clean --name "YouTube_Downloader_Setup" "setup_installer.py"

if errorlevel 1 (
    echo.
    echo HIBA: A telepito forditasa sikertelen volt!
    pause
    exit /b 1
)

echo.
echo [3/3] Főprogram EXE forditasa (ha szukseges)...
if exist "youtube_mp3_downloader.py" (
    py -m PyInstaller --onefile --windowed --clean --name "YouTube MP3 Downloader" "youtube_mp3_downloader.py"
)

echo.
echo ========================================================================
echo   SIKER! A GRAFIKUS TELEPITO ELKESZULT!
echo ========================================================================
echo.
echo A kesz telepito az alabbi helyen talalhato:
echo   dist\YouTube_Downloader_Setup.exe
echo.
echo Ezt az EXE fajlt barmelyik masik szamitogepre is atmasolhatod!
echo A telepitoben a felhasznalo maga valaszthatja ki a telepitesi mappat.
echo.
pause