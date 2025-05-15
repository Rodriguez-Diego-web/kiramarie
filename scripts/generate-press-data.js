const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const pressContentDir = path.join(__dirname, '..', 'src', 'content', 'press');
const outputDir = path.join(__dirname, '..', 'src', 'generated');
const outputFile = path.join(outputDir, 'pressArticles.json');

async function generatePressData() {
  try {
    console.log('🚀 Starting to generate press articles data...');
    await fs.ensureDir(outputDir); // Ensure the output directory exists

    const files = await fs.readdir(pressContentDir);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    const articles = [];

    for (const mdFile of mdFiles) {
      const filePath = path.join(pressContentDir, mdFile);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContent); // 'content' here is the main markdown body after frontmatter

      // Validate that essential fields are present (optional, but good practice)
      if (!data.title || !data.date) {
        console.warn(`⚠️ Skipping ${mdFile}: missing title or date in frontmatter.`);
        continue;
      }

      articles.push({
        id: mdFile.replace(/\.md$/, ''), // Use filename (without .md) as ID
        title: data.title,
        publication: data.publication || '', // Default to empty string if not present
        date: data.date, // Ensure this is in a consistent format or parse/reformat if needed
        url: data.url || '',
        excerpt: data.excerpt || content.substring(0, 150) + (content.length > 150 ? '...' : ''), // Use excerpt field or fallback to start of content
        // Add other fields from your CMS config for press if needed
      });
    }

    // Sort articles by date, newest first (optional)
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    await fs.writeJson(outputFile, articles, { spaces: 2 });
    console.log(`✅ Successfully generated ${articles.length} press articles to ${outputFile}`);

  } catch (error) {
    console.error('❌ Error generating press articles data:', error);
    process.exit(1); // Exit with error code if script fails
  }
}

generatePressData();
