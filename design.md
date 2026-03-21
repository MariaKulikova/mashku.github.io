# Design System

## Общие принципы
- **Никогда не хардкодить значения в CSS** — всегда использовать переменные из `src/styles/tokens.css`
- **Никогда не использовать `!important`** — решать через специфичность селекторов
- Стили пишутся только в `.css` / `.module.css` файлах, не в MDX/HTML
- Компоненты стилизуются через CSS Modules

## Токены (`src/styles/tokens.css`)

### Цвета
- **Open Props** (`--gray-*`) используется как основа для серой палитры
- Accent color `#1a01ff` — кастомный, нет аналога в Open Props
- Семантические алиасы обязательны: `--color-surface`, `--color-text-primary`, `--color-border` и т.д.

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

## BlueBuddy (синий круг с глазами)
- Размер: 200×200px, `border-radius: round`
- Цвет: `--color-accent`
- Прячется на 120px за край экрана (видны ~80px с глазами)
- Скользит вдоль края экрана за курсором (lerp 0.003)
- При смене стороны: задвигается за текущий край → телепортируется → выдвигается с нового края
- Глаза зеркалятся/поворачиваются для каждой стороны (всегда смотрят внутрь экрана)
- Скрыт на touch-устройствах (`@media (hover: none)`)

## Тёмная тема
- Поддерживаются light и dark mode
- Переключатель в навбаре (иконка солнце/луна)
- `respectPrefersColorScheme: true` — автоматически определяет предпочтения пользователя
- Dark токены определены в `[data-theme='dark']` в `tokens.css`
- Accent color в dark mode: `#4d3aff` (чуть светлее для контраста)

| Токен | Light | Dark |
|-------|-------|------|
| `--color-surface` | `var(--gray-2)` | `var(--gray-11)` |
| `--color-text-primary` | `var(--gray-8)` | `var(--gray-4)` |
| `--color-text-secondary` | `var(--gray-7)` | `var(--gray-5)` |
| `--color-text-heading` | `var(--gray-10)` | `var(--gray-1)` |
| `--color-border` | `var(--gray-6)` | `var(--gray-7)` |
| `--color-accent` | `#1a01ff` | `#4d3aff` |
