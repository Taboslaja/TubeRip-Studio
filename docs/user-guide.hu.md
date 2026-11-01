# TubeRip Studio – részletes használati útmutató

## 1. Mire való?

A TubeRip Studio helyben futó webes felület videó- és hangfájlok letöltéséhez, átalakításához és kezeléséhez. A weboldal a számítógépeden futó szerverrel kommunikál; a YouTube-adatok lekéréséhez és a letöltéshez internetkapcsolat kell. A letöltőmotor a yt-dlp, az átalakításokat az FFmpeg végzi. Csak olyan tartalmat tölts le, amelynek letöltésére jogosult vagy.

## 2. Indítás és bezárás

Windows alatt csomagold ki a program teljes mappáját, majd indítsd az `Inditas.bat` fájlt. A szkript elindítja a helyi szervert, amely a `http://localhost:3000` címen érhető el. Hagyd nyitva a parancsablakot, amíg használod a webes felületet; bezárása leállítja a szervert. Ha a böngésző nem nyílik meg, írd be kézzel a címet. Ne a `dist/index.html` fájlt nyisd meg közvetlenül.

Fejlesztői forrásból Node.js esetén futtasd a `npm install` majd `npm run dev` parancsot. Pythonos indításhoz a csomag `server.py` fájlt használja. A szerver alapértelmezett portja 3000.

## 3. Nyelv, megjelenés és mentési hely

A felső fejlécben lévő nyelvlistából választhatsz: Magyar, English, Deutsch, Français, Español, Русский, 日本語 vagy 简体中文. A beállítás a böngésző helyi tárhelyére mentődik. A lista az oldal tetején, a márkanév és a témaválasztó mellett látható; keskeny ablakban is megjelenik.

A téma gombjával válts a négy színséma között. A „Letöltési mappa” mezőben add meg a mentési útvonalat, vagy használd a „Tallózás” gombot a Windows mappaválasztójához. A program megjegyzi az útvonalat. A megadott mappának írhatónak kell lennie, és elegendő szabad tárhellyel kell rendelkeznie.

## 4. Egyedi videó vagy hang letöltése

1. Nyisd meg az „Egyedi letöltő” fület, és illessz be egy YouTube-videó URL-t.
2. Várd meg az automatikus videóadat-lekérést. Az oldal a címet, csatornát, hosszúságot és előnézeti képet mutathatja.
3. Válassz kimenetet: MP3, MP4, M4A vagy WAV. A minőségi választék a formátumtól függ. Az MP3-beállítások bitrátát, a videóbeállítások képfelbontást használnak.
4. Szükség esetén nyisd le a speciális beállításokat, és adj meg egy egyéni fájlnevet. Az automatikus címke- és borítóbeágyazás az audiofájlok metaadatait egészíti ki.
5. Indítsd el a letöltést. A folyamatjelző a letöltés és az átalakítás állapotát, sebességét és becsült hátralévő idejét mutatja. A kész fájl a kiválasztott mappába kerül.

Ha a link lejátszási listát tartalmaz, az oldal felajánlja a Playlist fül használatát; az egyedi mező csak egy videó letöltésére való.

## 5. Lejátszási lista

Nyisd meg a „Lejátszási lista” fület, illeszd be a playlist URL-jét, majd kérd a lista betöltését. A betöltés után ellenőrizd a dalokat, jelöld ki a kívánt elemeket, vagy használd az összes kijelölését. Válassz hang- vagy videóformátumot, minőséget, és ha szeretnéd, kapcsold be a sorszámozást. Indítsd el a letöltést; a lista elemei egyenként jelennek meg saját állapotjelzéssel. A kész dalok egyetlen ZIP-archívumba is csomagolhatók.

## 6. Kötegelt letöltés

A „Kötegelt letöltés” mezőbe illessz több URL-t, soronként egyet. A program a webcímeket sorokra bontja, majd sorba állítja őket. Állíts be közös kimeneti formátumot és minőséget, majd indítsd a feldolgozást. A sorban láthatod az egyes elemek állapotát és előrehaladását; az elemek eltávolíthatók, a kész hang lejátszható vagy fájlként menthető.

## 7. Médiatár és lejátszó

A „Fájlok és lejátszó” nézet a program által ismert kimeneti mappákban lévő fájlokat listázza. Frissítsd a listát, szűrd hang- vagy videófájlokra, játssz le hangot, tölts le egy példányt a böngészőbe, vagy töröld a fájlt. A törlés megerősítést kér. Az oldal alján megjelenő lejátszósávban szüneteltethetsz, léptethetsz, állíthatod a hangerőt, illetve bezárhatod a lejátszást.

## 8. Telepítő, útmutató és frissítések

A „Windows telepítő” oldal az önálló telepítőcsomag és az ehhez tartozó segédfájlok letöltését, valamint a telepítési varázsló beállításainak áttekintését szolgálja. Az Installer ZIP gomb az összeállított csomaghoz és az útmutatóhoz vezet. Ezek a segédeszközök a Windows helyi telepítését célozzák; a webes program futtatásához Python vagy a Node.js-es fejlesztői környezet szükséges.

Induláskor a szerver ellenőrzi a BtbN FFmpeg Builds Windowsos kiadását. Ha új kiadást talál, a webes felület párbeszédablakban kér jóváhagyást. Az elfogadott csomag a program mappájába tölti az `ffmpeg.exe`, `ffprobe.exe`, `ffplay.exe` és a kapcsolódó DLL fájlokat. Az ellenőrzéshez internetkapcsolat kell; hiba esetén a letöltés többi funkciója továbbra is használható. A program mappájának írhatónak kell lennie.

## 9. Hibaelhárítás

- **Az oldal nem nyílik meg:** ellenőrizd, hogy az `Inditas.bat` ablak még fut-e, majd próbáld meg a `http://localhost:3000` címet. Ha a 3000-es port foglalt, állítsd le az azt használó programot.
- **Nincs nyelvválasztó vagy régi felület jelenik meg:** frissítsd az oldalt `Ctrl+F5` billentyűkkel. Az `Inditas.bat` a `dist/` mappában lévő lefordított felületet szolgálja ki; a forrás módosítása után új build szükséges (`npm run build`).
- **A link elemzése vagy a letöltés hibázik:** ellenőrizd az URL-t, az internetkapcsolatot és hogy a helyi szerver parancsablaka nem jelez-e hibát. Egyes videók elérhetősége a YouTube korlátozásaitól függ.
- **Nincs hang vagy nem készül MP3:** ellenőrizd az FFmpeg jelenlétét és a letöltési mappa írhatóságát. A frissítési kérdésnél válaszd a telepítést, ha új FFmpeg érhető el.
- **A mappaválasztó nem jelenik meg:** előfordulhat, hogy grafikus Windows-munkamenet nem áll rendelkezésre; írd be az útvonalat kézzel.
- **Elfelejtett nyelv vagy mappa:** töröld az adott webhely helyi tárhelyének `tuberip-language` vagy `tuberip-download-dir` bejegyzését, majd válaszd ki újra.

## 10. Adatkezelés és korlátok

A webes felület a `localhost` szerveren fut, a beállításokat a böngésző tárolja, a fájlokat pedig a kiválasztott helyi mappába menti. A videó metaadatainak lekérése és maga a letöltés külső szolgáltatással kommunikál. A program nem ígér hozzáférést minden videóhoz, régióhoz vagy fiókhoz kötött tartalomhoz. A dokumentáció és a feliratok egy része verzióról verzióra változhat.
