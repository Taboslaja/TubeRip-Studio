# TubeRip Studio — detailed user guide

## 1. Purpose and requirements

TubeRip Studio is a locally hosted web interface for downloading, converting, and managing audio and video files. The page talks to a server running on your computer. Internet access is needed to retrieve video details and download media. yt-dlp handles downloads; FFmpeg handles media conversion. Use it only for content you are allowed to download. Windows is required for the bundled launcher and the automatic FFmpeg installer. The web UI can also be run from source with Node.js.

## 2. Start and exit

Extract the complete application folder. On Windows, run `Inditas.bat`. It starts the local server and opens `http://localhost:3000`. Keep the command window open while using the site; closing it stops the server. If the browser does not open, enter the address yourself. Do not open `dist/index.html` directly. For development, run `npm install` and `npm run dev` from the project folder. The packaged Windows launcher uses `server.py`; the default port is 3000.

## 3. Language, theme, and destination

Use the language selector in the top header, beside the TubeRip Studio name and theme control. It offers Hungarian, English, German, French, Spanish, Russian, Japanese, and Simplified Chinese. The selection is saved in this browser. On narrow screens the selector remains in the top action row.

Use the theme control to choose one of four color themes. In the Download folder field, type a path or choose Browse to open the Windows folder picker. The application remembers this path in browser storage. The destination must exist or be creatable, writable, and have enough free space.

## 4. Download one video or audio track

1. Open **Single download** and paste a YouTube video URL. Video details load automatically when possible, including title, channel, duration, and artwork.
2. Choose MP3, MP4, M4A, or WAV. Available quality choices depend on the selected format: audio uses a bitrate, while video uses a resolution.
3. Open advanced settings if needed. Set a custom filename or enable automatic audio tags and cover art. FFmpeg is required for conversion and embedding metadata.
4. Start the download. The progress display reports the current stage, percentage, speed, and estimated time. The result is written to the selected destination.

Playlist URLs are detected and the page points you to the Playlist tab. The single-download form is intended for one video at a time.

## 5. Download a playlist

Open **Playlist**, paste a playlist URL, and load its entries. Review the list and select the tracks to download, or select all. Choose an audio or video format and quality. Optional numbering prefixes track names with their playlist order. Start the job and follow each entry's status. When files are ready, the page can bundle them into one ZIP archive in the selected folder.

## 6. Batch downloads

Paste multiple links into **Batch download**, one URL per line. Choose the shared format and quality, then start processing. The queue shows each link's state and progress. Remove queue items as needed. Completed items can be played or saved through their download links.

## 7. Library and player

**Library & player** lists media files found in the application's known output folders. Refresh the list after downloads, filter by audio or video, play audio, save a file through the browser, or delete it. Deletion asks for confirmation. The persistent player bar at the bottom provides play/pause, track progress, volume, and close controls.

## 8. Installer, help, and FFmpeg updates

The **Windows installer** page provides the standalone setup files and explains the installer wizard. The Installer ZIP button opens the package and installation guide. These tools target a local Windows installation. Running the web application from source requires Python or the Node.js development setup.

At startup, the local server checks the latest Windows release from BtbN FFmpeg Builds. If it finds a release not previously installed by this updater, the UI asks before downloading. Accepting downloads `ffmpeg.exe`, `ffprobe.exe`, `ffplay.exe`, and their DLL dependencies into the application folder. The check needs internet access; a failed check does not prevent normal downloading. The application folder must be writable. If you decline, you can continue using the current FFmpeg version.

## 9. Troubleshooting

- **The page does not open:** make sure the `Inditas.bat` command window is still running, then visit `http://localhost:3000`. If port 3000 is occupied, stop the other application using it.
- **The selector or new UI is missing:** hard-refresh with `Ctrl+F5`. The Windows launcher serves the compiled files in `dist/`; after source changes, rebuild with `npm run build`.
- **A URL cannot be analyzed or downloaded:** check the URL, internet connection, and server output. Availability can depend on YouTube restrictions.
- **Conversion or MP3 output fails:** check that FFmpeg is present and the destination is writable. Install the offered FFmpeg update if appropriate.
- **The folder picker does not open:** type the path directly; native dialogs require an interactive Windows desktop.
- **Reset a saved choice:** clear the site's browser storage entries `tuberip-language` or `tuberip-download-dir`, then choose again.

## 10. Data and limitations

The UI runs on a localhost server. Language and destination preferences are stored in this browser; media files are written to the chosen local folder. Metadata lookup and downloads contact external services. Some videos, regions, or account-restricted items may be unavailable. Labels and package contents can change between application versions.
