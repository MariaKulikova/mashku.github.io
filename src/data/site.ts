// Единый источник мета и ссылок сайта.
// Используется в docusaurus.config.ts, src/theme/Root.tsx (schema.org Person)
// и src/components/footer/Footer.tsx — чтобы значения не расходились при правках.

export const SITE_URL = 'https://mashku.pro';

// Дефолтная соц-карточка (og:image / twitter:image). Путь относительно static/.
export const OG_IMAGE = 'img/Photo_Color.jpg';

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
