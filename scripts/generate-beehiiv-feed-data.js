const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const RSS_FEED_URL = 'https://rss.beehiiv.com/feeds/eS4sbIYawa.xml';
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'data', 'beehiivFeedData.json');
const MAX_ITEMS = 20; // Store more items in JSON in case 'load more' is needed later

const parser = new Parser();

const fetchAndSaveFeed = async () => {
  try {
    console.log(`Fetching RSS feed from ${RSS_FEED_URL}...`);
    const feed = await parser.parseURL(RSS_FEED_URL);
    console.log(`Successfully fetched ${feed.items.length} items from feed.`);

    const relevantData = feed.items.slice(0, MAX_ITEMS).map(item => ({
      guid: item.guid || item.link || item.title,
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      isoDate: item.isoDate || '',
      imageUrl: item.enclosure?.url || null,
      creator: item.creator || (feed.title ? `From ${feed.title}` : 'Unknown Author'),
      description: item.contentSnippet || item.description || '', // contentSnippet is often a plain text version
      categories: Array.isArray(item.categories) ? item.categories : (item.category ? [item.category] : []),
    }));

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(relevantData, null, 2));
    console.log(`Successfully generated ${OUTPUT_PATH}`);

  } catch (error) {
    console.error('Error fetching or saving RSS feed data:', error);
  }
};

fetchAndSaveFeed();
