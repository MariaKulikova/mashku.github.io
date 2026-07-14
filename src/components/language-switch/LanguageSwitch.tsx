import React from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './language-switch.module.css';

const LABELS: Record<string, string> = { en: 'EN', ru: 'RU' };

/**
 * Тогл языка одной кнопкой: показывает текущий язык, по клику ведёт на другой.
 * en → нажатие → /ru (русский), ru → нажатие → / (английский).
 * Полная перезагрузка — у Docusaurus локали это отдельные сборки.
 */
export default function LanguageSwitch() {
  const { i18n } = useDocusaurusContext();
  const { pathname, search, hash } = useLocation();

  const current = i18n.currentLocale;
  const other = current === 'ru' ? 'en' : 'ru';

  // путь без префикса локали → цель для «другого» языка
  const base = pathname.replace(/^\/ru(?=\/|$)/, '') || '/';
  const target =
    (other === 'ru' ? (base === '/' ? '/ru/' : `/ru${base}`) : base) + search + hash;

  return (
    <a
      className={styles.toggle}
      href={target}
      aria-label={`Switch language to ${LABELS[other]}`}
      title={LABELS[other]}
    >
      {LABELS[current]}
    </a>
  );
}
