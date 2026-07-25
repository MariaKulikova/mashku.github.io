import React from 'react';
import { useBuddy } from '../blue-buddy/useBuddy';
import styles from './buddy-toggle.module.css';

// Иконка бубы — большой залитый круг, обрезанный снизу нижней границей viewBox
// (заполняет иконку целиком → визуально крупная), с прорезанными глазами
// (evenodd → сквозь них виден фон кнопки). В выключенном состоянии перечёркнута.
const BUDDY =
  // тело: круг r12 — точно по ширине viewBox (бока круглые, не обрезаны), центр
  // смещён вниз → низ обрезан нижней границей viewBox (~25%).
  'M12 6a12 12 0 1 0 0 24 12 12 0 1 0 0-24Z' +
  'M8 15.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 1 0 0-4.8Z' + // левый глаз
  'M16 15.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 1 0 0-4.8Z'; // правый глаз

const BuddyOnIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d={BUDDY} />
  </svg>
);

const BuddyOffIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d={BUDDY} />
    <line x1="2.5" y1="3.5" x2="21.5" y2="22.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
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
