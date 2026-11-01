# TubeRip Studio – ausführliche Bedienungsanleitung

## 1. Zweck und Voraussetzungen

TubeRip Studio ist eine lokal gehostete Weboberfläche zum Herunterladen, Konvertieren und Verwalten von Audio- und Videodateien. Die Seite kommuniziert mit einem Server auf Ihrem Computer. Für Videoinformationen und Downloads ist eine Internetverbindung erforderlich. yt-dlp übernimmt den Download, FFmpeg die Medienkonvertierung. Laden Sie nur Inhalte herunter, zu deren Download Sie berechtigt sind. Der mitgelieferte Starter und die automatische FFmpeg-Installation benötigen Windows; der Quellcode kann mit Node.js gestartet werden.

## 2. Start und Beenden

Entpacken Sie den vollständigen Programmordner und starten Sie unter Windows `Inditas.bat`. Der lokale Server öffnet `http://localhost:3000`. Lassen Sie das Konsolenfenster geöffnet; beim Schließen wird der Server beendet. Falls der Browser nicht startet, geben Sie die Adresse selbst ein. Öffnen Sie `dist/index.html` nicht direkt. Für die Entwicklung führen Sie im Projektordner `npm install` und `npm run dev` aus. Der Windows-Starter verwendet `server.py`; der Standardport ist 3000.

## 3. Sprache, Design und Speicherort

Die Sprachauswahl befindet sich oben in der Kopfzeile neben dem Programmnamen und der Designauswahl. Verfügbar sind Ungarisch, Englisch, Deutsch, Französisch, Spanisch, Russisch, Japanisch und vereinfachtes Chinesisch. Die Auswahl wird im Browser gespeichert.

Wählen Sie über die Designauswahl eines von vier Farbschemata. Im Feld „Downloadordner“ können Sie einen Pfad eingeben oder mit „Durchsuchen“ den Windows-Ordnerdialog öffnen. Der Pfad wird im Browser gespeichert. Der Zielordner muss beschreibbar sein und genügend freien Speicherplatz besitzen.

## 4. Einzelnes Video oder Audio herunterladen

1. Öffnen Sie **Einzeldownload** und fügen Sie eine YouTube-Video-URL ein. Wenn möglich, lädt die Anwendung Titel, Kanal, Länge und Vorschaubild automatisch.
2. Wählen Sie MP3, MP4, M4A oder WAV. Die Qualitätsauswahl hängt vom Format ab: Audio nutzt eine Bitrate, Video eine Auflösung.
3. Öffnen Sie bei Bedarf die erweiterten Einstellungen. Dort können Sie den Dateinamen ändern und das automatische Hinzufügen von Audiotags und Cover aktivieren. Für Konvertierung und Metadaten wird FFmpeg benötigt.
4. Starten Sie den Download. Die Anzeige zeigt Status, Fortschritt, Geschwindigkeit und geschätzte Restzeit. Die fertige Datei wird im gewählten Ordner gespeichert.

Playlist-Links werden erkannt und zur Playlist-Ansicht weitergeleitet. Das Einzelformular ist für jeweils ein Video vorgesehen.

## 5. Playlist herunterladen

Öffnen Sie **Wiedergabeliste**, fügen Sie die Playlist-URL ein und laden Sie die Einträge. Prüfen Sie die Liste und wählen Sie gewünschte Titel oder alle aus. Legen Sie Format und Qualität fest. Eine optionale Nummerierung ergänzt die Reihenfolge der Titel am Dateinamen. Starten Sie den Auftrag und beobachten Sie den Status der einzelnen Titel. Fertige Dateien lassen sich im gewählten Ordner zu einem ZIP-Archiv bündeln.

## 6. Stapel-Downloads

Fügen Sie unter **Stapel-Download** mehrere Links ein, jeweils einen pro Zeile. Wählen Sie das gemeinsame Format und die Qualität und starten Sie die Verarbeitung. Die Warteschlange zeigt Status und Fortschritt jedes Links. Einträge können entfernt werden; fertige Dateien lassen sich abspielen oder über den Download-Link speichern.

## 7. Mediathek und Player

**Mediathek & Player** listet Dateien in den bekannten Ausgabeordnern. Aktualisieren Sie die Liste, filtern Sie nach Audio oder Video, spielen Sie Audio ab, laden Sie eine Datei im Browser herunter oder löschen Sie sie. Das Löschen muss bestätigt werden. Die Playerleiste am unteren Rand bietet Wiedergabe/Pause, Fortschritt, Lautstärke und Schließen.

## 8. Installer, Hilfe und FFmpeg-Aktualisierungen

Die Seite **Windows-Installer** bietet Setup-Dateien und Informationen zum Installationsassistenten. Die Schaltfläche für das Installer-ZIP öffnet das Paket mit der Installationsanleitung. Diese Werkzeuge sind für lokale Windows-Installationen gedacht. Für die Ausführung aus dem Quellcode benötigen Sie Python oder die Node.js-Entwicklungsumgebung.

Beim Start prüft der lokale Server die aktuelle Windows-Version von BtbN FFmpeg Builds. Findet er eine noch nicht über diesen Updater installierte Ausgabe, fragt die Oberfläche vor dem Download nach. Nach Zustimmung werden `ffmpeg.exe`, `ffprobe.exe`, `ffplay.exe` und zugehörige DLLs in den Programmordner geladen. Die Prüfung benötigt Internet; ein Fehler verhindert die übrigen Funktionen nicht. Der Programmordner muss beschreibbar sein. Bei Ablehnung wird die vorhandene FFmpeg-Version weiterverwendet.

## 9. Fehlerbehebung

- **Die Seite öffnet sich nicht:** Prüfen Sie, ob das Fenster von `Inditas.bat` noch läuft, und öffnen Sie `http://localhost:3000`. Falls Port 3000 belegt ist, beenden Sie das andere Programm.
- **Sprachauswahl oder neue Oberfläche fehlen:** Aktualisieren Sie mit `Ctrl+F5`. Der Windows-Starter liefert die Dateien aus `dist/`; nach Quellcodeänderungen ist `npm run build` erforderlich.
- **Ein Link kann nicht analysiert oder geladen werden:** Prüfen Sie URL, Internetverbindung und die Servermeldungen. YouTube-Beschränkungen können den Zugriff verhindern.
- **Konvertierung oder MP3 schlägt fehl:** Prüfen Sie FFmpeg und die Schreibrechte des Zielordners. Installieren Sie ein angebotenes FFmpeg-Update.
- **Der Ordnerdialog erscheint nicht:** Geben Sie den Pfad direkt ein. Native Dialoge benötigen eine interaktive Windows-Sitzung.
- **Gespeicherte Auswahl zurücksetzen:** Löschen Sie im Browserspeicher die Einträge `tuberip-language` oder `tuberip-download-dir` und wählen Sie neu.

## 10. Daten und Grenzen

Die Oberfläche läuft über einen localhost-Server. Sprache und Zielordner werden im Browser gespeichert; Mediendateien werden im gewählten lokalen Ordner abgelegt. Metadatenabruf und Downloads kommunizieren mit externen Diensten. Manche Videos, Regionen oder kontobeschränkte Inhalte sind möglicherweise nicht verfügbar. Beschriftungen und Paketdateien können sich zwischen Versionen ändern.
