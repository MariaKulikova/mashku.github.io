import React, { useState, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './navbar.module.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { siteConfig } = useDocusaurusContext();
  const { themeConfig } = siteConfig;
  const { navbar } = themeConfig;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const emailItem = navbar.items.find(item => item.label && item.label.includes('@'));
  const cvItem = navbar.items.find(item => item.label === 'CV');

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles['navbar--scrolled'] : ''}`}>
      <div className={styles.navbar__inner}>
        <a href="/" className={styles.navbar__logo}>
          <img src={navbar.logo.src} alt={navbar.logo.alt} />
        </a>
        <div className={styles['navbar__items--right']}>
          {emailItem && (
            <a
              href={emailItem.href}
              className={styles.navbar__link}
            >
              {emailItem.label}
            </a>
          )}
          {cvItem && (
            <a
              href={cvItem.href}
              className={styles.navbar__link}
              target={cvItem.target}
            >
              {cvItem.label}
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;