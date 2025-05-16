const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const seoDir = path.join(process.cwd(), 'src', 'content', 'seo');
const outputDir = path.join(process.cwd(), 'public', 'data');
const outputFileHome = path.join(outputDir, 'homeSeoData.json');
const outputFileFunke = path.join(outputDir, 'funkeFeedSeoData.json');

async function generateSeoData() {
  try {
    // Stellen sicher, dass der Ausgabeordner existiert
    await fs.ensureDir(outputDir);

    // Standard-SEO-Daten für die Startseite
    const defaultHomeSeo = {
      title: "Kira Marie - Leadership & Vertrauensexpertin | Executive Coach, Speakerin, Autorin",
      description: "Kira Marie ist Ihre Expertin für Leadership und Vertrauen. Als Executive Coach, Speakerin und Autorin unterstützt sie Führungskräfte und Unternehmen auf dem Weg zu nachhaltigem Erfolg und starker Führungskultur.",
      og_image: "/uploads/og-default.jpg"
    };

    // Standard-SEO-Daten für die Funke Feed Seite
    const defaultFunkeSeo = {
      title: "Aktuelle Beiträge von Kira Marie bei Funke - Kira Marie",
      description: "Entdecken Sie die neuesten Artikel, Kolumnen und Beiträge von Kira Marie, veröffentlicht bei der Funke Mediengruppe.",
      og_image: "/uploads/og-funke-feed.jpg"
    };

    // SEO-Daten für die Startseite laden
    try {
      const homeFilePath = path.join(seoDir, 'home.md');
      const homeFileContent = await fs.readFile(homeFilePath, 'utf8');
      const { data } = matter(homeFileContent);
      
      await fs.writeFile(outputFileHome, JSON.stringify({
        title: data.title || defaultHomeSeo.title,
        description: data.description || defaultHomeSeo.description,
        og_image: data.og_image || defaultHomeSeo.og_image
      }, null, 2));
      
      console.log('Successfully generated homeSeoData.json');
    } catch (error) {
      console.warn('Could not find home SEO data. Using default values.');
      await fs.writeFile(outputFileHome, JSON.stringify(defaultHomeSeo, null, 2));
    }

    // SEO-Daten für die Funke Feed Seite laden
    try {
      const funkeFilePath = path.join(seoDir, 'funke-feed.md');
      const funkeFileContent = await fs.readFile(funkeFilePath, 'utf8');
      const { data } = matter(funkeFileContent);
      
      await fs.writeFile(outputFileFunke, JSON.stringify({
        title: data.title || defaultFunkeSeo.title,
        description: data.description || defaultFunkeSeo.description,
        og_image: data.og_image || defaultFunkeSeo.og_image
      }, null, 2));
      
      console.log('Successfully generated funkeFeedSeoData.json');
    } catch (error) {
      console.warn('Could not find Funke Feed SEO data. Using default values.');
      await fs.writeFile(outputFileFunke, JSON.stringify(defaultFunkeSeo, null, 2));
    }

  } catch (error) {
    console.error('Error generating SEO data:', error);
  }
}

generateSeoData();
