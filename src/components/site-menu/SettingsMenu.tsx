import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LanguageSwitch from '../language-switch/LanguageSwitch';
import SoundToggle from '../sound-toggle/SoundToggle';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import { useDraggable } from './useDraggable';
import { useScrolledDown } from './useCollapsed';
import styles from './site-menu.module.css';

type Control = 'lang' | 'sound' | 'theme';
const LAST_KEY = 'settingsMenuLast';

function readLast(): Control {
  if (typeof localStorage === 'undefined') return 'theme';
  const v = localStorage.getItem(LAST_KEY);
  return v === 'lang' || v === 'sound' || v === 'theme' ? v : 'theme';
}

/**
 * Перетаскиваемая плашка настроек (язык, звук, тема) — как меню, но справа.
 * При скролле вниз схлопывается в блоб с последним использованным контролом;
 * ховер разворачивает обратно. Drag-логика — useDraggable.
 */
export default function SettingsMenu() {
  const { i18n } = useDocusaurusContext();
  const isRu = i18n.currentLocale === 'ru';
  const { rootRef, style, onPointerDown, onClickCapture } = useDraggable(
    'settingsMenuPos',
    { top: 16, left: 99999 },
  );

  const scrolled = useScrolledDown();
  const [hovered, setHovered] = useState(false);
  const [last, setLast] = useState<Control>('theme');
  const collapsed = scrolled && !hovered;

  // Инициализация из localStorage после монтирования (SSR-safe).
  React.useEffect(() => setLast(readLast()), []);

  // Запоминаем, какой контрол трогали последним (по data-control обёртки).
  const rememberUsed = (e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest('[data-control]');
    const c = el?.getAttribute('data-control') as Control | null;
    if (c) {
      setLast(c);
      try {
        localStorage.setItem(LAST_KEY, c);
      } catch {
        /* localStorage недоступен — не критично */
      }
    }
  };

  const controls: Record<Control, React.ReactNode> = {
    lang: <LanguageSwitch />,
    sound: <SoundToggle />,
    theme: <ThemeToggle />,
  };

  return (
    <div
      ref={rootRef as React.RefObject<HTMLDivElement>}
      className={`${styles.menu} ${collapsed ? styles.collapsed : ''}`}
      aria-label={isRu ? 'Настройки' : 'Settings'}
      style={style}
      onPointerDown={onPointerDown}
      onClickCapture={onClickCapture}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {collapsed ? (
        <div className={styles.blob} onClick={rememberUsed}>
          {controls[last]}
        </div>
      ) : (
        <div className={styles.settingsBody} onClick={rememberUsed}>
          <div className={styles.settingsRow}>
            <span data-control="lang">
              <LanguageSwitch />
            </span>
            <span data-control="sound">
              <SoundToggle />
            </span>
          </div>
          <span data-control="theme">
            <ThemeToggle />
          </span>
        </div>
      )}
    </div>
  );
}
