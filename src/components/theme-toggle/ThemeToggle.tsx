import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import {useColorMode} from '@docusaurus/theme-common';
import styles from './theme-toggle.module.css';

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ThemeToggle() {
  const {colorMode, setColorMode} = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Switch.Root
      className={styles.root}
      checked={isDark}
      onCheckedChange={(checked) => setColorMode(checked ? 'dark' : 'light')}
      aria-label="Toggle dark mode"
    >
      <span className={`${styles.icon} ${styles.sunIcon}`}><SunIcon /></span>
      <span className={`${styles.icon} ${styles.moonIcon}`}><MoonIcon /></span>
      <Switch.Thumb className={styles.thumb} />
    </Switch.Root>
  );
}
