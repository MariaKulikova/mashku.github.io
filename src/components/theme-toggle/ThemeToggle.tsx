import React from 'react';
import { useAppearance, APPEARANCES, type Appearance } from './useAppearance';
import styles from './theme-toggle.module.css';

const LABELS: Record<Appearance, string> = {
  white: 'Light',
  dark: 'Dark',
  pink: 'Pink',
  blue: 'Blue',
};

export default function ThemeToggle() {
  const [appearance, setAppearance] = useAppearance();

  return (
    <div className={styles.root} role="radiogroup" aria-label="Appearance">
      {APPEARANCES.map((a) => (
        <button
          key={a}
          type="button"
          role="radio"
          aria-checked={appearance === a}
          aria-label={LABELS[a]}
          title={LABELS[a]}
          className={`${styles.swatch} ${styles[a]} ${appearance === a ? styles.active : ''}`}
          onClick={() => setAppearance(a)}
        />
      ))}
    </div>
  );
}
