export interface VideoInfo {
  id: string;
  title: string;
  uploader: string;
  duration: number;
  duration_string: string;
  thumbnail: string;
  view_count: number;
  description: string;
  formats?: {
    audio: string[];
    video: string[];
  };
}

export interface DownloadJob {
  id: string;
  url: string;
  format: 'mp3' | 'mp4' | 'm4a' | 'wav';
  quality: string;
  title: string;
  status: 'pending' | 'starting' | 'downloading' | 'converting' | 'completed' | 'error';
  progress: number;
  speed: string;
  eta: string;
  fileSize: string;
  outputFilePath?: string;
  fileName?: string;
  error?: string;
  createdAt: number;
  thumbnail?: string;
  channel?: string;
  duration?: string;
}

export interface DownloadedFile {
  fileName: string;
  displayName: string;
  format: string;
  sizeBytes: number;
  sizeFormatted: string;
  createdAt: number;
  downloadUrl: string;
  streamUrl: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  duration: number;
  duration_string: string;
  thumbnail: string;
  url: string;
  uploader: string;
  selected?: boolean;
  status?: 'idle' | 'downloading' | 'completed' | 'error';
  progress?: number;
  downloadUrl?: string;
  fileName?: string;
  error?: string;
}

export interface PlaylistInfo {
  id: string;
  title: string;
  uploader: string;
  itemCount: number;
  thumbnail: string;
  entries: PlaylistItem[];
}

export interface SystemStatus {
  ready: boolean;
  ytDlpVersion: string;
  ffmpegVersion: string;
  ffmpegUpdate?: { version: string } | null;
  downloadsDir: string;
  activeJobsCount: number;
}
