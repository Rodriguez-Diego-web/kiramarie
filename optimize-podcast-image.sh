#!/bin/bash

# Skript zum Optimieren des Podcast-Bildes

# Prüfen, ob ImageMagick installiert ist
if ! command -v magick &> /dev/null; then
    echo "ImageMagick ist nicht installiert. Bitte installieren Sie es mit:"
    echo "brew install imagemagick"
    exit 1
fi

# Podcast-Bild-Optimierung
echo "Optimiere podcast.png zu WebP..."

# Normales WebP-Bild erstellen
magick /Users/kadirdiegopadinrodriguez/Desktop/kira/public/images/podcast.png \
  -quality 80 \
  /Users/kadirdiegopadinrodriguez/Desktop/kira/public/images/podcast.webp

# Kleine Version erstellen
magick /Users/kadirdiegopadinrodriguez/Desktop/kira/public/images/podcast.png \
  -resize 50% -quality 75 \
  /Users/kadirdiegopadinrodriguez/Desktop/kira/public/images/podcast-small.webp

echo "Podcast-Bild-Optimierung abgeschlossen."
