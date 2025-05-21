const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const contentFilePath = path.join(__dirname, '../src/content/about.md');
const outputDir = path.join(__dirname, '../public/data');
const outputFilePath = path.join(outputDir, 'aboutData.json');

const resolveImagePath = (imagePath, fieldName) => {
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

async function generateAboutData() {
  try {
 
    await fs.ensureDir(outputDir);

    const fileContent = await fs.readFile(contentFilePath, 'utf8');

    const { data, content } = matter(fileContent);

    const aboutData = {
      name: data.name_for_tag_and_headline || '',
      headlineMain: data.headline_main_text || '',
      profile_image: data.profile_image ? resolveImagePath(data.profile_image, 'profile_image') : '',
      left_image_1: data.left_image_1 ? resolveImagePath(data.left_image_1, 'left_image_1') : '',
      left_image_2: data.left_image_2 ? resolveImagePath(data.left_image_2, 'left_image_2') : '',
      right_image: data.right_image ? resolveImagePath(data.right_image, 'right_image') : '',
      body: content || '',
      page_title: data.page_title || 'Über Mich'
    };

    await fs.writeJson(outputFilePath, aboutData, { spaces: 2 });
    console.log('Successfully generated aboutData.json');

  } catch (error) {
    console.error('Error generating aboutData.json:', error);
    process.exit(1);
  }
}

generateAboutData();
