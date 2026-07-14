import React from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './language-switch.module.css';

const LABELS: Record<string, string> = { en: 'EN', ru: 'RU' };

/**
 * Переключатель языка (en/ru) для кастомного навбара. Ведёт на тот же путь под
 * другой локалью: en — без префикса, ru — с префиксом /ru. Полная перезагрузка
 * (у Docusaurus локали — отдельные сборки).
 */
export default function LanguageSwitch() {
  const { i18n } = useDocusaurusContext();
  const { pathname, search, hash } = useLocation();

  // путь без префикса локали
  const base = pathname.replace(/^\/ru(?=\/|$)/, '') || '/';
  const urlFor = (loc: string) => {
    const path = loc === 'ru' ? (base === '/' ? '/ru/' : `/ru${base}`) : base;
    return path + search + hash;
  };

  return (
    <div className={styles.root} role="group" aria-label="Language">
      {i18n.locales.map((loc) => (
        <a
          key={loc}
          href={urlFor(loc)}
          lang={loc}
          aria-current={loc === i18n.currentLocale ? 'true' : undefined}
          className={`${styles.lang} ${loc === i18n.currentLocale ? styles.active : ''}`}
        >
          {LABELS[loc] ?? loc.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
