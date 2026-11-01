#ifndef UNICODE
#define UNICODE
#endif
#ifndef _UNICODE
#define _UNICODE
#endif
#define _WIN32_WINNT 0x0600
#include <windows.h>
#include <shlobj.h>
#include <shellapi.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <urlmon.h>

static WCHAR szAppDir[MAX_PATH];

BOOL FileExists(LPCWSTR path) {
    DWORD dwAttrib = GetFileAttributesW(path);
    return (dwAttrib != INVALID_FILE_ATTRIBUTES && !(dwAttrib & FILE_ATTRIBUTE_DIRECTORY));
}

BOOL DirExists(LPCWSTR path) {
    DWORD dwAttrib = GetFileAttributesW(path);
    return (dwAttrib != INVALID_FILE_ATTRIBUTES && (dwAttrib & FILE_ATTRIBUTE_DIRECTORY));
}

// Check if a command is available in PATH
BOOL CommandExists(LPCWSTR cmd) {
    WCHAR fullCmd[MAX_PATH * 2];
    _snwprintf(fullCmd, MAX_PATH * 2, L"cmd.exe /c \"%s >nul 2>&1\"", cmd);

    STARTUPINFOW si;
    PROCESS_INFORMATION pi;
    ZeroMemory(&si, sizeof(si));
    si.cb = sizeof(si);
    si.dwFlags = STARTF_USESHOWWINDOW;
    si.wShowWindow = SW_HIDE;
    ZeroMemory(&pi, sizeof(pi));

    if (CreateProcessW(NULL, fullCmd, NULL, NULL, FALSE, CREATE_NO_WINDOW, NULL, szAppDir, &si, &pi)) {
        WaitForSingleObject(pi.hProcess, 3000);
        DWORD exitCode = 1;
        GetExitCodeProcess(pi.hProcess, &exitCode);
        CloseHandle(pi.hProcess);
        CloseHandle(pi.hThread);
        return (exitCode == 0);
    }
    return FALSE;
}

// Download yt-dlp.exe in background if missing
void EnsureYtDlp() {
    WCHAR szYtDlp[MAX_PATH];
    _snwprintf(szYtDlp, MAX_PATH, L"%s\\yt-dlp.exe", szAppDir);
    if (!FileExists(szYtDlp)) {
        // Try direct URL download
        HRESULT hr = URLDownloadToFileW(NULL,
            L"https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe",
            szYtDlp, 0, NULL);
        if (FAILED(hr)) {
            // Fallback via PowerShell
            WCHAR psCmd[MAX_PATH * 3];
            _snwprintf(psCmd, MAX_PATH * 3,
                L"powershell -WindowStyle Hidden -Command \"[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; try { (New-Object Net.WebClient).DownloadFile('https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe', '%s') } catch {}\"",
                szYtDlp);
            STARTUPINFOW si;
            PROCESS_INFORMATION pi;
            ZeroMemory(&si, sizeof(si));
            si.cb = sizeof(si);
            si.dwFlags = STARTF_USESHOWWINDOW;
            si.wShowWindow = SW_HIDE;
            ZeroMemory(&pi, sizeof(pi));
            if (CreateProcessW(NULL, psCmd, NULL, NULL, FALSE, CREATE_NO_WINDOW, NULL, szAppDir, &si, &pi)) {
                WaitForSingleObject(pi.hProcess, 20000);
                CloseHandle(pi.hProcess);
                CloseHandle(pi.hThread);
            }
        }
    }
}

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPWSTR lpCmdLine, int nCmdShow) {
    (void)hInstance; (void)hPrevInstance; (void)lpCmdLine; (void)nCmdShow;

    // 1. Get current directory of this executable
    GetModuleFileNameW(NULL, szAppDir, MAX_PATH);
    WCHAR* pLastSlash = wcsrchr(szAppDir, L'\\');
    if (pLastSlash) {
        *pLastSlash = L'\0';
    }
    SetCurrentDirectoryW(szAppDir);

    // 2. Ensure yt-dlp.exe is available
    EnsureYtDlp();

    // 3. Check for Python scripts
    WCHAR szServerPy[MAX_PATH];
    _snwprintf(szServerPy, MAX_PATH, L"%s\\server.py", szAppDir);
    BOOL bHasServerPy = FileExists(szServerPy);

    WCHAR szPythonScript[MAX_PATH];
    _snwprintf(szPythonScript, MAX_PATH, L"%s\\youtube_mp3_downloader.py", szAppDir);
    BOOL bHasPythonScript = FileExists(szPythonScript);

    // 4. Check for Web app (package.json or server.ts)
    WCHAR szPackageJson[MAX_PATH];
    _snwprintf(szPackageJson, MAX_PATH, L"%s\\package.json", szAppDir);
    BOOL bHasPackageJson = FileExists(szPackageJson);

    // Check if Node.js is installed
    BOOL bHasNode = CommandExists(L"node -v");
    // Check if Python is installed
    BOOL bHasPython = CommandExists(L"python --version") || CommandExists(L"py --version");

    // Strategy 1: If server.py exists and Python is available -> launch Web Studio server
    if (bHasServerPy && bHasPython) {
        WCHAR szCmd[MAX_PATH * 2];
        _snwprintf(szCmd, MAX_PATH * 2, L"python.exe \"%s\"", szServerPy);

        STARTUPINFOW si;
        PROCESS_INFORMATION pi;
        ZeroMemory(&si, sizeof(si));
        si.cb = sizeof(si);
        si.dwFlags = STARTF_USESHOWWINDOW;
        si.wShowWindow = SW_SHOWMINIMIZED;
        ZeroMemory(&pi, sizeof(pi));

        if (CreateProcessW(NULL, szCmd, NULL, NULL, FALSE, 0, NULL, szAppDir, &si, &pi)) {
            CloseHandle(pi.hProcess);
            CloseHandle(pi.hThread);
            return 0;
        }

        // Try py.exe if python.exe failed
        _snwprintf(szCmd, MAX_PATH * 2, L"py.exe \"%s\"", szServerPy);
        if (CreateProcessW(NULL, szCmd, NULL, NULL, FALSE, 0, NULL, szAppDir, &si, &pi)) {
            CloseHandle(pi.hProcess);
            CloseHandle(pi.hThread);
            return 0;
        }
    }

    // Strategy 2: If Node is installed and package.json exists -> start web app
    if (bHasNode && bHasPackageJson) {
        WCHAR szCmd[MAX_PATH * 2];
        _snwprintf(szCmd, MAX_PATH * 2, L"cmd.exe /c \"Inditas.bat\"");

        STARTUPINFOW si;
        PROCESS_INFORMATION pi;
        ZeroMemory(&si, sizeof(si));
        si.cb = sizeof(si);
        si.dwFlags = STARTF_USESHOWWINDOW;
        si.wShowWindow = SW_SHOWMINIMIZED;
        ZeroMemory(&pi, sizeof(pi));

        CreateProcessW(NULL, szCmd, NULL, NULL, FALSE, 0, NULL, szAppDir, &si, &pi);
        if (pi.hProcess) {
            CloseHandle(pi.hProcess);
            CloseHandle(pi.hThread);
        }

        // Open browser after short delay
        Sleep(1500);
        ShellExecuteW(NULL, L"open", L"http://localhost:3000", NULL, NULL, SW_SHOWNORMAL);
        return 0;
    }

    // Strategy 3: If Python script exists -> start Python GUI
    if (bHasPythonScript) {
        HINSTANCE hInst = ShellExecuteW(NULL, L"open", L"pythonw.exe", szPythonScript, szAppDir, SW_SHOWNORMAL);
        if ((INT_PTR)hInst > 32) return 0;

        hInst = ShellExecuteW(NULL, L"open", L"pyw.exe", szPythonScript, szAppDir, SW_SHOWNORMAL);
        if ((INT_PTR)hInst > 32) return 0;

        hInst = ShellExecuteW(NULL, L"open", L"python.exe", szPythonScript, szAppDir, SW_SHOWNORMAL);
        if ((INT_PTR)hInst > 32) return 0;

        hInst = ShellExecuteW(NULL, L"open", L"py.exe", szPythonScript, szAppDir, SW_SHOWNORMAL);
        if ((INT_PTR)hInst > 32) return 0;

        hInst = ShellExecuteW(NULL, L"open", szPythonScript, NULL, szAppDir, SW_SHOWNORMAL);
        if ((INT_PTR)hInst > 32) return 0;
    }

    // Strategy C: If Node is present but only python script is missing, or vice versa
    if (bHasPythonScript && !bHasPython && !bHasNode) {
        int choice = MessageBoxW(NULL,
            L"A YouTube MP3 \x00E9s Vide\x00F3 Let\x00F6lt\x0151 Studio futtat\x00E1s\x00E1hoz Python vagy Node.js sz\x00FCks\x00E9ges.\n\n"
            L"Szeretn\x00E9d, hogy megnyissuk a hivatalos, ingyenes Python let\x00F6lt\x00E9si oldalt (https://www.python.org)?\n\n"
            L"(Tipp: A Python telep\x00EDt\x00E9sekor pip\x00E1ld be az 'Add Python to PATH' opci\x00F3t!)",
            L"YouTube Let\x00F6lt\x0151 - Sz\x00FCks\x00E9ges K\x00F6rnyezet",
            MB_YESNO | MB_ICONINFORMATION);

        if (choice == IDYES) {
            ShellExecuteW(NULL, L"open", L"https://www.python.org/downloads/", NULL, NULL, SW_SHOWNORMAL);
        }
        return 0;
    }

    // Default fallback: Run Inditas.bat
    WCHAR szBatPath[MAX_PATH];
    _snwprintf(szBatPath, MAX_PATH, L"%s\\Inditas.bat", szAppDir);
    if (FileExists(szBatPath)) {
        ShellExecuteW(NULL, L"open", szBatPath, NULL, szAppDir, SW_SHOWNORMAL);
        return 0;
    }

    MessageBoxW(NULL,
        L"A program ind\x00EDt\x00E1sa nem siker\x00FClt. K\x00E9rj\x00FCk ellen\x0151rizd a telep\x00EDt\x00E9si mapp\x00E1t!",
        L"Hiba", MB_OK | MB_ICONERROR);
    return 1;
}
