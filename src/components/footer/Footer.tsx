import type { FC } from 'react';
import Link from '@docusaurus/Link';
import styles from './footer.module.css';
import { SOCIAL_LINKS } from '@site/src/data/site';
import { EmailIcon, TelegramIcon, InstagramIcon, DribbbleIcon, BehanceIcon } from './icons';

// Иконки подбираются по label из единого источника ссылок (src/data/site.ts),
// чтобы список соцсетей не расходился между футером и schema.org.
const ICONS: Record<string, FC> = {
  Email: EmailIcon,
  Telegram: TelegramIcon,
  Instagram: InstagramIcon,
  Dribbble: DribbbleIcon,
  Behance: BehanceIcon,
};

export default function Footer() {
  return (
    <section className={styles.contacts}>
      <div className={styles.contactsSocials}>
        {SOCIAL_LINKS.map(({ label, href }) => {
          const Icon = ICONS[label];
          return (
            <Link
              key={label}
              className={styles.socialLink}
              to={href}
              aria-label={label}
              title={label}
            >
              {Icon ? <Icon /> : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
