import Link from '@docusaurus/Link';
import styles from './footer.module.css';
import buttonStyles from '../button/button.module.css';
import { SOCIAL_LINKS } from '../../data/site';

export default function Footer() {
  return (
    <section className={styles.contacts}>
      <h2>Contacts</h2>
      <p className={styles.contactsText}>
        I'm always open to new connections - if you have an interesting project or just want to chat, feel free to reach out!
      </p>
      <div className={styles.contactsSocials}>
        {SOCIAL_LINKS.map(({label, href}) => (
          <Link key={label} className={`${buttonStyles['button-text']} ${styles.socialLink}`} to={href}>
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}