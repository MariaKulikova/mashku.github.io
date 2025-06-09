import Link from '@docusaurus/Link';
import styles from './footer.module.css';
import buttonStyles from '../button/button.module.css';

export default function Footer() {
  return (
    <section className={styles.contacts}>
      <div><h2>Contacts</h2></div>
      <div className={styles.contactsContent}>
        <div className={styles.leftColumn}>
          <h3>
            I'm always open to new connections - if you have an interesting project or just want to chat, feel free to reach out!
          </h3>
          <div className={styles.contactsSocials}>
            <Link className={`${buttonStyles['button-text']} ${styles.socialLink}`} to="mailto:mariakulikova18.01@gmail.com">
              <span>Email</span>
            </Link>
            <Link className={`${buttonStyles['button-text']} ${styles.socialLink}`} to="https://t.me/mashku_me">
              <span>Telegram</span>
            </Link>
             <Link className={`${buttonStyles['button-text']} ${styles.socialLink}`} to="https://www.instagram.com/mashku.me">
              <span>Instagram</span>
            </Link>
            <Link className={`${buttonStyles['button-text']} ${styles.socialLink}`} to="https://dribbble.com/mashku">
              <span>Dribbble</span>
            </Link>
            <Link className={`${buttonStyles['button-text']} ${styles.socialLink}`} to="https://www.behance.net/mashku">
              <span>Behance</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}