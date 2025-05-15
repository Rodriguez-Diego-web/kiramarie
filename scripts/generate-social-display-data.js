const fs = require('fs-extra');
const path = require('path');

const sourceFilePath = path.join(process.cwd(), 'src', 'content', 'social_stats.json');
const outputDir = path.join(process.cwd(), 'public', 'data');
const outputFilePath = path.join(outputDir, 'socialDisplayData.json');

// Funktion zur Formatierung der Zahl
function formatFollowerCount(name, count) {
  if (count === 0) {
    return null; // Kein Anzeigetext für 0 Follower
  }
  let unit = 'Follower';
  if (name.toLowerCase() === 'spotify') {
    unit = 'Hörer';
  }

  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace('.0', '') + 'M ' + unit;
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1).replace('.0', '') + 'K ' + unit;
  } else {
    return count + ' ' + unit;
  }
}

async function generateSocialDisplayData() {
  try {
    // Sicherstellen, dass das Ausgabeverzeichnis existiert
    await fs.ensureDir(outputDir);

    // Quelldatei lesen
    const rawData = await fs.readFile(sourceFilePath, 'utf8');
    const sourceData = JSON.parse(rawData);

    if (!sourceData.platforms || !Array.isArray(sourceData.platforms)) {
      console.error('Error: social_stats.json is not structured correctly. Expected a "platforms" array.');
      return;
    }

    const displayData = sourceData.platforms.map(platform => ({
      name: platform.name,
      url: platform.url,
      followersDisplayString: formatFollowerCount(platform.name, platform.count)
    }));

    // In die Zieldatei schreiben
    await fs.writeFile(outputFilePath, JSON.stringify(displayData, null, 2));
    console.log('Successfully generated socialDisplayData.json');

  } catch (error) {
    console.error('Error generating social display data:', error);
  }
}

generateSocialDisplayData();
