import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import SoundToggle from '../sound-toggle/SoundToggle';
import LanguageSwitch from '../language-switch/LanguageSwitch';
import styles from './navbar.module.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navbarInner}>
        {/* Link авто-подставляет baseUrl локали (/ или /ru/) — не роняем язык */}
        <Link to="/" className={styles.logo}>Mariia Kulikova</Link>
        <div className={styles.controls}>
          <LanguageSwitch />
          <SoundToggle />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
