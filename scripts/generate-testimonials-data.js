const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const testimonialsDir = path.join(process.cwd(), 'src', 'content', 'testimonials');
const outputDir = path.join(process.cwd(), 'public', 'data');
const outputFilePath = path.join(outputDir, 'testimonialsData.json');

async function generateTestimonialsData() {
  try {
    await fs.ensureDir(outputDir);

    const files = await fs.readdir(testimonialsDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const testimonials = [];

    for (const file of markdownFiles) {
      const filePath = path.join(testimonialsDir, file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContent);

      if (!data.author || !data.quote) {
        console.warn(`Skipping ${file}: missing author or quote in frontmatter.`);
        continue;
      }

      testimonials.push({
        author: data.author,
        position: data.position || null,
        quote: data.quote,
        image: data.image || null,
        order: data.order === undefined ? 100 : Number(data.order),
      });
    }

    testimonials.sort((a, b) => a.order - b.order);

    await fs.writeFile(outputFilePath, JSON.stringify(testimonials, null, 2));
    console.log('Successfully generated testimonialsData.json');

  } catch (error) {
    console.error('Error generating testimonials data:', error);
    if (error.code === 'ENOENT' && error.path === testimonialsDir) {
      console.warn('Testimonials directory does not exist. Skipping testimonials generation.');
      await fs.ensureDir(outputDir);
      await fs.writeFile(outputFilePath, JSON.stringify([], null, 2));
    } 
  }
}

generateTestimonialsData();
