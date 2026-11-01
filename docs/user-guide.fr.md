# TubeRip Studio — guide d’utilisation détaillé

## 1. Fonction et prérequis

TubeRip Studio est une interface web hébergée localement pour télécharger, convertir et gérer des fichiers audio et vidéo. La page communique avec un serveur sur votre ordinateur. Une connexion Internet est nécessaire pour récupérer les informations des vidéos et les télécharger. yt-dlp gère les téléchargements et FFmpeg les conversions. Téléchargez uniquement les contenus que vous êtes autorisé à récupérer. Le lanceur fourni et le programme de mise à jour automatique FFmpeg nécessitent Windows. Le code source peut être lancé avec Node.js.

## 2. Démarrage et arrêt

Décompressez le dossier complet, puis lancez `Inditas.bat` sous Windows. Le serveur local ouvre `http://localhost:3000`. Gardez la fenêtre de commande ouverte pendant l’utilisation : sa fermeture arrête le serveur. Si le navigateur ne s’ouvre pas, saisissez l’adresse. N’ouvrez pas directement `dist/index.html`. Pour le développement, exécutez `npm install` puis `npm run dev` dans le dossier du projet. Le lanceur Windows utilise `server.py`; le port par défaut est 3000.

## 3. Langue, thème et dossier de destination

Le sélecteur de langue est dans l’en-tête supérieur, à côté du nom TubeRip Studio et du sélecteur de thème. Il propose le hongrois, l’anglais, l’allemand, le français, l’espagnol, le russe, le japonais et le chinois simplifié. Le choix est conservé dans ce navigateur.

Choisissez l’un des quatre thèmes de couleur. Dans « Dossier de téléchargement », saisissez un chemin ou cliquez sur « Parcourir » pour ouvrir le sélecteur Windows. Le chemin est mémorisé dans le navigateur. Le dossier doit être accessible en écriture et disposer d’assez d’espace libre.

## 4. Télécharger une vidéo ou une piste audio

1. Ouvrez **Téléchargement simple** et collez l’URL d’une vidéo YouTube. Si possible, le titre, la chaîne, la durée et la miniature sont chargés automatiquement.
2. Choisissez MP3, MP4, M4A ou WAV. Les options de qualité dépendent du format : débit binaire pour l’audio, résolution pour la vidéo.
3. Au besoin, ouvrez les paramètres avancés pour personnaliser le nom du fichier ou activer l’ajout automatique des tags audio et de la pochette. FFmpeg est requis pour la conversion et l’intégration des métadonnées.
4. Lancez le téléchargement. La progression indique l’étape, le pourcentage, le débit et le temps restant estimé. Le fichier terminé est enregistré dans le dossier sélectionné.

Les liens de playlist sont détectés et l’interface propose l’onglet Playlist. Le formulaire individuel est destiné à une vidéo à la fois.

## 5. Télécharger une playlist

Ouvrez **Liste de lecture**, collez l’URL de la playlist et chargez ses éléments. Vérifiez la liste et sélectionnez les pistes souhaitées ou toutes les pistes. Choisissez le format et la qualité. La numérotation facultative ajoute l’ordre de la playlist au nom des pistes. Lancez le téléchargement et suivez l’état de chaque élément. Les fichiers terminés peuvent être regroupés dans une archive ZIP dans le dossier choisi.

## 6. Téléchargement groupé

Collez plusieurs liens dans **Téléchargement groupé**, un par ligne. Choisissez le format et la qualité communs, puis lancez le traitement. La file d’attente indique l’état et l’avancement de chaque lien. Vous pouvez retirer un élément. Les fichiers terminés peuvent être lus ou enregistrés via leur lien.

## 7. Bibliothèque et lecteur

**Bibliothèque et lecteur** répertorie les médias présents dans les dossiers de sortie connus. Actualisez la liste, filtrez par audio ou vidéo, écoutez un fichier, enregistrez-le via le navigateur ou supprimez-le. Une confirmation est demandée avant suppression. Le lecteur fixe en bas de page permet lecture/pause, suivi, réglage du volume et fermeture.

## 8. Installateur, aide et mises à jour FFmpeg

La page **Installateur Windows** présente les fichiers de configuration autonomes et l’assistant d’installation. Le bouton ZIP de l’installateur donne accès au paquet et au guide. Ces outils visent une installation locale sous Windows. L’exécution depuis les sources nécessite Python ou l’environnement de développement Node.js.

Au démarrage, le serveur local vérifie la dernière version Windows publiée par BtbN FFmpeg Builds. Si une version non installée par ce mécanisme est disponible, l’interface demande votre accord avant de la télécharger. Le paquet installe `ffmpeg.exe`, `ffprobe.exe`, `ffplay.exe` et les DLL associées dans le dossier du programme. Vérification et téléchargement nécessitent Internet; un échec ne bloque pas les autres fonctions. Le dossier du programme doit être accessible en écriture. Si vous refusez, la version actuelle reste utilisée.

## 9. Dépannage

- **La page ne s’ouvre pas :** vérifiez que la fenêtre `Inditas.bat` est toujours ouverte, puis visitez `http://localhost:3000`. Si le port 3000 est occupé, arrêtez l’application qui l’utilise.
- **Le sélecteur ou la nouvelle interface n’apparaît pas :** forcez l’actualisation avec `Ctrl+F5`. Le lanceur Windows sert les fichiers compilés dans `dist/`; après toute modification des sources, exécutez `npm run build`.
- **Un lien ne s’analyse ou ne se télécharge pas :** vérifiez l’URL, Internet et les messages du serveur. Les restrictions YouTube peuvent empêcher l’accès.
- **La conversion ou le MP3 échoue :** vérifiez FFmpeg et les droits d’écriture du dossier. Installez la mise à jour proposée si nécessaire.
- **Le sélecteur de dossier ne s’ouvre pas :** saisissez le chemin vous-même; les fenêtres natives nécessitent une session Windows interactive.
- **Réinitialiser un choix mémorisé :** effacez `tuberip-language` ou `tuberip-download-dir` dans le stockage du navigateur.

## 10. Données et limites

L’interface utilise un serveur localhost. La langue et le dossier sont conservés dans le navigateur; les médias sont enregistrés dans le dossier local choisi. La récupération des métadonnées et les téléchargements contactent des services externes. Certains contenus, régions ou éléments soumis à authentification peuvent être indisponibles. Les libellés et le contenu des paquets peuvent évoluer selon la version.
