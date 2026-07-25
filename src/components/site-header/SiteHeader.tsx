import React, { useEffect, useRef, useState } from 'react';
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

type Control = 'lang' | 'sound' | 'buddy' | 'theme';
const LAST_KEY = 'settingsMenuLast';
function readLast(): Control {
  if (typeof localStorage === 'undefined') return 'theme';
  const v = localStorage.getItem(LAST_KEY);
  return v === 'lang' || v === 'sound' || v === 'buddy' || v === 'theme' ? v : 'theme';
}

/**
 * Единый липкий хедер во всю ширину: слева фото + навигация, в центре — заголовок
 * страницы (телепортируется сюда через HeaderCenter из mdx), справа — настройки.
 * При скролле вниз сжимается в полоску (фото | заголовок(+кнопка) | последняя
 * иконка) с линией снизу и по бокам; скролл вверх / наведение / клик разворачивают.
 * Центр — портал-цель с id="site-header-center".
 */
export default function SiteHeader() {
  const { i18n } = useDocusaurusContext();
  const isRu = i18n.currentLocale === 'ru';
  const location = useLocation();
  const baseUrl = useBaseUrl('/');
  const avatarUrl = useBaseUrl('/img/mashku-avatar.jpg');

  // Путь без префикса локали (для active-пунктов, .home и порога схлопывания).
  const path = location.pathname.replace(/\/+$/, '') || '/';
  const base = baseUrl.replace(/\/+$/, '');
  const rel = (path.startsWith(base) ? path.slice(base.length) : path) || '/';
  const isHome = rel === '/';

  // Небольшой порог схлопывания — хедер схлопывается почти сразу, поэтому проект
  // почти не уходит под развёрнутый hero.
  const scrolled = useScrolledDown(48, 12);
  // Клик по схлопнутому меню разворачивает хедер; следующий (осознанный) скролл
  // возвращает обычную логику. Кулдаун после клика игнорирует событие скролла от
  // scroll-anchoring (хедер растёт на ~184px и браузер поджимает scrollY).
  const [forceOpen, setForceOpen] = useState(false);
  const [last, setLast] = useState<Control>('theme');
  const clickCooldown = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      if (performance.now() > clickCooldown.current) setForceOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setLast(readLast()), []);
  const collapsed = scrolled && !forceOpen;

  const expandOnClick = () => {
    if (collapsed) {
      setForceOpen(true);
      clickCooldown.current = performance.now() + 450;
    }
  };

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
    buddy: <BuddyToggle />,
    theme: <ThemeToggle />,
  };

  return (
    <header
      className={`${styles.header} ${collapsed ? styles.collapsed : ''} ${isHome ? styles.home : ''}`}
      onClick={expandOnClick}
    >
      <div className={`${styles.side} ${styles.left}`}>
        <img
          className={styles.avatar}
          src={avatarUrl}
          alt={isRu ? 'Мария Куликова' : 'Mariia Kulikova'}
          draggable={false}
        />
        <ul className={styles.nav}>
          {NAV.map((item) => {
            const active = item.to === '/' ? rel === '/' : rel.startsWith(item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`${styles.link} ${active ? styles.active : ''}`}
                  draggable={false}
                >
                  {isRu ? item.ru : item.en}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Центр — портал-цель для заголовка страницы (HeaderCenter из mdx). */}
      <div className={styles.center} id="site-header-center" />

      <div className={`${styles.side} ${styles.right}`} onClick={rememberUsed}>
        {collapsed ? (
          <div className={styles.blob}>{controls[last]}</div>
        ) : (
          <div className={styles.settingsBody}>
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
            <span data-control="buddy">
              <BuddyToggle />
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
