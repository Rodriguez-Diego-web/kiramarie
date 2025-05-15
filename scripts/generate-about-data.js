const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const contentFilePath = path.join(__dirname, '../src/content/about.md');
const outputDir = path.join(__dirname, '../public/data');
const outputFilePath = path.join(outputDir, 'aboutData.json');

// Funktion zum Konvertieren von relativen Pfaden im Frontmatter zu absoluten Pfaden für das JSON
const resolveImagePath = (imagePath, fieldName) => {
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

async function generateAboutData() {
  try {
    // Sicherstellen, dass das Ausgabeverzeichnis existiert
    await fs.ensureDir(outputDir);

    // Markdown-Datei lesen
    const fileContent = await fs.readFile(contentFilePath, 'utf8');

    // Frontmatter und Body parsen
    const { data, content } = matter(fileContent);

    // Daten transformieren und mappen
    const aboutData = {
      name: data.name_for_tag_and_headline || '',
      headlineMain: data.headline_main_text || '',
      profile_image: data.profile_image ? resolveImagePath(data.profile_image, 'profile_image') : '',
      bio: content || '',
      page_title: data.page_title || 'Über Mich'
    };

    // JSON-Datei schreiben
    await fs.writeJson(outputFilePath, aboutData, { spaces: 2 });
    console.log('Successfully generated aboutData.json');

  } catch (error) {
    console.error('Error generating aboutData.json:', error);
    process.exit(1); // Beendet den Prozess mit einem Fehlercode
  }
}

generateAboutData();
