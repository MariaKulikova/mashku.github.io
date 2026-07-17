import React from 'react';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './language-switch.module.css';

const LABELS: Record<string, string> = { en: 'EN', ru: 'RU' };

/**
 * Тогл языка одной кнопкой: показывает текущий язык, по клику ведёт на другой.
 * URL «другой» локали строит штатный useAlternatePageUtils().createUrl — он сам
 * учитывает baseUrl / trailingSlash / список локалей (как LocaleDropdown в теме).
 * Полная перезагрузка — у Docusaurus локали это отдельные сборки.
 */
export default function LanguageSwitch() {
  const { i18n } = useDocusaurusContext();
  const { createUrl } = useAlternatePageUtils();

  const current = i18n.currentLocale;
  const other = current === 'ru' ? 'en' : 'ru';
  const target = createUrl({ locale: other, fullyQualified: false });

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
