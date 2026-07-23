import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LanguageSwitch from '../language-switch/LanguageSwitch';
import SoundToggle from '../sound-toggle/SoundToggle';
import ThemeToggle from '../theme-toggle/ThemeToggle';
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
 * Настройки в правой колонке сетки (язык, звук, тема), по центру колонки. При
 * скролле вниз схлопывается в последний использованный контрол; скролл вверх /
 * наведение / клик — разворачивают.
 */
export default function SettingsMenu() {
  const { i18n } = useDocusaurusContext();
  const isRu = i18n.currentLocale === 'ru';

  const down = useScrolledDown();
  const [hovered, setHovered] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const [last, setLast] = useState<Control>('theme');
  useEffect(() => {
    if (down) setForceOpen(false);
  }, [down]);
  useEffect(() => setLast(readLast()), []);
  const collapsed = down && !hovered && !forceOpen;

  // Запоминаем последний использованный контрол (по data-control обёртки).
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
      className={`${styles.menu} ${collapsed ? styles.collapsed : ''}`}
      aria-label={isRu ? 'Настройки' : 'Settings'}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => collapsed && setForceOpen(true)}
    >
      {collapsed ? (
        <div className={styles.blob}>{controls[last]}</div>
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
