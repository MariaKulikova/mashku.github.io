import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Masha K',
  tagline: 'UX Designer Portfolio',
  favicon: 'img/favicon.ico',

  url: 'https://mashku.com',
  baseUrl: '/',

  organizationName: 'mashku',
  projectName: 'portfolio',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'projects',
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
    navbar: {
      title: 'Masha K',
      items: [
        {
          to: '/projects/category/projects',
          label: 'Portfolio',
          position: 'left',
        },
        {
          href: 'https://t.me/username',
          label: 'Telegram',
          position: 'right',
        },
        {
          href: 'https://dribbble.com/username',
          label: 'Dribbble',
          position: 'right',
        },
        {
          href: '/files/cv.pdf',
          label: 'CV',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Connect',
          items: [
            {
              label: 'Telegram',
              href: 'https://t.me/username',
            },
            {
              label: 'Dribbble',
              href: 'https://dribbble.com/username',
            },
            {
              label: 'CV',
              href: '/files/cv.pdf',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Masha K. All rights reserved.`,
    },
    metadata: [
      {
        name: 'description',
        content: 'UX Designer creating user interfaces for complex B2C and B2B products in AI, CloudTech, E-com and MarTech.',
      },
      {
        name: 'keywords',
        content: 'UX Design, UI Design, Product Design, Portfolio, B2B, B2C, AI, CloudTech',
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
