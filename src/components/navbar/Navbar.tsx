import React from 'react';
import AnimatedEyes from '../animated-eyes/AnimatedEyes';
import styles from './navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__inner}>
        <a href="/" className={styles.navbar__logo}>
          <AnimatedEyes />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;