import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Download, X } from 'lucide-react';
import { DownloadedFile } from '../types';
import { LocalizedMarkup } from '../localized';

interface AudioPlayerBarProps {
  currentTrack: DownloadedFile | null;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentTrack,
  onClose,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [currentTrack]);

  if (!currentTrack) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (!duration || isNaN(duration)) {
        setDuration(audioRef.current.duration || 0);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatSeconds = (sec: number) => {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <LocalizedMarkup>
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-purple-500/30 bg-slate-950/95 backdrop-blur-xl px-4 py-3 shadow-2xl">
      <audio
        ref={audioRef}
        src={currentTrack.streamUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Track Title and info */}
        <div className="flex items-center gap-3 min-w-0 max-w-[280px] sm:max-w-xs md:max-w-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-950/60 text-blue-400 border border-blue-500/40 shadow-sm">
            <span className="font-mono text-xs font-bold uppercase">{currentTrack.format}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{currentTrack.displayName}</p>
            <p className="text-xs text-purple-300 font-mono tabular-nums">{currentTrack.sizeFormatted}</p>
          </div>
        </div>

        {/* Center Controls & Scrubber */}
        <div className="flex flex-1 max-w-xl flex-col items-center gap-1">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-purple-600/30 transition-all border border-purple-400/30"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
          </div>

          <div className="flex w-full items-center gap-3">
            <span className="text-[11px] font-mono tabular-nums text-slate-400 min-w-[32px] text-right">
              {formatSeconds(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-purple-500 focus:outline-none"
            />
            <span className="text-[11px] font-mono tabular-nums text-slate-400 min-w-[32px]">
              {formatSeconds(duration)}
            </span>
          </div>
        </div>

        {/* Volume & Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="text-slate-400 hover:text-white transition-colors">
              {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-blue-400" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="h-1.5 w-20 cursor-pointer appearance-none rounded-lg bg-slate-800 accent-blue-500"
            />
          </div>

          <a
            href={currentTrack.downloadUrl}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-purple-500/30"
          >
            <Download className="h-3.5 w-3.5 text-blue-400" />
            Mentés
          </a>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
    </LocalizedMarkup>
  );
};
