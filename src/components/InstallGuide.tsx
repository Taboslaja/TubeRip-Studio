import React, { useState } from 'react';
import {
  BookOpen,
  Terminal,
  Check,
  Copy,
  Download,
  AlertCircle,
  FolderArchive,
  FileText,
  Layers,
  HelpCircle,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { AppTheme, THEMES } from '../theme';
import { LocalizedMarkup } from '../localized';

interface InstallGuideProps {
  currentTheme?: AppTheme;
  onOpenInstaller?: () => void;
}

export const InstallGuide: React.FC<InstallGuideProps> = ({
  currentTheme = 'cyber-indigo',
  onOpenInstaller,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const theme = THEMES[currentTheme];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const codeSnippets = {
    pipInstall: 'pip install pyinstaller yt-dlp',
    runPy: 'python youtube_mp3_downloader.py',
    compileExe: 'py -m PyInstaller --onefile --windowed --clean --name "YouTube MP3 Downloader" "youtube_mp3_downloader.py"',
  };

  return (
    <LocalizedMarkup>
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className={`rounded-2xl border p-6 sm:p-8 backdrop-blur-md transition-all ${theme.classes.heroGradient} ${theme.classes.heroBorder}`}>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-blue-400">
          <BookOpen className="h-4 w-4" />
          <span>Hivatalos Telepítési & Használati Útmutató</span>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${theme.classes.textPrimary}`}>
          Hogyan használd a letöltőt weboldalon vagy önálló Windows programként?
        </h1>
        <p className={`text-sm mt-2 max-w-3xl leading-relaxed ${theme.classes.textMuted}`}>
          Az alkalmazás kétféleképpen is használható: közvetlenül itt a böngésződben (semmilyen telepítés nélkül), vagy letöltheted a forráskódot és a mellékelt automata Windows telepítőt (install.bat), amely mindent beállít helyetted.
        </p>

        {/* 1-Click Installer Box inside Guide */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-purple-500/30 bg-purple-950/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40">
              <FolderArchive className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                Automata Windows Telepítő Csomag (.ZIP)
              </span>
              <p className="text-[11px] text-slate-300">
                Tartalmazza az automata <code className="text-white">install.bat</code>-ot és a <code className="text-white">TELEPITESI_UTMUTATO.txt</code> fájlt.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/api/download/telepitesi-utmutato"
              download
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
            >
              <FileText className="h-3.5 w-3.5 text-blue-400" />
              <span>TXT Leírás</span>
            </a>

            <a
              href="/api/download/installer-zip"
              download
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white shadow-md transition-all ${theme.classes.primaryBtn} whitespace-nowrap`}
            >
              <Download className="h-4 w-4" />
              <span>ZIP Letöltése</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mode 1: Webes használat */}
      <div className={`rounded-2xl border p-6 sm:p-8 space-y-6 ${theme.classes.cardBg} ${theme.classes.cardBorder}`}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">1. Módszer (A leggyorsabb)</span>
            <h2 className={`text-lg font-bold ${theme.classes.textPrimary}`}>Használat a Webes Felületen (Telepítés nélkül)</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold">
              <span>01. LÉPÉS</span>
            </div>
            <h3 className="font-semibold text-white text-sm">YouTube Link Beillesztése</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Másold ki a letölteni kívánt videó vagy zene linkjét a YouTube-ról, és kattints a webes felületen a <strong className="text-white">„Beillesztés”</strong> gombra.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
              <span>02. LÉPÉS</span>
            </div>
            <h3 className="font-semibold text-white text-sm">Formátum és Minőség Választás</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Válaszd ki az <strong className="text-white">MP3 Zene (320 kbps)</strong> vagy az <strong className="text-white">MP4 Videó (1080p)</strong> opciót. A rendszer automatikusan betölti a borítóképet és az adatokat.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
              <span>03. LÉPÉS</span>
            </div>
            <h3 className="font-semibold text-white text-sm">Letöltés és Mentés</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kattints a nagy gombra. A háttérben lefut a letöltés és az FFmpeg konvertálás, majd egy kattintással elmentheted a fájlt a gépedre, vagy meg is hallgathatod a beépített lejátszóban.
            </p>
          </div>
        </div>

        {/* Feature spotlight: Playlist Mode */}
        <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-950/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-purple-500/40 text-purple-200 font-mono text-[10px]">ÚJ FUNKCIÓ</span>
              YouTube Lejátszási Listák & Albumok Letöltése
            </span>
            <p className="text-purple-200/80 leading-relaxed text-[11px]">
              Válts át a felső <strong className="text-white">„Lejátszási Lista (Playlist)”</strong> fülre egy teljes YouTube lista linkjével! A program betölti az összes dalt, lehetővé teszi az egyenkénti kijelölést, az album sorszámozást (pl. 01 - Dal címe), és befejezéskor akár egyetlen letölthető <strong>.ZIP archívumba</strong> csomagolja az összes zeneszámot.
            </p>
          </div>
        </div>
      </div>

      {/* Mode 2: Windows Asztali EXE Telepítés */}
      <div className={`rounded-2xl border p-6 sm:p-8 space-y-6 ${theme.classes.cardBg} ${theme.classes.cardBorder}`}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
            <Laptop className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">2. Módszer (Helyi asztali program)</span>
            <h2 className={`text-lg font-bold ${theme.classes.textPrimary}`}>Önálló Windows .EXE Készítése az Automata Installerrel</h2>
          </div>
        </div>

        <p className={`text-xs leading-relaxed ${theme.classes.textMuted}`}>
          Ha internet nélkül vagy böngésző nélkül szeretnél egy saját Windows asztali programot futtatni, kövesd az alábbi egyszerű lépéseket:
        </p>

        {/* Step 1 */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-blue-400">1. LÉPÉS: Python telepítése (ha még nincs fent)</span>
            <a
              href="https://www.python.org/downloads/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 underline underline-offset-4"
            >
              <span>python.org</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <p className="text-xs text-slate-300">
            Töltsd le és telepítsd a Python legfrissebb verzióját.
          </p>
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <span>
              <strong>Kiemelten FONTOS:</strong> A telepítő legelső ablakának alján mindenképp pipáld be az <strong className="underline">„Add python.exe to PATH”</strong> négyzetet! Enélkül a parancssor nem fogja felismerni a <code className="text-white">py</code> vagy <code className="text-white">pip</code> parancsot.
            </span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/80 space-y-3">
          <span className="text-xs font-mono font-bold text-purple-400">2. LÉPÉS: A ZIP csomag kicsomagolása</span>
          <p className="text-xs text-slate-300">
            Csomagold ki a letöltött <code className="text-white">YouTube_Downloader_Telepito_Csomag.zip</code> fájlt a saját gépeden egy tetszőleges mappába.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-purple-300 font-mono text-xs font-semibold block">setup_installer.py</span>
              <span className="text-[11px] text-slate-400">Grafikus Telepítő Varázsló célmappa választóval</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-blue-300 font-mono text-xs font-semibold block">build_setup_exe.bat</span>
              <span className="text-[11px] text-slate-400">Önálló YouTube_Downloader_Setup.exe fordító</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-emerald-300 font-mono text-xs font-semibold block">Setup_Config.iss</span>
              <span className="text-[11px] text-slate-400">Inno Setup klasszikus telepítő script</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/80 space-y-3">
          <span className="text-xs font-mono font-bold text-emerald-400">3. LÉPÉS: A Grafikus Telepítő Varázsló futtatása</span>
          <p className="text-xs text-slate-300 leading-relaxed">
            Kattints duplán a <strong className="text-white">setup_installer.py</strong> fájlra (vagy futtasd a <strong className="text-white">build_setup_exe.bat</strong>-ot egy önálló <code className="text-purple-300">Setup.exe</code> elkészítéséhez)!
          </p>
          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-purple-500/30 text-xs text-slate-200 space-y-1.5">
            <div className="font-semibold text-white flex items-center gap-2">
              <Laptop className="h-4 w-4 text-purple-400" />
              <span>A Telepítő Varázslóban megadható beállítások:</span>
            </div>
            <div>• <strong>Célmappa kiválasztása:</strong> A „Tallózás...” gombbal saját magad adhatod meg a telepítés helyét (pl. <code>C:\Program Files\YouTube Downloader Studio</code> vagy <code>C:\YouTubeDownloader</code>).</div>
            <div>• <strong>Lemezterület ellenőrzése:</strong> A telepítő azonnal kiszámolja és megmutatja a szabad helyet.</div>
            <div>• <strong>Asztali ikon:</strong> Automatikusan létrehozza a „YouTube MP3 Letöltő” közvetlen parancsikont az Asztalon.</div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>
              A telepítés befejezése után a program azonnal elindul, és támogatja az egyedi videók és a komplett YouTube listák (playlist) letöltését is!
            </span>
          </div>
        </div>
      </div>

      {/* FAQ & Troubleshooting */}
      <div className={`rounded-2xl border p-6 space-y-4 ${theme.classes.cardBg} ${theme.classes.cardBorder}`}>
        <h3 className={`text-base font-bold flex items-center gap-2 ${theme.classes.textPrimary}`}>
          <HelpCircle className="h-5 w-5 text-purple-400" />
          Gyakori Kérdések és Hibaelhárítás (GYIK)
        </h3>

        <div className="space-y-3 text-xs">
          <details className="group rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 transition-colors">
            <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
              <span>Miért nem találja a rendszer a pip vagy python parancsot?</span>
              <span className="text-purple-400 text-sm transition-transform group-open:rotate-180">↓</span>
            </summary>
            <p className="mt-2 text-slate-300 leading-relaxed">
              A Python telepítésekor elmaradt az „Add Python to PATH” bejelölése. Nyisd meg újra a Python telepítőt, válaszd a „Modify” opciót, és pipáld be a PATH hozzáadást, vagy indítsd újra a számítógéped a módosítás után.
            </p>
          </details>

          <details className="group rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 transition-colors">
            <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
              <span>Hová menti a letöltött MP3 és videó fájlokat a program?</span>
              <span className="text-purple-400 text-sm transition-transform group-open:rotate-180">↓</span>
            </summary>
            <p className="mt-2 text-slate-300 leading-relaxed">
              A webes felületen a böngésződ alapértelmezett letöltési mappájába (általában <code>C:\Users\Név\Downloads</code>) kerülnek. Az asztali Windows programban pedig kiválaszthatod a „Tallózás” gombbal a tetszőleges célmappát.
            </p>
          </details>

          <details className="group rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 transition-colors">
            <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
              <span>Hogyan érhető el a maximális 320 kbps MP3 hangminőség?</span>
              <span className="text-purple-400 text-sm transition-transform group-open:rotate-180">↓</span>
            </summary>
            <p className="mt-2 text-slate-300 leading-relaxed">
              A letöltő automatikusan a legmagasabb minőségű hangsávot nyeri ki és FFmpeg segítségével 320 kbps-os ID3 borítóképes MP3-má alakítja át veszteség nélkül.
            </p>
          </details>
        </div>
      </div>
    </div>
    </LocalizedMarkup>
  );
};
