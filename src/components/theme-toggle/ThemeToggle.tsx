import React, { useRef } from 'react';
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
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Клавиатурная модель radiogroup: выбор + фокус переносятся стрелками/Home/End.
  const move = (to: number) => {
    const next = (to + APPEARANCES.length) % APPEARANCES.length;
    setAppearance(APPEARANCES[next]);
    btnRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = APPEARANCES.indexOf(appearance);
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        move(i + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        move(i - 1);
        break;
      case 'Home':
        e.preventDefault();
        move(0);
        break;
      case 'End':
        e.preventDefault();
        move(APPEARANCES.length - 1);
        break;
    }
  };

  return (
    <div
      className={styles.root}
      role="radiogroup"
      aria-label="Appearance"
      onKeyDown={onKeyDown}
    >
      {APPEARANCES.map((a, idx) => (
        <button
          key={a}
          ref={(el) => {
            btnRefs.current[idx] = el;
          }}
          type="button"
          role="radio"
          aria-checked={appearance === a}
          aria-label={LABELS[a]}
          title={LABELS[a]}
          // roving tabindex: в таб-порядке только выбранный свотч, остальные — стрелками
          tabIndex={appearance === a ? 0 : -1}
          className={`${styles.swatch} ${styles[a]} ${appearance === a ? styles.active : ''}`}
          onClick={() => setAppearance(a)}
        />
      ))}
    </div>
  );
}
