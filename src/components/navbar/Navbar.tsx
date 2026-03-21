import React, { useEffect, useState } from 'react';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import SoundToggle from '../sound-toggle/SoundToggle';
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
        <a href="/" className={styles.logo}>Mariia Kulikova</a>
        <div className={styles.controls}>
          <SoundToggle />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
