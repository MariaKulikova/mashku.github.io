import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Masha K',
  tagline: 'UX Designer Portfolio',
  favicon: 'img/favicon.svg',

  url: 'https://mashku.pro',
  baseUrl: '/',

  organizationName: 'mashku',
  projectName: 'mashku',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en','ru'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: [
            './src/css/general.css',
            './src/css/project-page.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],
  
  themeConfig: {
    colorMode: {
      disableSwitch: true,
      defaultMode: 'light',
    },
    navbar: {
      style: 'primary',
      hideOnScroll: false,

      logo: {
        alt: '',
        src: 'img/eyes.svg',
        
        
      },
      items: [
        {
          href: 'mailto:hey@mashku.pro',
          label: 'Contact',
          position: 'right',
        },
        {
          href: 'https://drive.google.com/file/d/1_GOSyFgumz0zUHknGf6MZMExY-cWYyij/view?usp=sharing',
          label: 'CV',
          position: 'right',
        },
      ],
    },

    
    // Theme configuration
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: true,
      }
    },
    
    // Custom theme settings
    customTheme: {
      style: {
        html: {
          backgroundColor: '#E7E7E9',
          height: '100%'
        }
      }
    },
    
    // Theme styles
    style: {
      lightBackground: '#E7E7E9',
    },
    
    // No footer config to hide it
    metadata: [
      {
        name: 'description',
        content: 'UX Designer creating user interfaces for complex B2C and B2B products in AI, CloudTech, E-com and MarTech.',
      },
      {
        name: 'keywords',
        content: 'UX Design, UI Design, Product Design, Portfolio, B2B, B2C, AI, CloudTech',
      },
      {
        name: 'last-updated',
        content: '2025-04-01',
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
