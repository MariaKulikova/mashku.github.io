import React from 'react';
import styles from './navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__inner}>
        <a href="/" className={styles.navbar__logo}>
          <img src="/img/eyes.svg" alt="" />
        </a>
        <div className={styles['navbar__items--right']}>
          <a
            href="mailto:mariakulikova18.01@gmail.com"
            className={styles.navbar__link}
          >
            mariakulikova18.01@gmail.com
          </a>
          <a
            href="https://docs.google.com/document/d/1mx1-8qmMANfiCamlVG_dNryXuxF23r-wZcwPh7Dgwig/edit?usp=drive_link"
            className={styles.navbar__link}
          >
            CV
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;