# TubeRip Studio — guía detallada de uso

## 1. Función y requisitos

TubeRip Studio es una interfaz web alojada localmente para descargar, convertir y administrar archivos de audio y vídeo. La página se comunica con un servidor que se ejecuta en tu ordenador. Se necesita conexión a Internet para consultar los datos y descargar contenido. yt-dlp realiza las descargas y FFmpeg convierte los medios. Descarga solo contenido que tengas permiso para obtener. El iniciador incluido y el actualizador automático de FFmpeg requieren Windows. El código fuente también puede ejecutarse con Node.js.

## 2. Inicio y cierre

Descomprime la carpeta completa y ejecuta `Inditas.bat` en Windows. El servidor local abre `http://localhost:3000`. Mantén abierta la ventana de comandos; al cerrarla, se detiene el servidor. Si el navegador no se abre, escribe la dirección. No abras directamente `dist/index.html`. Para desarrollo, ejecuta `npm install` y `npm run dev` desde la carpeta del proyecto. El iniciador de Windows usa `server.py`; el puerto predeterminado es 3000.

## 3. Idioma, tema y carpeta de destino

El selector de idioma está en la cabecera superior, junto al nombre TubeRip Studio y el selector de temas. Incluye húngaro, inglés, alemán, francés, español, ruso, japonés y chino simplificado. La selección se guarda en este navegador.

Elige uno de los cuatro temas de color. En «Carpeta de descargas», escribe una ruta o pulsa «Examinar» para abrir el selector de carpetas de Windows. La ruta queda guardada en el navegador. La carpeta debe permitir escritura y tener suficiente espacio libre.

## 4. Descargar un vídeo o una pista de audio

1. Abre **Descarga individual** y pega la URL de un vídeo de YouTube. Si está disponible, se cargan automáticamente el título, el canal, la duración y la miniatura.
2. Elige MP3, MP4, M4A o WAV. Las opciones de calidad dependen del formato: bitrate para audio y resolución para vídeo.
3. Si lo necesitas, abre los ajustes avanzados para cambiar el nombre del archivo o activar las etiquetas de audio y la portada. FFmpeg es necesario para convertir y añadir metadatos.
4. Inicia la descarga. El indicador muestra la fase, el porcentaje, la velocidad y el tiempo restante estimado. El archivo final se guarda en la carpeta elegida.

Si detecta un enlace de lista, la aplicación te dirige a la pestaña Lista. El formulario individual sirve para descargar un vídeo cada vez.

## 5. Descargar una lista

Abre **Lista de reproducción**, pega la URL y carga las entradas. Revisa la lista y selecciona las pistas que quieras, o todas. Elige formato y calidad. La numeración opcional añade el orden de la lista al nombre de cada pista. Inicia el trabajo y sigue el estado de cada elemento. Al terminar, puedes reunir los archivos en un ZIP en la carpeta seleccionada.

## 6. Descargas por lotes

Pega varios enlaces en **Descarga por lotes**, uno por línea. Elige el formato y la calidad comunes y empieza el proceso. La cola muestra el estado y el avance de cada enlace. Puedes quitar elementos; los archivos terminados se pueden reproducir o guardar desde sus enlaces.

## 7. Biblioteca y reproductor

**Biblioteca y reproductor** muestra los medios encontrados en las carpetas de salida conocidas. Actualiza la lista, filtra por audio o vídeo, reproduce audio, guarda un archivo desde el navegador o elimínalo. La eliminación pide confirmación. La barra fija del reproductor inferior permite reproducir/pausar, consultar el progreso, ajustar el volumen y cerrar la reproducción.

## 8. Instalador, ayuda y actualizaciones de FFmpeg

La página **Instalador de Windows** ofrece los archivos del instalador independiente y explica el asistente. El botón ZIP del instalador abre el paquete y la guía. Estas herramientas están pensadas para instalar en Windows. Para ejecutar el código fuente hace falta Python o el entorno de desarrollo Node.js.

Al iniciarse, el servidor local consulta la versión de Windows más reciente de BtbN FFmpeg Builds. Si encuentra una versión que este actualizador aún no instaló, la interfaz solicita permiso antes de descargarla. El paquete instala `ffmpeg.exe`, `ffprobe.exe`, `ffplay.exe` y sus DLL en la carpeta del programa. La consulta requiere Internet; si falla, el resto de la aplicación sigue disponible. La carpeta del programa debe permitir escritura. Si rechazas la actualización, se mantiene la versión instalada.

## 9. Solución de problemas

- **La página no abre:** confirma que sigue abierta la ventana de `Inditas.bat` y visita `http://localhost:3000`. Si el puerto 3000 está ocupado, cierra la aplicación que lo utiliza.
- **No aparece el selector o se ve la interfaz antigua:** fuerza la recarga con `Ctrl+F5`. El iniciador sirve los archivos compilados de `dist/`; después de cambiar el código fuente hay que ejecutar `npm run build`.
- **No se puede analizar o descargar un enlace:** comprueba la URL, Internet y los mensajes del servidor. Las restricciones de YouTube pueden impedir el acceso.
- **Falla la conversión o el MP3:** comprueba FFmpeg y los permisos de escritura de la carpeta. Instala la actualización de FFmpeg si se ofrece.
- **No se abre el selector de carpetas:** escribe la ruta manualmente; los diálogos nativos requieren una sesión interactiva de Windows.
- **Borrar una preferencia guardada:** elimina `tuberip-language` o `tuberip-download-dir` del almacenamiento del sitio en el navegador.

## 10. Datos y limitaciones

La interfaz se ejecuta mediante un servidor localhost. El idioma y la carpeta se guardan en el navegador; los archivos se escriben en la carpeta local elegida. La consulta de metadatos y las descargas contactan con servicios externos. Algunos vídeos, regiones o contenidos que requieren una cuenta no estarán disponibles. Los textos y archivos del paquete pueden cambiar según la versión.
