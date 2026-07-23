import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useScrolledDown } from './useCollapsed';
import styles from './site-menu.module.css';

type Item = { to: string; en: string; ru: string };

// Разделы меню. Маршруты одинаковы для локалей — Link сам префиксует /ru/.
const ITEMS: Item[] = [
  { to: '/', en: 'Design', ru: 'Дизайн' },
  { to: '/art', en: 'Art', ru: 'Искусство' },
  { to: '/blog', en: 'Blog', ru: 'Блог' },
  { to: '/coffee', en: 'Coffee', ru: 'Кофе' },
];

/**
 * Меню в левой колонке сетки: аватар + разделы, по центру колонки. При скролле
 * вниз схлопывается в фото; скролл вверх / наведение / клик — разворачивают.
 * Активный пункт подсвечен блобом.
 */
export default function SiteMenu() {
  const { i18n } = useDocusaurusContext();
  const isRu = i18n.currentLocale === 'ru';
  const location = useLocation();
  const baseUrl = useBaseUrl('/');
  const avatarUrl = useBaseUrl('/img/mashku-avatar.jpg');

  const down = useScrolledDown();
  const [hovered, setHovered] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  // При скролле вниз снова схлопываем, даже если разворачивали кликом.
  useEffect(() => {
    if (down) setForceOpen(false);
  }, [down]);
  const collapsed = down && !hovered && !forceOpen;

  // Активный пункт: сравниваем путь без префикса локали.
  const path = location.pathname.replace(/\/+$/, '') || '/';
  const base = baseUrl.replace(/\/+$/, '');
  const rel = (path.startsWith(base) ? path.slice(base.length) : path) || '/';

  return (
    <nav
      className={`${styles.menu} ${collapsed ? styles.collapsed : ''}`}
      aria-label={isRu ? 'Меню сайта' : 'Site menu'}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => collapsed && setForceOpen(true)}
    >
      <img
        className={styles.avatar}
        src={avatarUrl}
        alt={isRu ? 'Мария Куликова' : 'Mariia Kulikova'}
        draggable={false}
      />
      {!collapsed && (
        <ul className={styles.list}>
          {ITEMS.map((item) => {
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
      )}
    </nav>
  );
}
