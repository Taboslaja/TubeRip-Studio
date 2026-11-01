import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';
import { AppTheme, THEMES } from '../theme';
import { LocalizedMarkup } from '../localized';

interface ThemeSelectorProps {
  currentTheme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const active = THEMES[currentTheme];

  return (
    <LocalizedMarkup>
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-700/60 bg-slate-900/60 hover:bg-slate-800/80 transition-all text-xs font-semibold shadow-sm"
        title="Téma választása"
      >
        <Palette className="h-4 w-4 text-purple-400" />
        <span className="hidden sm:inline text-slate-200">{active.badgeName}</span>
        {/* Swatch dots */}
        <div className="flex items-center -space-x-1 ml-1">
          {active.previewColors.map((color, idx) => (
            <span
              key={idx}
              className="h-2.5 w-2.5 rounded-full ring-1 ring-black/40"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-xl p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              Téma választása (4 Téma)
            </span>
            <span>4 stílus</span>
          </div>

          <div className="space-y-1.5">
            {Object.values(THEMES).map((theme) => {
              const isSelected = theme.id === currentTheme;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-start justify-between gap-3 p-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border border-purple-500/40 text-white'
                      : 'hover:bg-slate-900 text-slate-300 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">{theme.name}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 text-purple-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {theme.description}
                    </p>
                  </div>

                  {/* Swatches */}
                  <div className="flex items-center gap-1 shrink-0 pt-0.5">
                    {theme.previewColors.map((c, i) => (
                      <span
                        key={i}
                        className="h-3.5 w-3.5 rounded-full border border-black/30 shadow-sm"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
    </LocalizedMarkup>
  );
};
