const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'src/content/whatthework-about.md');
const outputDirectory = path.join(process.cwd(), 'public/data');
const outputFile = path.join(outputDirectory, 'whattheworkAboutData.json');

function generateAboutData() {
  try {
    if (!fs.existsSync(contentDirectory)) {
      console.log(`Markdown file not found: ${contentDirectory}`);
      return;
    }

    const fileContents = fs.readFileSync(contentDirectory, 'utf8');
    const { data } = matter(fileContents);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory, { recursive: true });
    }

    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
    console.log(`Successfully generated ${outputFile}`);

  } catch (error) {
    console.error('Error generating whatthework about data:', error);
  }
}

generateAboutData();
