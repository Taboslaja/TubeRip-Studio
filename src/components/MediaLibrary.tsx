import React, { useState } from 'react';
import { DownloadedFile } from '../types';
import { Play, Download, Trash2, Music, RefreshCw, X, FolderOpen } from 'lucide-react';
import { LocalizedMarkup } from '../localized';

interface MediaLibraryProps {
  files: DownloadedFile[];
  onPlayTrack: (file: DownloadedFile) => void;
  onRefresh: () => void;
  onGoToDownloader: () => void;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({
  files,
  onPlayTrack,
  onRefresh,
  onGoToDownloader,
}) => {
  const [filter, setFilter] = useState<'all' | 'audio' | 'video'>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<DownloadedFile | null>(null);

  const filteredFiles = files.filter((f) => {
    if (filter === 'audio') return f.format === 'mp3' || f.format === 'm4a' || f.format === 'wav';
    if (filter === 'video') return f.format === 'mp4' || f.format === 'webm';
    return true;
  });

  const handleDelete = async (fileName: string) => {
    if (!confirm('Biztosan törölni szeretnéd ezt a fájlt?')) return;
    try {
      const res = await fetch(`/api/files/${encodeURIComponent(fileName)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <LocalizedMarkup>
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-blue-400" />
            Letöltött Médiafájlok & Lejátszó
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Itt találod a helyben konvertált MP3 és MP4 fájlokat. Lejátszhatod és azonnal elmentheted őket.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter segment control */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mind ({files.length})
            </button>
            <button
              onClick={() => setFilter('audio')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === 'audio'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hang (MP3)
            </button>
            <button
              onClick={() => setFilter('video')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === 'video'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Videó (MP4)
            </button>
          </div>

          <button
            onClick={onRefresh}
            title="Frissítés"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl border border-slate-800 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Files List */}
      {filteredFiles.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-purple-500/20 text-purple-400 shadow-inner">
            <Music className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">Még nincs letöltött fájl</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Illessz be egy YouTube videó linket a letöltőben, és alakítsd át MP3-ba vagy MP4-be.
            </p>
          </div>
          <button
            onClick={onGoToDownloader}
            className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl shadow-lg shadow-purple-600/20 transition-all cursor-pointer border border-purple-400/20"
          >
            Videó vagy Zene Letöltése
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden divide-y divide-slate-800/60 shadow-xl">
          {filteredFiles.map((file) => {
            const isVideo = file.format === 'mp4' || file.format === 'webm';
            return (
              <div
                key={file.fileName}
                className="flex items-center justify-between gap-4 p-4 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <button
                    onClick={() => {
                      if (isVideo) {
                        setActiveVideoModal(file);
                      } else {
                        onPlayTrack(file);
                      }
                    }}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all ${
                      isVideo
                        ? 'bg-purple-950/50 border-purple-500/40 text-purple-300 hover:bg-purple-600 hover:text-white shadow-sm'
                        : 'bg-blue-950/50 border-blue-500/40 text-blue-300 hover:bg-blue-600 hover:text-white shadow-sm'
                    }`}
                  >
                    <Play className="h-4 w-4 ml-0.5" />
                  </button>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{file.displayName}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-1">
                      <span className="uppercase font-bold text-purple-300">{file.format}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums text-slate-300">{file.sizeFormatted}</span>
                      <span aria-hidden="true">·</span>
                      <span>{new Date(file.createdAt).toLocaleDateString('hu-HU', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={file.downloadUrl}
                    download
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5 text-blue-400" />
                    <span className="hidden sm:inline">Mentés</span>
                  </a>

                  <button
                    onClick={() => handleDelete(file.fileName)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors"
                    title="Törlés"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-purple-500/30 bg-slate-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 p-4">
              <h3 className="truncate text-sm font-semibold text-white">
                {activeVideoModal.displayName}
              </h3>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="aspect-video bg-black flex items-center justify-center">
              <video
                src={activeVideoModal.streamUrl}
                controls
                autoPlay
                className="w-full h-full max-h-[75vh]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
    </LocalizedMarkup>
  );
};
