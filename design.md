# Design System

## Общие принципы
- **Никогда не хардкодить значения в CSS** — всегда использовать переменные из `src/styles/tokens.css`
- **Никогда не использовать `!important`** — решать через специфичность селекторов
- Стили пишутся только в `.css` / `.module.css` файлах, не в MDX/HTML
- Компоненты стилизуются через CSS Modules

## Токены (`src/styles/tokens.css`)

### Цвета
- **Open Props** (`--gray-*`) используется как основа для серой палитры
- **Бренд-рампы** `--brand-blue-0..5` и `--brand-pink-0..5` — по образцу серой шкалы Open Props (0 — светлый, 5 — насыщенный). Используются как основа для тем. Также `--brand-white` (чистый белый) и `--brand-black` (`#131416`, фирменный «почти чёрный»)
- Accent color по умолчанию — `--brand-blue-5` (`#1a01ff`); в разных темах переопределяется (см. «Темы оформления»)
- Семантические алиасы обязательны: `--color-bg`, `--color-surface`, `--color-text-primary`, `--color-border` и т.д. Сырые `--gray-*` / `--brand-*` — только в определениях токенов (`tokens.css`), не в компонентах

| Токен | Значение | Назначение |
|-------|----------|------------|
| `--color-accent` | `#1a01ff` | Бренд, акцентные элементы |
| `--color-white` | `var(--gray-0)` | Белый |
| `--color-black` | `#131416` | Чёрный (кастомный) |
| `--color-surface` | `var(--gray-2)` | Фон страницы |
| `--color-text-primary` | `var(--gray-8)` | Основной текст |
| `--color-text-secondary` | `var(--gray-7)` | Второстепенный текст |
| `--color-text-heading` | `var(--gray-10)` | Заголовки |
| `--color-border` | `var(--gray-6)` | Границы |

### Spacing
- **Кастомная линейная шкала** (`--space-1`...`--space-10`) — Open Props sizes имеют экспоненциальную шкалу, не подходящую для spacing
- Семантические алиасы: `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-2xl`, `--space-3xl`

| Токен | Rem | Px | Алиас |
|-------|-----|----|-------|
| `--space-1` | 0.25rem | 4px | `--space-xs` |
| `--space-2` | 0.5rem | 8px | `--space-sm` |
| `--space-3` | 0.75rem | 12px | — |
| `--space-4` | 1rem | 16px | `--space-md` |
| `--space-5` | 1.5rem | 24px | `--space-lg` |
| `--space-6` | 2rem | 32px | `--space-xl` |
| `--space-7` | 3rem | 48px | `--space-2xl` |
| `--space-8` | 4rem | 64px | `--space-3xl` |
| `--space-9` | 6rem | 96px | — |
| `--space-10` | 8rem | 128px | — |

### Typography
- **Кастомная fluid шкала** — Open Props fluid sizes имеют другие диапазоны
- Шрифт: Outfit (100–900)

| Токен | Значение |
|-------|----------|
| `--font-size-h1` | `clamp(32px, 4vw, 40px)` |
| `--font-size-h2` | `clamp(24px, 3vw, 32px)` |
| `--font-size-h3` | `clamp(20px, 2vw, 24px)` |
| `--font-size-h4` | `clamp(16px, 1.8vw, 18px)` |
| `--font-size-base` | `clamp(16px, 1.8vw, 18px)` |
| `--font-size-small` | `clamp(12px, 1.4vw, 14px)` |

### Иерархия заголовков

| Уровень | Font size | Font weight | Line height | Где используется |
|---------|-----------|-------------|-------------|------------------|
| h1 | `--font-size-h1` (32–40px) | `--font-weight-3` (thin) | 1.15 | Hero heading |
| h2 | `--font-size-h2` (24–32px) | `--font-weight-5` (medium) | 1.2 | Заголовки секций (Projects, Work, Contacts) |
| h3 | `--font-size-h3` (20–24px) | `--font-weight-4` (regular) | 1.3 | Заголовки карточек (TeamCard) |
| h4 | `--font-size-h4` (16–18px) | `--font-weight-4` (regular) | 1.3 | Мелкие заголовки |

**Правила:**
- Семантическая иерархия: h1 → h2 → h3 → h4 (без пропусков)
- Font weight уменьшается: h1 thin → h2 medium → h3/h4 regular
- Стили заголовков задаются глобально в `typography.css`, компоненты не переопределяют
- Body text, ссылки, кнопки, подписи — `--font-size-base`
- Tags, labels — `--font-size-small`

### Radii, Shadows, Easings
Используются напрямую из Open Props:
- Радиусы: `--radius-2`, `--radius-3`, `--radius-4`, `--radius-round` (алиасы: `--radius-sm/md/lg/pill`)
- Тени: `--shadow-2` и выше
- Easings: `--ease-3` (алиас: `--ease-default`)
- Borders: `--border-size-1`, `--border-size-2`

### Layout
| Токен | Значение |
|-------|----------|
| `--layout-max-width` | `80rem` (1280px) |
| `--layout-padding` | `var(--space-4)` (16px) |

### Transitions
| Токен | Значение |
|-------|----------|
| `--duration-fast` | `150ms` |
| `--duration-normal` | `300ms` |
| `--ease-default` | `var(--ease-3)` |

## BlueBuddy (круг с глазами)
- Размер: 200×200px, `border-radius: round`
- Цвет: `--buddy-fill` (отдельный токен, переопределяется по теме для авто-контраста — напр. на синей теме шар розовый)
- Прячется на 120px за край экрана (видны ~80px с глазами)
- Скользит вдоль края экрана за курсором (lerp 0.003)
- При смене стороны: задвигается за текущий край → телепортируется → выдвигается с нового края
- Глаза зеркалятся/поворачиваются для каждой стороны (всегда смотрят внутрь экрана)
- Скрыт на touch-устройствах (`@media (hover: none)`)

## Темы оформления (мультитемы)

Четыре темы: **white** (дефолт), **dark**, **pink**, **blue**.

**Механика:**
- Тема живёт на собственной оси `data-appearance` на `<html>` (`white` / `dark` / `pink` / `blue`), **независимой от Docusaurus colorMode**. Логика — в `src/components/theme-toggle/useAppearance.ts`; список тем `APPEARANCES` продублирован в анти-FOUC-скрипте (`docusaurus.config.ts`) — при добавлении темы править оба места.
- Docusaurus держим в `light` + `disableSwitch` + **`respectPrefersColorScheme: false`** — иначе тёмная ОС включает `data-theme=dark`, и тёмные стили Infima перебивают наш `--color-bg`.
- Переключатель — цветные свотчи в навбаре (`ThemeToggle`, `role="radiogroup"`, управление стрелками / Home / End, roving tabindex).
- Анти-FOUC: инлайн-скрипт ставит `data-appearance` из `localStorage` до первой покраски; между вкладками темы синхронизируются через событие `storage`.
- Скрыт на touch-устройствах (`@media (hover: none)`).

**Токены тем** определяются в `:root[data-appearance='<тема>']` в `tokens.css` (селектор `(0,2,0)` гарантированно перебивает `:root`, не завися от порядка/минификации). Семантические алиасы (`--color-bg`, `--color-surface`, `--color-text-*`, `--color-border`, `--color-accent`, `--buddy-fill`) переразрешаются автоматически.

| Токен | white | dark | pink | blue |
|-------|-------|------|------|------|
| `--color-bg` | `--brand-white` | `--gray-12` | `--brand-pink-4` | `--brand-blue-5` |
| `--color-surface` | `--gray-2` | `--gray-11` | `--brand-pink-5` | `--brand-blue-4` |
| `--color-text-primary` | `--gray-8` | `--gray-4` | `--brand-white` | `--gray-2` |
| `--color-text-heading` | `--gray-10` | `--gray-1` | `--brand-white` | `--brand-white` |
| `--color-border` | `--gray-6` | `--gray-7` | `--brand-pink-2` | `--brand-blue-3` |
| `--color-accent` | `--brand-blue-5` | `--brand-blue-2` | `--brand-blue-5` | `--brand-pink-4` |
| `--buddy-fill` | accent | accent | accent (синий) | `--brand-pink-4` |

> Логика акцента: на «розовой» теме праймари остаётся синим, на «синей» — праймари розовый (акцент и фон меняются местами).

## Интернационализация (i18n)
- Локали `en` (дефолт) и `ru`; переводы страниц — в `i18n/ru/…`.
- Переключатель языка — одна тогл-кнопка (`LanguageSwitch`), URL другой локали строит штатный `useAlternatePageUtils().createUrl` (учитывает baseUrl / trailingSlash / список локалей). Ссылки навигации — через `@docusaurus/Link` (сам подставляет baseUrl локали).
- **Dev-ограничение:** `docusaurus start` поднимает только одну локаль → `/ru/` в dev отдаёт 404. Проверять обе локали локально через `npm run build && npm run serve`.

## ProjectLink (превью-поповер)
- Ссылка проекта с превью первого экрана при наведении (`src/components/project-link`).
- Поповер декоративный: `pointer-events: none`, `aria-hidden="true"`, скрыт на узких экранах (`max-width: 996px`).
- Подложка скриншота (для карточек-ботов) прокидывается CSS-переменной `--preview-bg`, красится в `.module.css` — без инлайновых визуальных стилей.
