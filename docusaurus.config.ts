import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {SITE_URL, OG_IMAGE} from './src/data/site';

const config: Config = {
  title: 'Masha K',
  tagline: 'UX Designer Portfolio',
  favicon: 'img/favicon.svg',

  url: SITE_URL,
  baseUrl: '/',

  organizationName: 'mashku',
  projectName: 'mashku',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Отправка pageview в Яндекс.Метрику на SPA-переходах (init — в src/theme/Root.tsx)
  clientModules: ['./src/clientModules/yandexMetrika.ts'],

  plugins: [
    // Генерируем robots.txt на билде из siteConfig.url (= SITE_URL) — чтобы
    // домен sitemap не дублировался вручную и не устарел при миграции.
    function robotsTxtPlugin() {
      return {
        name: 'robots-txt-generator',
        async postBuild({siteConfig, outDir}) {
          const {writeFile} = await import('fs/promises');
          const {join} = await import('path');
          const body = `User-agent: *\nAllow: /\n\nSitemap: ${siteConfig.url}/sitemap.xml\n`;
          await writeFile(join(outDir, 'robots.txt'), body);
        },
      };
    },
    // Анти-FOUC: до первой покраски ставим data-appearance из localStorage
    // (тема white/dark/pink/blue; дефолт white). Значение читает useAppearance.
    // NB: список тем ниже продублирован из APPEARANCES (useAppearance.ts) — скрипт
    // выполняется до бандла и не может импортировать; при правке синхронь оба места.
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
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemap.xml',
          lastmod: 'date',
        },
      } satisfies Preset.Options,
    ],
  ],
  
  themeConfig: {
    // Дефолтная соц-карточка (og:image / twitter:image). Путь относительно static/.
    image: OG_IMAGE,
    // Тема сайта управляется своей осью data-appearance (useAppearance).
    // Docusaurus держим в 'light' + disableSwitch, иначе тёмная ОС включает
    // data-theme=dark и встроенные тёмные стили Infima перебивают наш --color-bg.
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
        name: 'author',
        content: 'Mariia Kulikova',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      // Open Graph (og:title/og:description/og:url/og:image Docusaurus проставляет сам).
      {property: 'og:type', content: 'profile'},
      {property: 'og:site_name', content: 'Masha K — UX Designer'},
      // Twitter Cards
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
