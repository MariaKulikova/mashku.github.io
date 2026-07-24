import React from 'react';
import { useBuddy } from '../blue-buddy/useBuddy';
import styles from '../sound-toggle/sound-toggle.module.css';

// Иконка бубы — «обрезанный снизу круг» (купол) с прорезанными глазами
// (evenodd → сквозь глаза виден фон кнопки). В выключенном состоянии перечёркнута.
const DOME =
  'M2.5 18a9.5 9.5 0 0 1 19 0H2.5Zm6-4.4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z';

const BuddyOnIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d={DOME} />
  </svg>
);

const BuddyOffIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24">
    <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d={DOME} />
    <line x1="3" y1="4" x2="21" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * Тумблер бубы в панели настроек. Прячет/показывает blue-buddy (состояние —
 * useBuddy). Стиль кнопки переиспользуем у SoundToggle для единообразия.
 */
export default function BuddyToggle() {
  const [enabled, setEnabled] = useBuddy();
  return (
    <button
      className={styles.button}
      onClick={() => setEnabled(!enabled)}
      aria-pressed={enabled}
      aria-label={enabled ? 'Hide buddy' : 'Show buddy'}
      title={enabled ? 'Hide buddy' : 'Show buddy'}
    >
      {enabled ? <BuddyOnIcon /> : <BuddyOffIcon />}
    </button>
  );
}
