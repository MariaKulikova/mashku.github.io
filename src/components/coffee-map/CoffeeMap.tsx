import React, { useEffect, useMemo, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import 'leaflet/dist/leaflet.css';
import './coffee-map.css';
import shops from '../../data/coffee-shops.json';
import worldBorders from '../../data/world-borders.json';
import countryShapes from '../../data/country-shapes.json';

type Shop = {
  name: string;
  lat: number;
  lng: number;
  url: string;
  city: string;
  country: string;
  countryEn: string;
  countryRu: string;
};

const ALL = shops as Shop[];
const SHAPES = countryShapes as Record<string, GeoJSON.Feature>;

// Сколько стран показывать в верхней строке (самые «кофейные»); остальные — под «Ещё».
const TOP_COUNTRIES = 10;

// Группировка кофеен по стране (ключ — англ. название). Считается один раз:
// данные статичны, от локали зависит только подпись тега.
const BY_COUNTRY: { key: string; ru: string; idxs: number[] }[] = (() => {
  const m = new Map<string, { ru: string; idxs: number[] }>();
  ALL.forEach((s, i) => {
    const key = s.countryEn || s.country;
    if (!key || key === '—') return;
    if (!m.has(key)) m.set(key, { ru: s.countryRu || key, idxs: [] });
    m.get(key)!.idxs.push(i);
  });
  return [...m.entries()]
    .map(([key, v]) => ({ key, ru: v.ru, idxs: v.idxs }))
    .sort((a, b) => b.idxs.length - a.idxs.length);
})();

// Мир без Антарктиды — общий вид, суша не обрезается.
const WORLD_BOUNDS: [[number, number], [number, number]] = [
  [-56, -180],
  [74, 180],
];

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string,
  );
}

/**
 * Карта кофеен без растровых тайлов: суша — GeoJSON-полигоны (Natural Earth 50m),
 * море — фон контейнера = фон темы сайта (адаптируется к теме). Маркеры-бейджи с
 * логотипом-кружкой; клик → увеличение + карточка. Сверху — теги стран: верхняя
 * строка со самыми «кофейными» странами + «Ещё» для остальных. Клик по стране
 * подсвечивает её контур и прячет маркеры других стран; одна кофейня → сразу
 * карточка. Зум по тачпаду (ctrl+wheel/пинч) масштабирует карту, а не страницу.
 */
export default function CoffeeMap() {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('leaflet').Map | undefined>(undefined);
  const LRef = useRef<typeof import('leaflet') | undefined>(undefined);
  const markersRef = useRef<import('leaflet').Marker[]>([]);
  const highlightRef = useRef<import('leaflet').GeoJSON | undefined>(undefined);
  const { i18n } = useDocusaurusContext();
  const isRu = i18n.currentLocale === 'ru';
  const openLabel = isRu ? 'Открыть кофейню →' : 'Open café →';
  const allLabel = isRu ? 'Весь мир' : 'Whole world';

  const [active, setActive] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const countries = useMemo(
    () => BY_COUNTRY.map((c) => ({ key: c.key, label: isRu ? c.ru : c.key, count: c.idxs.length })),
    [isRu],
  );
  const top = countries.slice(0, TOP_COUNTRIES);
  const rest = countries.slice(TOP_COUNTRIES);

  useEffect(() => {
    let cancelled = false;
    let map: import('leaflet').Map | undefined;
    const el = ref.current;
    let onWheel: ((e: WheelEvent) => void) | undefined;

    import('leaflet').then((L) => {
      if (cancelled || !el) return;
      LRef.current = L;

      map = L.map(el, {
        scrollWheelZoom: false, // колесо/скролл сами не зумят — только пинч (ниже)
        zoomSnap: 0.25,
        minZoom: 1,
        worldCopyJump: true,
        attributionControl: false,
      }).setView([25, 10], 2);
      mapRef.current = map;

      // Суша — полигоны стран (заливка + тонкая обводка = границы, чтобы при зуме
      // была структура, а не сплошное пятно). Море — фон контейнера. Цвета/толщина
      // обводки — через класс coffee-land (адаптируются к теме).
      L.geoJSON(worldBorders as unknown as GeoJSON.GeoJsonObject, {
        style: () => ({ className: 'coffee-land', stroke: true, weight: 0.5, fillOpacity: 1 }),
        interactive: false,
      }).addTo(map);

      markersRef.current = ALL.map((s, i) => {
        const tier = i % 6 === 0 ? 'lg' : i % 6 === 3 ? 'md' : 'sm';
        const size = tier === 'lg' ? 46 : tier === 'md' ? 32 : 22;
        const icon = L.divIcon({
          className: `coffee-pin ${tier}`,
          html: '<img class="coffee-cup" src="/img/previews/coffee.png" alt="" draggable="false" />',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });
        const m = L.marker([s.lat, s.lng], { icon }).addTo(map!);
        const location = [s.city, s.country].filter(Boolean).map(esc).join(', ');
        m.bindPopup(
          `<div class="coffee-card">
             <div class="coffee-card__photo"></div>
             <div class="coffee-card__body">
               <strong class="coffee-card__name">${esc(s.name)}</strong>
               ${location ? `<span class="coffee-card__city">${location}</span>` : ''}
               <a class="coffee-card__link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${openLabel}</a>
             </div>
           </div>`,
          { className: 'coffee-popup', minWidth: 220, maxWidth: 220 },
        );
        m.on('popupopen', () => {
          m.getElement()?.classList.add('active');
          m.setZIndexOffset(1000);
        });
        m.on('popupclose', () => {
          m.getElement()?.classList.remove('active');
          m.setZIndexOffset(0);
        });
        return m;
      });

      map.fitBounds(WORLD_BOUNDS, { padding: [8, 8] });

      // Тачпад-пинч (ctrl+wheel) зумит карту; обычный скролл — страницу.
      onWheel = (e: WheelEvent) => {
        if (!e.ctrlKey) return;
        e.preventDefault();
        map!.setZoom(map!.getZoom() - e.deltaY * 0.01);
      };
      el.addEventListener('wheel', onWheel, { passive: false });
    });

    return () => {
      cancelled = true;
      if (el && onWheel) el.removeEventListener('wheel', onWheel);
      map?.remove();
      mapRef.current = undefined;
      markersRef.current = [];
      highlightRef.current = undefined;
    };
  }, [openLabel]);

  const clearHighlight = (map: import('leaflet').Map) => {
    if (highlightRef.current) {
      map.removeLayer(highlightRef.current);
      highlightRef.current = undefined;
    }
  };

  // Показать только маркеры из набора (null → показать все).
  const showMarkers = (map: import('leaflet').Map, keep: Set<number> | null) => {
    markersRef.current.forEach((m, i) => {
      const show = !keep || keep.has(i);
      if (show) {
        if (!map.hasLayer(m)) m.addTo(map);
      } else if (map.hasLayer(m)) {
        map.removeLayer(m);
      }
    });
  };

  // Клик по стране: подсветить контур, спрятать чужие кофейни, вписать в кадр.
  const focusCountry = (key: string) => {
    const map = mapRef.current;
    const L = LRef.current;
    const entry = BY_COUNTRY.find((c) => c.key === key);
    if (!map || !L || !entry) return;
    setActive(key);
    showMarkers(map, new Set(entry.idxs));
    clearHighlight(map);

    const accent =
      getComputedStyle(ref.current!).getPropertyValue('--color-accent').trim() || '#4a4aff';

    // Границы для зума: контур страны, но для «широких» стран (РФ/США, полигон
    // тянется через полмира) вписываем по кофейням, иначе карта уходит в мир.
    let fitBounds: import('leaflet').LatLngBounds | undefined;
    const shape = SHAPES[key];
    if (shape) {
      const layer = L.geoJSON(shape as GeoJSON.GeoJsonObject, {
        style: () => ({
          color: accent,
          weight: 2,
          fill: false, // только контур, без заливки области
          lineJoin: 'round', // скруглённые стыки — мягче углы
          lineCap: 'round',
          smoothFactor: 0.3, // меньше упрощения → точнее повторяет границу
          className: 'coffee-outline',
        }),
        interactive: false,
      }).addTo(map);
      highlightRef.current = layer;
      const b = layer.getBounds();
      if (b.getEast() - b.getWest() <= 90) fitBounds = b;
    }
    if (!fitBounds) {
      fitBounds = L.latLngBounds(
        entry.idxs.map((i) => [ALL[i].lat, ALL[i].lng] as [number, number]),
      );
    }
    map.fitBounds(fitBounds, { padding: [48, 48], maxZoom: 12, animate: true });

    if (entry.idxs.length === 1) {
      const m = markersRef.current[entry.idxs[0]];
      if (m) m.openPopup();
    }
  };

  const resetView = () => {
    const map = mapRef.current;
    if (!map) return;
    setActive(null);
    map.closePopup();
    clearHighlight(map);
    showMarkers(map, null);
    map.fitBounds(WORLD_BOUNDS, { padding: [8, 8], animate: true });
  };

  const chip = (c: { key: string; label: string; count: number }) => (
    <button
      type="button"
      key={c.key}
      className={`coffee-country${active === c.key ? ' active' : ''}`}
      onClick={() => focusCountry(c.key)}
    >
      {c.label} <span className="coffee-country__count">{c.count}</span>
    </button>
  );

  return (
    <div className="coffee-map-wrap">
      <div className="coffee-countries" role="list" aria-label={isRu ? 'Страны' : 'Countries'}>
        <button
          type="button"
          className={`coffee-country${active === null ? ' active' : ''}`}
          onClick={resetView}
        >
          {allLabel}
        </button>
        {top.map(chip)}
        {rest.length > 0 && (
          <button
            type="button"
            className="coffee-country coffee-country--more"
            aria-expanded={expanded}
            onClick={() => setExpanded((e) => !e)}
          >
            {isRu
              ? expanded
                ? 'Свернуть'
                : `Ещё ${rest.length}`
              : expanded
                ? 'Less'
                : `More ${rest.length}`}
          </button>
        )}
      </div>
      {expanded && rest.length > 0 && (
        <div className="coffee-countries coffee-countries--extra" role="list">
          {rest.map(chip)}
        </div>
      )}
      <div ref={ref} className="coffee-map-container" aria-label="Coffee spots map" />
    </div>
  );
}
