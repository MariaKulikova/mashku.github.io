import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..', '..');

const notionContent = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/notion-content.json'), 'utf8')
);

// Create directory if it doesn't exist
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

// Create base directories
const createDirectories = () => {
  const baseImagesDir = path.join(projectRoot, 'src', 'assets', 'images');
  ensureDirectoryExists(baseImagesDir);
};

// Download image from URL
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(filepath);
        });
      } else {
        response.resume();
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
};

// Process images from a specific project
const processProjectImages = async (projectKey, projectData) => {
  const projectDir = path.join(
    projectRoot,
    'src',
    'assets',
    'images',
    projectKey.toLowerCase().replace('system', '-system')
  );
  
  // Ensure project directory exists
  ensureDirectoryExists(projectDir);
  
  let index = 1;
  
  for (const block of projectData.content) {
    if (block.type === 'image' && block.url) {
      const ext = path.extname(block.url.split('?')[0]) || '.jpg';
      const filename = `${projectKey}-${index}${ext}`;
      const filepath = path.join(projectDir, filename);
      console.log(`Attempting to download to: ${filepath}`);
      
      try {
        await downloadImage(block.url, filepath);
        console.log(`Downloaded: ${filename}`);
        index++;
      } catch (error) {
        console.error(`Failed to download ${filename}:`, error.message);
      }
    }
  }
};

// Main function
async function main() {
  try {
    createDirectories();
    
    // Process each project
    await Promise.all([
      processProjectImages('storyRedesign', notionContent.storyRedesign),
      processProjectImages('designSystem', notionContent.designSystem),
      processProjectImages('hackathons', notionContent.hackathons)
    ]);
    
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();