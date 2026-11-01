import React from 'react';
import { Download, ListMusic, Layers, Music, Terminal, BookOpen, CheckCircle2, AlertCircle, FolderArchive } from 'lucide-react';
import { SystemStatus } from '../types';
import { AppTheme, THEMES } from '../theme';
import { ThemeSelector } from './ThemeSelector';
import { LANGUAGES, Language, translate } from '../i18n';
import { LocalizedMarkup } from '../localized';

interface NavbarProps {
  activeTab: 'single' | 'playlist' | 'batch' | 'library' | 'windows' | 'guide';
  setActiveTab: (tab: 'single' | 'playlist' | 'batch' | 'library' | 'windows' | 'guide') => void;
  systemStatus: SystemStatus | null;
  filesCount: number;
  currentTheme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  onOpenInstaller: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  systemStatus,
  filesCount,
  currentTheme,
  onThemeChange,
  onOpenInstaller,
  language,
  onLanguageChange,
}) => {
  const theme = THEMES[currentTheme];
  const t = (key: string) => translate(language, key);

  return (
    <LocalizedMarkup>
    <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 ${theme.classes.navbarBg} ${theme.classes.navbarBorder}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand title wordmark */}
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-lg border transition-all ${theme.classes.brandGradient} ${theme.classes.brandGlow}`}>
            <Download className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className={`text-base font-bold tracking-tight flex items-center gap-2 ${theme.classes.textPrimary}`}>
              TubeRip Studio
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Including Dedicated Playlist Tab) */}
        <nav className="hidden lg:flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('single')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'single'
                ? theme.classes.activeTab
                : theme.classes.inactiveTab
            }`}
          >
            <Download className="h-4 w-4" />
            {t('single')}
          </button>

          <button
            onClick={() => setActiveTab('playlist')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'playlist'
                ? theme.classes.activeTab
                : theme.classes.inactiveTab
            }`}
          >
            <ListMusic className="h-4 w-4 text-purple-400" />
            {t('playlist')}
          </button>

          <button
            onClick={() => setActiveTab('batch')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'batch'
                ? theme.classes.activeTab
                : theme.classes.inactiveTab
            }`}
          >
            <Layers className="h-4 w-4" />
            {t('batch')}
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'library'
                ? theme.classes.activeTab
                : theme.classes.inactiveTab
            }`}
          >
            <Music className="h-4 w-4" />
            {t('library')}
            {filesCount > 0 && (
              <span className="ml-1 text-xs font-mono tabular-nums opacity-80">
                ({filesCount})
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('windows')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'windows'
                ? theme.classes.activeTab
                : theme.classes.inactiveTab
            }`}
          >
            <Terminal className="h-4 w-4 text-purple-400" />
            {t('windows')}
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'guide'
                ? theme.classes.activeTab
                : theme.classes.inactiveTab
            }`}
          >
            <BookOpen className="h-4 w-4" />
            {t('guide')}
          </button>
        </nav>

        {/* Zone 3: Actions - Installer ZIP button + Theme selector + Engine status */}
        <div className="flex items-center gap-2.5">
          {/* 1-Click Installer ZIP Trigger */}
          <button
            onClick={onOpenInstaller}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-500/40 bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 text-xs font-bold transition-all shadow-sm whitespace-nowrap"
            title="Windows Telepítő Csomag és Útmutató letöltése"
          >
            <FolderArchive className="h-4 w-4 text-purple-400" />
            <span className="hidden sm:inline">Installer (.ZIP)</span>
          </button>

          {/* Theme Selector Dropdown */}
          <ThemeSelector
            currentTheme={currentTheme}
            onThemeChange={onThemeChange}
          />

          {/* Engine status */}
          <div className="hidden xl:flex items-center gap-2 text-xs border px-2.5 py-1.5 rounded-xl bg-slate-900/40 border-slate-700/60">
            {systemStatus?.ready ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-mono text-[11px] text-slate-300">yt-dlp OK</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-[11px]">Indítás...</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex lg:hidden overflow-x-auto border-t border-slate-800/80 px-4 py-2 gap-2 bg-slate-950/95">
        <button
          onClick={() => setActiveTab('single')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'single' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          {t('single')}
        </button>
        <button
          onClick={() => setActiveTab('playlist')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'playlist' ? 'bg-purple-600 text-white' : 'text-slate-400'
          }`}
        >
          {t('playlist')}
        </button>
        <button
          onClick={() => setActiveTab('batch')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'batch' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          {t('batch')}
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'library' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          {t('library')} ({filesCount})
        </button>
        <button
          onClick={() => setActiveTab('windows')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'windows' ? 'bg-purple-600 text-white' : 'text-slate-400'
          }`}
        >
          {t('windows')}
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'guide' ? 'bg-purple-600 text-white' : 'text-slate-400'
          }`}
        >
          {t('guide')}
        </button>
      </div>
      <div className="flex items-center justify-end border-t border-slate-800/80 bg-slate-950/90 px-4 py-2 sm:px-6 lg:px-8">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300" title={t('language')}>
          <span>{t('language')}</span>
          <select aria-label={t('language')} value={language} onChange={(event) => onLanguageChange(event.target.value as Language)} className="min-w-[132px] rounded-lg border border-blue-500/50 bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
            {LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
          </select>
        </label>
      </div>
    </header>
    </LocalizedMarkup>
  );
};
