const fs = require('fs-extra');
const path = require('path');

const sourceFilePath = path.join(process.cwd(), 'src', 'content', 'social_stats.json');
const outputDir = path.join(process.cwd(), 'public', 'data');
const outputFilePath = path.join(outputDir, 'socialDisplayData.json');

function formatFollowerCount(name, count) {
  if (count === 0) {
    return null;
  }
  let unit = 'Follower';
  if (name.toLowerCase() === 'spotify') {
    unit = 'Hörer';
  }

  // Return formatted display string for the UI
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
    await fs.ensureDir(outputDir);

    const rawData = await fs.readFile(sourceFilePath, 'utf8');
    const sourceData = JSON.parse(rawData);

    if (!sourceData.platforms || !Array.isArray(sourceData.platforms)) {
      console.error('Error: social_stats.json is not structured correctly. Expected a "platforms" array.');
      return;
    }

    // Behalte alle Plattformen (LinkedIn, Instagram und Spotify)
    const filteredPlatforms = sourceData.platforms;
    
    // Create the display data with both formatted strings and raw counts
    const displayData = filteredPlatforms.map(platform => ({
      name: platform.name,

      url: platform.url,
      followersDisplayString: formatFollowerCount(platform.name, platform.count),
      rawCount: platform.count // Add raw count value for accurate animations
    }));

    await fs.writeFile(outputFilePath, JSON.stringify(displayData, null, 2));
    console.log('Successfully generated socialDisplayData.json');

  } catch (error) {
    console.error('Error generating social display data:', error);
  }
}

generateSocialDisplayData();
