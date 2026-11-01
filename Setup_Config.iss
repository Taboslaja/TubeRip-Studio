; ============================================================================
;  Inno Setup Script - YouTube MP3 & Videó Letöltő Studio
;  Klasszikus Windows Telepítő Varázsló Célmappa Választóval
;  (A képen látható szabványos Windows Installer elkészítéséhez)
; ============================================================================

[Setup]
AppId={{C6B5083B-1B4A-4DF1-997A-885E4E302F8E}
AppName=YouTube MP3 & Videó Letöltő Studio
AppVersion=2.5.0
AppPublisher=YouTube Downloader Studio
DefaultDirName={autopf}\YouTube Downloader Studio
DefaultGroupName=YouTube MP3 Letöltő
AllowNoIcons=yes
OutputDir=dist
OutputBaseFilename=YouTube_Downloader_Setup
Compression=lzma2/max
SolidCompression=yes
WizardStyle=modern
DisableProgramGroupPage=no
PrivilegesRequired=lowest

[Languages]
Name: "hungarian"; MessagesFile: "compiler:Languages\Hungarian.isl"
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "youtube_mp3_downloader.py"; DestDir: "{app}"; Flags: ignoreversion
Source: "run.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "TELEPITESI_UTMUTATO.txt"; DestDir: "{app}"; Flags: ignoreversion
; Ha rendelkezesre all a yt-dlp.exe, csomagolja be
Source: "yt-dlp.exe"; DestDir: "{app}"; Flags: ignoreversion skipifsourcedoesntexist

[Icons]
Name: "{group}\YouTube MP3 Letöltő"; Filename: "{app}\run.bat"
Name: "{group}\{cm:UninstallProgram,YouTube MP3 Letöltő}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\YouTube MP3 Letöltő"; Filename: "{app}\run.bat"; Tasks: desktopicon

[Run]
Filename: "{app}\run.bat"; Description: "{cm:LaunchProgram,YouTube MP3 Letöltő}"; Flags: nowait postinstall skipifsilent
