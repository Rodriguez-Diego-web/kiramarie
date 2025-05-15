const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const aboutContentPath = path.join(__dirname, '..', 'src', 'content', 'about.md');
const outputDir = path.join(__dirname, '..', 'src', 'generated');
const outputFile = path.join(outputDir, 'aboutData.json');

async function generateAboutData() {
  try {
    console.log('🚀 Starting to generate about page data...');
    await fs.ensureDir(outputDir); // Ensure the output directory exists

    // Debug: Log the file path we're looking at
    console.log(`📄 Looking for about data in: ${aboutContentPath}`);
    
    let fileContent = '';
    try {
      fileContent = await fs.readFile(aboutContentPath, 'utf8');
      console.log(`📝 Successfully read about.md file`);
    } catch (err) {
      console.error(`❌ Could not read file ${aboutContentPath}:`, err.message);
      // Create a default data structure if the file doesn't exist
      await createFallbackData();
      return;
    }
    
    let data = {};
    let content = '';
    
    try {
      const parsed = matter(fileContent);
      data = parsed.data;
      content = parsed.content;
      console.log(`🔍 Parsed frontmatter successfully`);
    } catch (err) {
      console.error(`❌ Error parsing frontmatter:`, err.message);
      console.log('Creating fallback data...');
      await createFallbackData();
      return;
    }

    // Debug: Log what we found in the frontmatter
    console.log(`🔍 Frontmatter data:`, JSON.stringify(data, null, 2));

    // Create the about page data structure with proper fallbacks
    const aboutData = {
      title: data.title || 'Über Mich',
      headline: data.headline || 'Kira Marie Born ist eine der führenden deutschen Stimmen im Bereich New Work und Expertin für die Zukunft der Arbeitswelt.',
      subheadline: data.subheadline || 'Autorin, Dozentin, Podcasterin, Speakerin & Beraterin.',
      profile_image: data.profile_image || '/uploads/default-profile.webp',
      bio: content || 'Bio-Inhalt wird geladen...',
      expertise_tags: Array.isArray(data.expertise_tags) ? data.expertise_tags : ['New Work', 'Future of Work', 'Leadership'],
      stats: Array.isArray(data.stats) ? data.stats : [
        { value: '5+', label: 'Jahre Erfahrung' },
        { value: '100+', label: 'Keynotes' },
        { value: '50k', label: 'Follower' }
      ],
      cta_button_text: data.cta_button_text || 'Kontakt aufnehmen',
      cta_button_link: data.cta_button_link || '/contact'
    };

    await fs.writeJson(outputFile, aboutData, { spaces: 2 });
    console.log(`✅ Successfully generated about page data to ${outputFile}`);

  } catch (error) {
    console.error('❌ Error generating about page data:', error);
    // Create a fallback data structure in case of any error
    await createFallbackData();
    process.exit(1); // Exit with error code if script fails
  }
}

async function createFallbackData() {
  try {
    // Create a default data structure 
    const fallbackData = {
      title: 'Über Mich',
      headline: 'Kira Marie Born ist eine der führenden deutschen Stimmen im Bereich New Work und Expertin für die Zukunft der Arbeitswelt.',
      subheadline: 'Autorin, Dozentin, Podcasterin, Speakerin & Beraterin.',
      profile_image: '/uploads/default-profile.webp',
      bio: 'Bio-Inhalt wird geladen...',
      expertise_tags: ['New Work', 'Future of Work', 'Leadership'],
      stats: [
        { value: '5+', label: 'Jahre Erfahrung' },
        { value: '100+', label: 'Keynotes' },
        { value: '50k', label: 'Follower' }
      ],
      cta_button_text: 'Kontakt aufnehmen',
      cta_button_link: '/contact'
    };

    await fs.ensureDir(outputDir);
    await fs.writeJson(outputFile, fallbackData, { spaces: 2 });
    console.log(`✅ Created fallback about page data to ${outputFile}`);
  } catch (writeError) {
    console.error('Failed to create fallback file:', writeError);
  }
}

generateAboutData();
