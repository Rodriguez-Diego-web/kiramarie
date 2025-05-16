const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter'); // To parse frontmatter

const testimonialsDir = path.join(process.cwd(), 'src', 'content', 'testimonials');
const outputDir = path.join(process.cwd(), 'public', 'data');
const outputFilePath = path.join(outputDir, 'testimonialsData.json');

async function generateTestimonialsData() {
  try {
    // Ensure output directory exists
    await fs.ensureDir(outputDir);

    // Read all files in the testimonials directory
    const files = await fs.readdir(testimonialsDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const testimonials = [];

    for (const file of markdownFiles) {
      const filePath = path.join(testimonialsDir, file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContent); // data contains the frontmatter

      // Validate required fields (author and quote)
      if (!data.author || !data.quote) {
        console.warn(`Skipping ${file}: missing author or quote in frontmatter.`);
        continue;
      }

      testimonials.push({
        author: data.author,
        position: data.position || null, // Default to null if not provided
        quote: data.quote, // This is already a string, potentially with markdown
        image: data.image || null, // Default to null if not provided
        order: data.order === undefined ? 100 : Number(data.order), // Default order, convert to number
        // We could add a slug or id here if needed, e.g., based on filename
        // id: file.replace('.md', ''), 
      });
    }

    // Sort testimonials by the 'order' field (ascending)
    testimonials.sort((a, b) => a.order - b.order);

    // Write to the output file
    await fs.writeFile(outputFilePath, JSON.stringify(testimonials, null, 2));
    console.log('Successfully generated testimonialsData.json');

  } catch (error) {
    console.error('Error generating testimonials data:', error);
    if (error.code === 'ENOENT' && error.path === testimonialsDir) {
      console.warn('Testimonials directory does not exist. Skipping testimonials generation.');
      // Create an empty array if the directory doesn't exist, so the build doesn't fail
      await fs.ensureDir(outputDir);
      await fs.writeFile(outputFilePath, JSON.stringify([], null, 2));
    } 
  }
}

generateTestimonialsData();
