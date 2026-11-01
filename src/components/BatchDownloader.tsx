import React, { useState } from 'react';
import { Layers, Play, CheckCircle2, AlertCircle, Loader2, Download, Trash2 } from 'lucide-react';
import { DownloadJob, DownloadedFile } from '../types';
import { LocalizedMarkup } from '../localized';

interface BatchItem {
  id: string;
  url: string;
  format: 'mp3' | 'mp4';
  quality: string;
  title: string;
  status: 'idle' | 'downloading' | 'completed' | 'error';
  progress: number;
  error?: string;
  downloadUrl?: string;
  fileName?: string;
}

interface BatchDownloaderProps {
  onPlayTrack: (file: DownloadedFile) => void;
  onRefreshLibrary: () => void;
  downloadDir: string;
}

export const BatchDownloader: React.FC<BatchDownloaderProps> = ({
  onPlayTrack,
  onRefreshLibrary,
  downloadDir,
}) => {
  const [rawText, setRawText] = useState('');
  const [items, setItems] = useState<BatchItem[]>([]);
  const [globalFormat, setGlobalFormat] = useState<'mp3' | 'mp4'>('mp3');
  const [globalQuality, setGlobalQuality] = useState('320');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleParseUrls = () => {
    const lines = rawText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.startsWith('http://') || l.startsWith('https://'));

    if (lines.length === 0) return;

    const newItems: BatchItem[] = lines.map((url, i) => ({
      id: `batch-${Date.now()}-${i}`,
      url,
      format: globalFormat,
      quality: globalQuality,
      title: url,
      status: 'idle',
      progress: 0,
    }));

    setItems((prev) => [...prev, ...newItems]);
    setRawText('');
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleStartBatch = async () => {
    if (items.length === 0 || isProcessing) return;
    setIsProcessing(true);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.status === 'completed') continue;

      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, status: 'downloading', progress: 10 } : it))
      );

      try {
        const res = await fetch('/api/download/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: item.url,
            format: item.format,
            quality: item.quality,
            outputDir: downloadDir,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Hiba a letöltés során');

        const jobId = data.jobId;

        // Poll until finished
        let done = false;
        while (!done) {
          await new Promise((r) => setTimeout(r, 1200));
          const stRes = await fetch(`/api/download/${jobId}/status`);
          if (stRes.ok) {
            const st: DownloadJob = await stRes.json();
            setItems((prev) =>
              prev.map((it) =>
                it.id === item.id
                  ? {
                      ...it,
                      title: st.title || it.url,
                      progress: st.progress,
                      status: st.status === 'completed' ? 'completed' : st.status === 'error' ? 'error' : 'downloading',
                      downloadUrl: `/api/download/file/${jobId}`,
                      fileName: st.fileName,
                    }
                  : it
              )
            );

            if (st.status === 'completed' || st.status === 'error') {
              done = true;
            }
          }
        }
      } catch (err: unknown) {
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? { ...it, status: 'error', error: (err as Error).message }
              : it
          )
        );
      }
    }

    setIsProcessing(false);
    onRefreshLibrary();
  };

  return (
    <LocalizedMarkup>
    <div className="space-y-6">
      <div className="rounded-2xl border border-purple-500/20 bg-slate-900/40 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Kötegelt Letöltés & Lejátszási Lista</h2>
        </div>
        <p className="text-xs text-slate-300">
          Illessz be több YouTube videó vagy dal linkjét (soronként egyet), és töltsd le őket egyszerre MP3 vagy MP4 formátumban.
        </p>

        <textarea
          rows={4}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder={`https://www.youtube.com/watch?v=...
https://youtu.be/...
https://www.youtube.com/watch?v=...`}
          className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300">Alapértelmezett:</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setGlobalFormat('mp3')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  globalFormat === 'mp3'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                MP3 (320kbps)
              </button>
              <button
                type="button"
                onClick={() => setGlobalFormat('mp4')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  globalFormat === 'mp4'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                MP4 (1080p)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleParseUrls}
              disabled={!rawText.trim()}
              className="px-4 py-2.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-xl transition-colors"
            >
              Linkek hozzáadása
            </button>
            <button
              type="button"
              onClick={handleStartBatch}
              disabled={items.length === 0 || isProcessing}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 rounded-xl shadow-lg shadow-purple-600/20 transition-all cursor-pointer border border-purple-400/20"
            >
              {isProcessing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {isProcessing ? 'Feldolgozás...' : 'Összes Letöltése'}
            </button>
          </div>
        </div>
      </div>

      {/* Items list */}
      {items.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
          <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-slate-300">
            <span>Várakozási sor ({items.length} elem)</span>
            <button
              type="button"
              onClick={() => setItems([])}
              className="text-slate-400 hover:text-red-400 transition-colors"
            >
              Mindent töröl
            </button>
          </div>

          <div className="divide-y divide-slate-800/60">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 py-3 px-2 text-xs hover:bg-slate-800/40 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {item.status === 'downloading' && (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-blue-400" />
                  )}
                  {item.status === 'completed' && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  )}
                  {item.status === 'error' && (
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  )}
                  {item.status === 'idle' && (
                    <div className="h-2 w-2 rounded-full bg-slate-600 shrink-0" />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-white font-medium">{item.title}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                      <span className="text-purple-300 font-semibold">{item.format.toUpperCase()}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate max-w-[200px]">{item.url}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.status === 'completed' && item.downloadUrl && (
                    <>
                      <a
                        href={item.downloadUrl}
                        download
                        className="p-1.5 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition-colors border border-blue-500/30"
                        title="Mentés"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </a>
                      {item.fileName && (
                        <button
                          type="button"
                          onClick={() =>
                            onPlayTrack({
                              fileName: item.fileName || '',
                              displayName: item.title,
                              format: item.format,
                              sizeBytes: 0,
                              sizeFormatted: '',
                              createdAt: Date.now(),
                              downloadUrl: item.downloadUrl || '',
                              streamUrl: `/api/files/stream/${encodeURIComponent(item.fileName || '')}`,
                            })
                          }
                          className="p-1.5 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 transition-colors border border-purple-500/30"
                          title="Meghallgatás"
                        >
                          <Play className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                    title="Eltávolítás"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </LocalizedMarkup>
  );
};
