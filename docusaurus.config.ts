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

  plugins: [
    // Анти-FOUC: до первой покраски ставим data-appearance из localStorage
    // (тема white/dark/pink/blue; дефолт white). Значение читает useAppearance.
    function appearancePlugin() {
      return {
        name: 'appearance-fouc-guard',
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML:
                  "(function(){try{var a=localStorage.getItem('appearance');if(['white','dark','pink','blue'].indexOf(a)<0)a='white';document.documentElement.setAttribute('data-appearance',a);}catch(e){document.documentElement.setAttribute('data-appearance','white');}})();",
              },
            ],
          };
        },
      };
    },
  ],

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
            './src/styles/tokens.css',
            './src/styles/general.css',
            './src/styles/project-page.css',
            './src/styles/index.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],
  
  themeConfig: {
    // Тема сайта управляется своей осью data-appearance (useAppearance).
    // Docusaurus держим всегда в 'light', иначе тёмная ОС включает data-theme=dark
    // и встроенные тёмные стили Infima перебивают наш --color-bg.
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
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
          href: 'mailto:mariakulikova18.01@gmail.com',
          label: 'mariakulikova18.01@gmail.com',
          position: 'right',
        },
        {
          href: 'https://docs.google.com/document/d/e/2PACX-1vTkWOx8OewyZs7_Xm1l891KkfykIU3_jVbRXmZ2_SKFZsQc85Zq36j3qLdyVQZ9gZYWh4gxm0jElNLx/pub',
          label: 'CV',
          position: 'right',
          target: '_blank',
        },
      ],
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
      {
        name: 'last-updated',
        content: '2025-04-01',
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
