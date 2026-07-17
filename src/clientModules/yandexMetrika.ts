// Yandex.Metrica — отправка pageview при клиентских переходах (SPA).
// Инициализация счётчика — в src/theme/Root.tsx. Здесь только hit'ы на смену маршрута.
// Первый (initial) заход не дублируем: init сам отправляет первый просмотр,
// поэтому пропускаем срабатывание без previousLocation.
import { YM_COUNTER_ID } from '../data/site';

// Docusaurus передаёт react-router Location: pathname/search/hash.
type Loc = {pathname: string; search?: string};
type RouteUpdate = {location: Loc; previousLocation: Loc | null};

// Ключ страницы — путь + query, БЕЗ hash: якоря (#section) — это навигация
// внутри той же страницы, отдельным просмотром их считать не нужно (иначе накрутка).
const toPath = (l: Loc) => l.pathname + (l.search ?? '');

export function onRouteDidUpdate({location, previousLocation}: RouteUpdate) {
  if (!previousLocation) {
    return;
  }
  const from = toPath(previousLocation);
  const to = toPath(location);
  if (from === to) {
    return;
  }
  const ym = window.ym;
  if (typeof ym === 'function') {
    const {origin} = window.location;
    ym(YM_COUNTER_ID, 'hit', origin + to, {referer: origin + from});
  }
}
