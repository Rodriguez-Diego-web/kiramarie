const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const xml2js = require('xml2js');

const RSS_FEED_URL = 'https://cdn.julephosting.de/podcasts/693-new-work-rebels-mit-kira-marie-cremer/feed.rss';
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'data', 'podcastEpisodes.json');

/**
 * Formatiert eine Beschreibung, um HTML-Tags zu entfernen und auf eine bestimmte Länge zu kürzen
 */
function formatDescription(description) {
  // HTML-Tags entfernen
  const withoutHtml = description.replace(/<[^>]*>?/gm, '');
  
  // Text kürzen, wenn er zu lang ist
  const maxLength = 200;
  if (withoutHtml.length > maxLength) {
    return withoutHtml.substring(0, maxLength) + '...';
  }
  return withoutHtml;
}

/**
 * Formatiert das Datum in ein lesbares Format (DD.MM.YYYY)
 */
function formatDate(pubDate) {
  const date = new Date(pubDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

/**
 * Konvertiert die Dauer von Sekunden in ein lesbares Format (MM:SS)
 */
function formatDuration(durationInSeconds) {
  if (!durationInSeconds) return "Unbekannte Länge";
  
  const minutes = Math.floor(durationInSeconds / 60);
  return `${minutes} Minuten`;
}

/**
 * Extrahiert den Bildpfad, entweder von einem bestehenden Bild oder
 * verwendet das Standard-Podcast-Cover
 */
function getImageUrl(item) {
  // Prüfen, ob ein spezifisches Bild für die Episode existiert
  if (item['itunes:image'] && item['itunes:image'][0]['$'] && item['itunes:image'][0]['$'].href) {
    return item['itunes:image'][0]['$'].href;
  }
  
  // Fallback auf das Standard-Podcast-Cover
  return "/images/Podcast_Cover.jpeg";
}

/**
 * Hauptfunktion zum Abrufen und Verarbeiten des RSS-Feeds
 */
async function generatePodcastData() {
  try {
    console.log('🎙️ Starte Abruf des Podcast RSS-Feeds...');
    
    // RSS-Feed abrufen
    const response = await axios.get(RSS_FEED_URL);
    
    if (response.status !== 200) {
      throw new Error(`Fehler beim Abrufen des RSS-Feeds: ${response.status}`);
    }
    
    // XML zu JSON parsen
    const parser = new xml2js.Parser({ explicitArray: true });
    const result = await parser.parseStringPromise(response.data);
    
    // Episoden extrahieren und transformieren
    const channel = result.rss.channel[0];
    const items = channel.item || [];
    
    console.log(`📊 Gefunden: ${items.length} Episoden im RSS-Feed`);
    
    // Episoden in das gewünschte Format konvertieren
    const episodes = items.map((item, index) => {
      const title = item.title[0];
      const description = formatDescription(item.description[0]);
      const pubDate = formatDate(item.pubDate[0]);
      
      // Dauer extrahieren (falls vorhanden)
      let duration = "Unbekannte Länge";
      if (item['itunes:duration']) {
        duration = formatDuration(parseInt(item['itunes:duration'][0]));
      }
      
      // Bild-URL bestimmen
      const imageUrl = getImageUrl(item);
      
      // Eindeutige ID generieren (basierend auf dem Titel oder einer anderen eindeutigen Eigenschaft)
      const id = `podcast-${item.guid ? item.guid[0]._ || item.guid[0] : index}`;
      
      return {
        id,
        title,
        date: pubDate,
        duration,
        description,
        imageUrl,
        altText: title
      };
    });
    
    // Ausgabe-JSON erstellen
    const outputJson = {
      all_episodes: episodes
    };
    
    // In Datei schreiben
    await fs.ensureDir(path.dirname(OUTPUT_FILE));
    await fs.writeJson(OUTPUT_FILE, outputJson, { spaces: 2 });
    
    console.log(`✅ Erfolgreich ${episodes.length} Podcast-Episoden nach ${OUTPUT_FILE} geschrieben`);
    
  } catch (error) {
    console.error('❌ Fehler beim Generieren der Podcast-Daten:', error);
  }
}

// Skript ausführen
generatePodcastData();
