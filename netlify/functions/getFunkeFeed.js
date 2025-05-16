const { Parser } = require('xml2js');

// TODO: Ersetze diese URL durch den echten Funke RSS-Feed Link, sobald verfügbar
const FUNKE_RSS_FEED_URL = 'https://www.example.com/funke-podcast-feed.xml'; // Platzhalter-URL

exports.handler = async (event, context) => {
  try {
    const response = await fetch(FUNKE_RSS_FEED_URL);
    if (!response.ok) {
      // Wenn der Feed nicht erfolgreich abgerufen werden konnte
      console.error(`Fehler beim Abrufen des Feeds: ${response.status} ${response.statusText}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Fehler beim Abrufen des Feeds: ${response.statusText}` }),
      };
    }

    const xmlData = await response.text();
    const parser = new Parser();
    const result = await parser.parseStringPromise(xmlData);

    // Annahme der RSS-Feed-Struktur (kann je nach Feed variieren)
    // Üblicherweise sind die Einträge in result.rss.channel[0].item (ein Array)
    // Passe die Pfade entsprechend der echten Feed-Struktur an!
    const feedItems = result.rss.channel[0].item || [];

    const formattedItems = feedItems.map((item, index) => {
      // Extrahiere die benötigten Daten. Die Feldnamen können variieren!
      // Übliche Felder: title, link, pubDate, description, enclosure (für Podcast-Audio)
      // Für Podcasts ist oft item.enclosure[0].$.url der Link zur Audiodatei.
      // Und item.itunes:summary oder item.description für die Beschreibung.

      const title = item.title && item.title[0] ? item.title[0] : 'Kein Titel';
      const link = item.link && item.link[0] ? item.link[0] : '#';
      const pubDate = item.pubDate && item.pubDate[0] ? item.pubDate[0] : new Date().toISOString();
      let description = (item.description && item.description[0]) || (item['content:encoded'] && item['content:encoded'][0]) || '';
      if (typeof description === 'object' && description._) {
        description = description._;
      }

      const source = result.rss.channel[0].title && result.rss.channel[0].title[0]
        ? result.rss.channel[0].title[0]
        : 'Funke Mediengruppe';

      const formattedDate = new Date(pubDate).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });

      return {
        id: (item.guid && item.guid[0] && (typeof item.guid[0] === 'string' ? item.guid[0] : item.guid[0]._)) || link || `item-${index}`,
        title: title,
        description: description.substring(0, 200) + (description.length > 200 ? '...' : ''),
        link: link,
        date: `Veröffentlicht: ${formattedDate}`,
        source: `Quelle: ${source}`,
      };
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(formattedItems.slice(0, 10)),
    };

  } catch (error) {
    console.error('Fehler in der getFunkeFeed Funktion:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Interner Serverfehler beim Verarbeiten des Feeds', details: error.message }),
    };
  }
};