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

    // Debug: Log the content directory path we're looking at
    console.log(`📁 Looking for markdown files in: ${pressContentDir}`);
    
    let files = [];
    try {
      files = await fs.readdir(pressContentDir);
      console.log(`📄 Found ${files.length} files in the directory`);
    } catch (err) {
      console.error(`❌ Could not read directory ${pressContentDir}:`, err.message);
      // Create an empty directory if it doesn't exist
      await fs.ensureDir(pressContentDir);
      files = [];
    }
    
    const mdFiles = files.filter(file => file.endsWith('.md'));
    console.log(`📄 Found ${mdFiles.length} markdown files`);

    const articles = [];
    const warnings = [];

    for (const mdFile of mdFiles) {
      const filePath = path.join(pressContentDir, mdFile);
      let fileContent = '';
      
      try {
        fileContent = await fs.readFile(filePath, 'utf8');
      } catch (err) {
        console.error(`❌ Error reading file ${mdFile}:`, err.message);
        continue;
      }
      
      // Debug: Log the first few characters of the file
      const previewContent = fileContent.substring(0, 150) + (fileContent.length > 150 ? '...' : '');
      console.log(`📝 Preview of ${mdFile}: ${previewContent}`);  

      let data = {};
      let content = '';
      
      try {
        const parsed = matter(fileContent);
        data = parsed.data;
        content = parsed.content;
      } catch (err) {
        console.error(`❌ Error parsing frontmatter in ${mdFile}:`, err.message);
        warnings.push(`Could not parse frontmatter in ${mdFile}: ${err.message}`);
        continue;
      }

      // Debug: Log what we found in the frontmatter
      console.log(`🔍 Frontmatter in ${mdFile}:`, JSON.stringify(data, null, 2));

      // Extract a default title from the filename if not in frontmatter
      const defaultTitle = mdFile
        .replace(/^\d{4}-\d{2}-\d{2}-/, '') // Remove date prefix (YYYY-MM-DD-)
        .replace(/\.md$/, '')                  // Remove .md extension
        .replace(/-/g, ' ')                     // Replace hyphens with spaces
        .split(' ')                            // Split into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize words
        .join(' ');                            // Join back together

      // Use the filename creation date as default date if not in frontmatter
      const fileStats = await fs.stat(filePath);
      const defaultDate = fileStats.birthtime.toISOString().split('T')[0]; // Format as YYYY-MM-DD

      // Create an article object with fallback values for missing fields
      const article = {
        id: mdFile.replace(/\.md$/, ''),             // Use filename (without .md) as ID
        title: data.title || defaultTitle,           // Use frontmatter title or fallback to filename-based title
        publication: data.publication || 'Unbekannte Quelle',  // Default publication name
        date: data.date || defaultDate,              // Use frontmatter date or file creation date
        url: data.url || '#',                        // Default URL
        excerpt: data.excerpt || (content.trim() ? content.substring(0, 150) + (content.length > 150 ? '...' : '') : 'Kein Auszug verfügbar'), // Use excerpt or content start
        image: data.image || null                    // Image field, if present
      };

      // Log what we're adding
      console.log(`➕ Adding article: ${article.title} (${article.date})`);
      
      // Let the user know if we used fallback values
      if (!data.title) warnings.push(`Used filename-based title for ${mdFile} because no title field found in frontmatter`);
      if (!data.date) warnings.push(`Used file creation date for ${mdFile} because no date field found in frontmatter`);

      articles.push(article);
    }

    // Sort articles by date, newest first
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Print warnings after processing all files
    if (warnings.length > 0) {
      console.log('\n⚠️ Warnings:');
      warnings.forEach(warning => console.log(`  - ${warning}`));
      console.log('');
    }

    await fs.writeJson(outputFile, articles, { spaces: 2 });
    console.log(`✅ Successfully generated ${articles.length} press articles to ${outputFile}`);

    // If we generated 0 articles, provide additional help
    if (articles.length === 0) {
      console.log('\n⚠️ No articles were processed. Possible reasons:');
      console.log('  1. No markdown files exist in the press directory.');
      console.log('  2. All markdown files had invalid or unparseable frontmatter.');
      console.log('  3. Check file permissions and paths.');
      console.log('\nCreating an empty array in the output file to prevent import errors.\n');
    }

  } catch (error) {
    console.error('❌ Error generating press articles data:', error);
    // Create an empty array in the output file to prevent import errors
    try {
      await fs.ensureDir(outputDir);
      await fs.writeJson(outputFile, [], { spaces: 2 });
      console.log('Created empty articles array as fallback due to error.');
    } catch (writeError) {
      console.error('Failed to create fallback file:', writeError);
    }
    process.exit(1); // Exit with error code if script fails
  }
}

generatePressData();
