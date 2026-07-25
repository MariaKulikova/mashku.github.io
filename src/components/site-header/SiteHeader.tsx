import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import LanguageSwitch from '../language-switch/LanguageSwitch';
import SoundToggle from '../sound-toggle/SoundToggle';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import BuddyToggle from '../buddy-toggle/BuddyToggle';
import { useScrolledDown } from '../site-menu/useCollapsed';
import styles from './site-header.module.css';

type Item = { to: string; en: string; ru: string };
const NAV: Item[] = [
  { to: '/', en: 'Design', ru: 'Дизайн' },
  { to: '/art', en: 'Art', ru: 'Искусство' },
  { to: '/blog', en: 'Blog', ru: 'Блог' },
  { to: '/coffee', en: 'Coffee', ru: 'Кофе' },
];

/**
 * Хедер из ДВУХ частей (чтобы контент не «прыгал» при схлопывании):
 *  1. Развёрнутый хедер — в потоке (position: relative), уезжает вверх вместе с
 *     контентом. Фото+навигация, заголовок страницы (портал), настройки.
 *  2. Липкая полоска — отдельный position: fixed элемент, появляется, когда
 *     развёрнутый хедер уехал (порог ≈ его высота). Вне потока → её появление
 *     ничего не сдвигает. Фото (клик — наверх), заголовок (портал), тема.
 *
 * Заголовок в оба места кладёт HeaderCenter (два портала).
 */
export default function SiteHeader() {
  const { i18n } = useDocusaurusContext();
  const isRu = i18n.currentLocale === 'ru';
  const location = useLocation();
  const baseUrl = useBaseUrl('/');
  const avatarUrl = useBaseUrl('/img/mashku-avatar.jpg');

  const path = location.pathname.replace(/\/+$/, '') || '/';
  const base = baseUrl.replace(/\/+$/, '');
  const rel = (path.startsWith(base) ? path.slice(base.length) : path) || '/';
  const isHome = rel === '/';
  const isActive = (to: string) => (to === '/' ? rel === '/' : rel.startsWith(to));

  // Порог показа полоски ≈ высота развёрнутого хедера минус высота полоски: она
  // появляется ровно тогда, когда хедер уехал за верх.
  const barVisible = useScrolledDown(isHome ? 548 : 228, 12);

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  const nav = (
    <ul className={styles.nav}>
      {NAV.map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            className={`${styles.link} ${isActive(item.to) ? styles.active : ''}`}
            draggable={false}
          >
            {isRu ? item.ru : item.en}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* 1. Развёрнутый хедер — в потоке, уезжает вместе с контентом. */}
      <header className={`${styles.header} ${isHome ? styles.home : ''}`}>
        <div className={`${styles.side} ${styles.left}`}>
          <img
            className={styles.avatar}
            src={avatarUrl}
            alt={isRu ? 'Мария Куликова' : 'Mariia Kulikova'}
            draggable={false}
          />
          {nav}
        </div>
        <div className={styles.center} id="site-header-center" />
        <div className={`${styles.side} ${styles.right}`}>
          <div className={styles.settingsBody}>
            <div className={styles.settingsRow}>
              <LanguageSwitch />
              <SoundToggle />
            </div>
            <ThemeToggle />
            <BuddyToggle />
          </div>
        </div>
      </header>

      {/* 2. Липкая полоска — fixed, появляется когда хедер уехал. */}
      <div
        className={`${styles.bar} ${barVisible ? styles.barVisible : ''}`}
        aria-hidden={!barVisible}
      >
        <button
          type="button"
          className={styles.barAvatar}
          onClick={scrollTop}
          aria-label={isRu ? 'Наверх' : 'To top'}
        >
          <img src={avatarUrl} alt="" draggable={false} />
        </button>
        <div className={styles.barCenter} id="site-header-bar-center" />
        <div className={styles.barSettings}>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
