import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Masha K',
  tagline: 'UX Designer Portfolio',
  favicon: 'img/Logo.png',

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
        docs: {
          routeBasePath: 'projects',
          // Disable sidebar for all docs
          sidebarPath: false,
          // Show breadcrumbs
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    // Empty navbar config to hide it
    navbar: {
      items: [
        {
          position: 'left',
          to: '/',
          label: 'M',
        },
        {
          to: '/',
          label: 'Projects',
          position: 'right',
        },
        {
          to: '/about',
          label: 'About',
          position: 'right',
        },
      ],
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
