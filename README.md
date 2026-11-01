# TubeRip Studio

TubeRip Studio is a local YouTube media downloader with a browser-based interface and a Python backend. It runs on your own computer and saves requested media to a folder you choose.

## Features

- Download audio as MP3 with selectable bitrate and optional cover art and ID3 tags.
- Download video, inspect available formats, and select the desired quality.
- Process playlists, selected playlist entries, and batches of links.
- Browse and play files in the local media library.
- Choose an output folder and manage downloaded files from the interface.
- Use the interface in Hungarian, English, German, French, Spanish, Russian, Japanese, or Simplified Chinese.
- Switch between the included visual themes.
- On Windows, check for an FFmpeg update on startup and ask before downloading it beside the application.

## Requirements

- Windows 10/11 is the primary supported desktop environment.
- Python 3.10 or newer.
- Internet access and a working YouTube connection.
- `yt-dlp` (install with the instructions below).
- FFmpeg for media conversion. The application can offer to download its FFmpeg components on Windows. Alternatively, install FFmpeg yourself and put it on `PATH`.
- Optional: Node.js 20.19+ or 22.12+ and npm, if you want to rebuild the web interface from source.

## Quick start (Windows)

1. Download or clone this repository.
2. Open a terminal in the project folder and install the Python dependency:

   ```powershell
   py -m pip install -r requirements.txt
   ```

3. Double-click `Inditas.bat` (or run `py server.py`).
4. Open `http://localhost:3000` if the browser does not open automatically.
5. Paste a video or playlist URL, choose the format and options, and start the download.

The first Windows launch may offer to download FFmpeg. Accepting places the components in the application folder. You can decline and configure FFmpeg separately.

## Rebuild the web interface (optional)

Install a supported Node.js version, then run:

```powershell
npm ci
npm run lint
npm run build
```

The Python server serves the checked-in `dist/` build. Rebuild it after changing frontend source files under `src/`.

## Project layout

- `src/` — React/TypeScript user interface and translations.
- `dist/` — built interface served by the Python backend.
- `server.py` — local Python web server and media API.
- `server.ts` — Node-based development/server option.
- `docs/` — detailed user guides in all eight interface languages.
- `requirements.txt` — Python runtime dependency list.

## Notes

TubeRip Studio is a local interface around third-party media tools. YouTube may change its service and downloads may stop working until `yt-dlp` is updated. Use this software only for media you are authorized to access and save, and follow applicable laws and the service's terms. The project does not include YouTube or FFmpeg binaries in this source package.

FFmpeg is a separate project. The Windows updater obtains an FFmpeg build from BtbN's FFmpeg-Builds project; consult that project's licensing and distribution terms for the build you use. `yt-dlp` is also distributed separately under its own license.

## License

No license has been selected for this repository yet. Until a license is added, public availability does not grant permission to reuse, modify, or redistribute the code. See `LICENSE_STATUS.txt`.

## Documentation

Choose your language in [`docs/README.md`](docs/README.md).

