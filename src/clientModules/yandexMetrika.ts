// Yandex.Metrica — отправка pageview при клиентских переходах (SPA).
// Инициализация счётчика — в src/theme/Root.tsx. Здесь только hit'ы на смену маршрута.
// Первый (initial) заход не дублируем: init сам отправляет первый просмотр,
// поэтому пропускаем срабатывание без previousLocation.
const YM_ID = 110540163;

type RouteUpdate = {
  location: {pathname: string; href?: string};
  previousLocation: {pathname: string; href?: string} | null;
};

export function onRouteDidUpdate({location, previousLocation}: RouteUpdate) {
  if (!previousLocation || previousLocation.pathname === location.pathname) {
    return;
  }
  const ym = (window as any).ym;
  if (typeof ym === 'function') {
    ym(YM_ID, 'hit', location.href ?? location.pathname, {
      referer: previousLocation.href ?? previousLocation.pathname,
    });
  }
}
