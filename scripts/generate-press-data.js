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

      console.log(`🔍 Frontmatter in ${mdFile}:`, JSON.stringify(data, null, 2));

      const defaultTitle = mdFile
        .replace(/^\d{4}-\d{2}-\d{2}-/, '')
        .replace(/\.md$/, '')
        .replace(/-/g, ' ')
        .split(' ')                            
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(' ');                            

      const fileStats = await fs.stat(filePath);
      const defaultDate = fileStats.birthtime.toISOString().split('T')[0];

      const article = {
        id: mdFile.replace(/\.md$/, ''),             
        title: data.title || defaultTitle,           
        publication: data.publication || 'Unbekannte Quelle',  
        date: data.date || defaultDate,              
        url: data.url || '#',                        
        excerpt: data.excerpt || (content.trim() ? content.substring(0, 150) + (content.length > 150 ? '...' : '') : 'Kein Auszug verfügbar'), 
        image: data.image || null
      };

      console.log(`➕ Adding article: ${article.title} (${article.date})`);
      
      if (!data.title) warnings.push(`Used filename-based title for ${mdFile} because no title field found in frontmatter`);
      if (!data.date) warnings.push(`Used file creation date for ${mdFile} because no date field found in frontmatter`);

      articles.push(article);
    }

    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (warnings.length > 0) {
      console.log('\n⚠️ Warnings:');
      warnings.forEach(warning => console.log(`  - ${warning}`));
      console.log('');
    }

    await fs.writeJson(outputFile, articles, { spaces: 2 });
    console.log(`✅ Successfully generated ${articles.length} press articles to ${outputFile}`);

    if (articles.length === 0) {
      console.log('\n⚠️ No articles were processed. Possible reasons:');
      console.log('  1. No markdown files exist in the press directory.');
      console.log('  2. All markdown files had invalid or unparseable frontmatter.');
      console.log('  3. Check file permissions and paths.');
      console.log('\nCreating an empty array in the output file to prevent import errors.\n');
    }

  } catch (error) {
    console.error('❌ Error generating press articles data:', error);
    try {
      await fs.ensureDir(outputDir);
      await fs.writeJson(outputFile, [], { spaces: 2 });
      console.log('Created empty articles array as fallback due to error.');
    } catch (writeError) {
      console.error('Failed to create fallback file:', writeError);
    }
    process.exit(1);
  }
}

generatePressData();
