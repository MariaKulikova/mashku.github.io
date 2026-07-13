// Yandex.Metrica — отправка pageview при клиентских переходах (SPA).
// Инициализация счётчика — в src/theme/Root.tsx. Здесь только hit'ы на смену маршрута.
// Первый (initial) заход не дублируем: init сам отправляет первый просмотр,
// поэтому пропускаем срабатывание без previousLocation.
const YM_ID = 110540163;

// Docusaurus передаёт react-router Location: pathname/search/hash (без href).
type Loc = {pathname: string; search?: string; hash?: string};
type RouteUpdate = {location: Loc; previousLocation: Loc | null};

const toPath = (l: Loc) => l.pathname + (l.search ?? '') + (l.hash ?? '');

export function onRouteDidUpdate({location, previousLocation}: RouteUpdate) {
  if (!previousLocation) {
    return;
  }
  const from = toPath(previousLocation);
  const to = toPath(location);
  // Сравниваем полный путь (с query/hash), а не только pathname — иначе
  // переходы, меняющие только ?query или #hash, не попадут в статистику.
  if (from === to) {
    return;
  }
  const ym = (window as any).ym;
  if (typeof ym === 'function') {
    const {origin} = window.location;
    ym(YM_ID, 'hit', origin + to, {referer: origin + from});
  }
}
