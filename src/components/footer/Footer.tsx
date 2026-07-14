import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './footer.module.css';
import { EmailIcon, TelegramIcon, InstagramIcon, DribbbleIcon, BehanceIcon } from './icons';

const SOCIALS = [
  { label: 'Email', href: 'mailto:mariakulikova18.01@gmail.com', Icon: EmailIcon },
  { label: 'Telegram', href: 'https://t.me/mashku_me', Icon: TelegramIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/mashku.me', Icon: InstagramIcon },
  { label: 'Dribbble', href: 'https://dribbble.com/mashku', Icon: DribbbleIcon },
  { label: 'Behance', href: 'https://www.behance.net/mashku', Icon: BehanceIcon },
];

export default function Footer() {
  return (
    <section className={styles.contacts}>
      <h2><Translate id="footer.contacts">Contacts</Translate></h2>
      <div className={styles.contactsSocials}>
        {SOCIALS.map(({ label, href, Icon }) => (
          <Link
            key={label}
            className={styles.socialLink}
            to={href}
            aria-label={label}
            title={label}
          >
            <Icon />
          </Link>
        ))}
      </div>
    </section>
  );
}
