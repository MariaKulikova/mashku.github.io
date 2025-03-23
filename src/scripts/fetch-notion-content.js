// Notion API integration script
import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// These values need to be provided
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PAGE_IDS = {
  storyRedesign: '6bd28e0be9aa4810bcae1b0c8f5262a4',
  designSystem: '17abf59e5469430bb4d3e5bb9843e495',
  hackathons: 'dcb6378ceec44761b68d401e220750cb'
};

if (!NOTION_TOKEN) {
  console.error('Please provide NOTION_TOKEN environment variable');
  process.exit(1);
}

const notion = new Client({
  auth: NOTION_TOKEN
});

async function getPageContent(pageId) {
  try {
    // Get page properties
    const page = await notion.pages.retrieve({
      page_id: pageId
    });

    // Get page blocks (content)
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100, // Adjust if needed
    });

    return {
      properties: page.properties,
      content: blocks.results
    };
  } catch (error) {
    console.error(`Error fetching page ${pageId}:`, error.message);
    return null;
  }
}

async function processBlocks(blocks) {
  const content = [];
  
  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph':
        if (block.paragraph.rich_text.length > 0) {
          content.push({
            type: 'text',
            content: block.paragraph.rich_text[0].plain_text
          });
        }
        break;
      case 'heading_1':
        if (block.heading_1.rich_text.length > 0) {
          content.push({
            type: 'h1',
            content: block.heading_1.rich_text[0].plain_text
          });
        }
        break;
      case 'heading_2':
        if (block.heading_2.rich_text.length > 0) {
          content.push({
            type: 'h2',
            content: block.heading_2.rich_text[0].plain_text
          });
        }
        break;
      case 'image':
        content.push({
          type: 'image',
          url: block.image.file?.url || block.image.external?.url,
          caption: block.image.caption?.[0]?.plain_text || ''
        });
        break;
      // Add more block types as needed
    }
  }

  return content;
}

async function fetchAllContent() {
  const content = {};

  for (const [key, pageId] of Object.entries(PAGE_IDS)) {
    console.log(`Fetching content for ${key}...`);
    const pageContent = await getPageContent(pageId);
    
    if (pageContent) {
      content[key] = {
        properties: pageContent.properties,
        content: await processBlocks(pageContent.content)
      };
    }
  }

  return content;
}

// Main execution
async function main() {
  try {
    const content = await fetchAllContent();
    
    // Save to a JSON file
    const outputPath = path.join(path.dirname(__dirname), 'data', 'notion-content.json');
    fs.writeFileSync(
      outputPath,
      JSON.stringify(content, null, 2),
      'utf8'
    );
    
    console.log('Content fetched and saved successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();