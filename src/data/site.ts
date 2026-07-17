// Единый источник мета и ссылок сайта.
// Используется в docusaurus.config.ts, src/theme/Root.tsx (schema.org Person)
// и src/components/footer/Footer.tsx — чтобы значения не расходились при правках.

export const SITE_URL = 'https://mashku.pro';

// Дефолтная соц-карточка (og:image / twitter:image). Путь относительно static/.
// Оптимизированная карточка 1200×630 (1.91:1) — под превью соцсетей.
export const OG_IMAGE = 'img/og-card.jpg';

// Счётчик Яндекс.Метрики — единый id для Root.tsx (init/тег/noscript)
// и clientModule (SPA-hit'ы), чтобы они не разошлись.
export const YM_COUNTER_ID = 110540163;

export type SocialLink = {label: string; href: string};

export const SOCIAL_LINKS: SocialLink[] = [
  {label: 'Email', href: 'mailto:mariakulikova18.01@gmail.com'},
  {label: 'Telegram', href: 'https://t.me/mashku_me'},
  {label: 'Instagram', href: 'https://www.instagram.com/mashku.me'},
  {label: 'Dribbble', href: 'https://dribbble.com/mashku'},
  {label: 'Behance', href: 'https://www.behance.net/mashku'},
];

// Профили для schema.org Person → sameAs (без mailto).
export const SOCIAL_PROFILE_URLS = SOCIAL_LINKS
  .filter((l) => !l.href.startsWith('mailto:'))
  .map((l) => l.href);

// Типизация глобалов сторонних счётчиков (Яндекс.Метрика, Microsoft Clarity)
// и флага инициализации — чтобы обращаться к ним без `as any`. Все опциональны:
// до загрузки внешних скриптов их может не быть.
declare global {
  interface Window {
    __analyticsInitialized?: boolean;
    ym?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}
