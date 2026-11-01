export type AppTheme = 'cyber-indigo' | 'emerald-matrix' | 'sunset-amber' | 'light-studio';

export interface ThemeConfig {
  id: AppTheme;
  name: string;
  badgeName: string;
  description: string;
  previewColors: [string, string, string]; // 3 representative hex/color codes
  soundwaveImage: string;
  isLight: boolean;
  
  // Style class mappings
  classes: {
    bgCanvas: string;
    textPrimary: string;
    textMuted: string;
    navbarBg: string;
    navbarBorder: string;
    brandGlow: string;
    brandGradient: string;
    activeTab: string;
    inactiveTab: string;
    cardBg: string;
    cardBorder: string;
    heroGradient: string;
    heroBorder: string;
    inputBg: string;
    inputBorder: string;
    inputFocus: string;
    primaryBtn: string;
    accentText: string;
    secondaryAccentText: string;
    progressBar: string;
    playerBg: string;
    playerBorder: string;
    playBtn: string;
    scrubberAccent: string;
  };
}

import cyberImg from './assets/images/neon_blue_purple_soundwave_1791124996847.jpg';
import emeraldImg from './assets/images/emerald_matrix_soundwave_1791175335779.jpg';
import sunsetImg from './assets/images/sunset_amber_soundwave_1791175346458.jpg';

export const THEMES: Record<AppTheme, ThemeConfig> = {
  'cyber-indigo': {
    id: 'cyber-indigo',
    name: 'Kék - Fehér - Lila (Kozmikus)',
    badgeName: 'Kék-Fehér-Lila',
    description: 'Mély éjkék háttér, ragyogó elektromos kék és királylila gradiens, kristálytiszta fehér betűk.',
    previewColors: ['#3B82F6', '#FFFFFF', '#8B5CF6'],
    soundwaveImage: cyberImg,
    isLight: false,
    classes: {
      bgCanvas: 'bg-slate-950 text-white',
      textPrimary: 'text-white',
      textMuted: 'text-slate-300',
      navbarBg: 'bg-slate-950/90',
      navbarBorder: 'border-purple-500/20',
      brandGlow: 'shadow-purple-600/25',
      brandGradient: 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 border-purple-400/30',
      activeTab: 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border-blue-500/40 shadow-sm',
      inactiveTab: 'text-slate-300 hover:text-white hover:bg-slate-900/80',
      cardBg: 'bg-slate-900/40',
      cardBorder: 'border-slate-800',
      heroGradient: 'bg-gradient-to-br from-slate-950 via-slate-900/90 to-blue-950/40',
      heroBorder: 'border-blue-500/20',
      inputBg: 'bg-slate-950',
      inputBorder: 'border-slate-800',
      inputFocus: 'focus:border-blue-500 focus:ring-blue-500/20',
      primaryBtn: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-xl shadow-purple-600/25 border-purple-400/20',
      accentText: 'text-blue-400',
      secondaryAccentText: 'text-purple-400',
      progressBar: 'bg-gradient-to-r from-blue-500 to-purple-500',
      playerBg: 'bg-slate-950/95',
      playerBorder: 'border-purple-500/30',
      playBtn: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-purple-600/30 border-purple-400/30',
      scrubberAccent: 'accent-purple-500',
    },
  },

  'emerald-matrix': {
    id: 'emerald-matrix',
    name: 'Smaragd & Menta (Matrix)',
    badgeName: 'Smaragd-Menta',
    description: 'Sötét obszidián háttér, ragyogó smaragdzöld és friss menta teal fények, fehér kiemelésekkel.',
    previewColors: ['#10B981', '#FFFFFF', '#06B6D4'],
    soundwaveImage: emeraldImg,
    isLight: false,
    classes: {
      bgCanvas: 'bg-[#040e0b] text-white',
      textPrimary: 'text-white',
      textMuted: 'text-emerald-100/70',
      navbarBg: 'bg-[#040e0b]/90',
      navbarBorder: 'border-emerald-500/20',
      brandGlow: 'shadow-emerald-600/25',
      brandGradient: 'bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 border-emerald-400/30',
      activeTab: 'bg-gradient-to-r from-emerald-600/30 to-teal-600/30 text-white border-emerald-500/40 shadow-sm',
      inactiveTab: 'text-emerald-200/70 hover:text-white hover:bg-emerald-950/40',
      cardBg: 'bg-[#071913]/60',
      cardBorder: 'border-emerald-900/40',
      heroGradient: 'bg-gradient-to-br from-[#040e0b] via-[#071913]/90 to-emerald-950/40',
      heroBorder: 'border-emerald-500/20',
      inputBg: 'bg-[#030907]',
      inputBorder: 'border-emerald-900/60',
      inputFocus: 'focus:border-emerald-500 focus:ring-emerald-500/20',
      primaryBtn: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-xl shadow-emerald-600/25 border-emerald-400/25',
      accentText: 'text-emerald-400',
      secondaryAccentText: 'text-cyan-400',
      progressBar: 'bg-gradient-to-r from-emerald-500 to-cyan-500',
      playerBg: 'bg-[#030907]/95',
      playerBorder: 'border-emerald-500/30',
      playBtn: 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-600/30 border-emerald-400/30',
      scrubberAccent: 'accent-emerald-500',
    },
  },

  'sunset-amber': {
    id: 'sunset-amber',
    name: 'Naplemente & Borostyán',
    badgeName: 'Naplemente',
    description: 'Meleg titánium és tüzes korall rózsa, borostyán arany fényekkel és kristályfehér feliratokkal.',
    previewColors: ['#F43F5E', '#FFFFFF', '#F59E0B'],
    soundwaveImage: sunsetImg,
    isLight: false,
    classes: {
      bgCanvas: 'bg-[#0e0709] text-white',
      textPrimary: 'text-white',
      textMuted: 'text-rose-100/70',
      navbarBg: 'bg-[#0e0709]/90',
      navbarBorder: 'border-rose-500/20',
      brandGlow: 'shadow-rose-600/25',
      brandGradient: 'bg-gradient-to-tr from-rose-600 via-amber-600 to-orange-500 border-rose-400/30',
      activeTab: 'bg-gradient-to-r from-rose-600/30 to-amber-600/30 text-white border-rose-500/40 shadow-sm',
      inactiveTab: 'text-rose-200/70 hover:text-white hover:bg-rose-950/40',
      cardBg: 'bg-[#180b10]/60',
      cardBorder: 'border-rose-900/40',
      heroGradient: 'bg-gradient-to-br from-[#0e0709] via-[#180b10]/90 to-rose-950/40',
      heroBorder: 'border-rose-500/20',
      inputBg: 'bg-[#080405]',
      inputBorder: 'border-rose-900/60',
      inputFocus: 'focus:border-rose-500 focus:ring-rose-500/20',
      primaryBtn: 'bg-gradient-to-r from-rose-600 via-amber-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white shadow-xl shadow-rose-600/25 border-rose-400/25',
      accentText: 'text-rose-400',
      secondaryAccentText: 'text-amber-400',
      progressBar: 'bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500',
      playerBg: 'bg-[#080405]/95',
      playerBorder: 'border-rose-500/30',
      playBtn: 'bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white shadow-rose-600/30 border-rose-400/30',
      scrubberAccent: 'accent-rose-500',
    },
  },

  'light-studio': {
    id: 'light-studio',
    name: 'Tiszta Világos Stúdió',
    badgeName: 'Világos Stúdió',
    description: 'Hófehér porcelán háttér, elegáns palaszürke kártyák és zafírkék-lila precíz vezérlők.',
    previewColors: ['#2563EB', '#0F172A', '#7C3AED'],
    soundwaveImage: cyberImg,
    isLight: true,
    classes: {
      bgCanvas: 'bg-slate-50 text-slate-900',
      textPrimary: 'text-slate-900',
      textMuted: 'text-slate-600',
      navbarBg: 'bg-white/90',
      navbarBorder: 'border-slate-200',
      brandGlow: 'shadow-blue-600/20',
      brandGradient: 'bg-gradient-to-tr from-blue-600 to-indigo-600 border-blue-500/20',
      activeTab: 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm font-semibold',
      inactiveTab: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
      cardBg: 'bg-white shadow-md shadow-slate-200/50',
      cardBorder: 'border-slate-200',
      heroGradient: 'bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/40 shadow-sm',
      heroBorder: 'border-blue-100',
      inputBg: 'bg-white',
      inputBorder: 'border-slate-300',
      inputFocus: 'focus:border-blue-600 focus:ring-blue-600/20',
      primaryBtn: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/20 border-blue-500/30',
      accentText: 'text-blue-600',
      secondaryAccentText: 'text-indigo-600',
      progressBar: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      playerBg: 'bg-white/95 shadow-2xl',
      playerBorder: 'border-slate-200',
      playBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 border-blue-500',
      scrubberAccent: 'accent-blue-600',
    },
  },
};
