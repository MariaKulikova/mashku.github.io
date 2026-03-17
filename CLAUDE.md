# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
- `yarn start` - Start local development server (opens browser automatically)
- `yarn build` - Build production-ready static site to `build/` directory
- `yarn typecheck` - Run TypeScript type checking

**Deployment (GitHub Pages):**
- `USE_SSH=true yarn deploy` - Deploy using SSH
- `GIT_USER=<username> yarn deploy` - Deploy using HTTPS

## Architecture

This is a **Docusaurus 3.7.0** portfolio website for UX Designer Masha K. It's configured as a static site generator without docs/blog features.

**Key Architectural Decisions:**
- **MDX Pages**: Content is written in MDX (Markdown + JSX) allowing rich interactive content
- **Component Architecture**: Custom React components in `/src/components/` with CSS modules
- **Project Structure**: Each project has its own MDX file in `/src/pages/projects/` with optional custom CSS
- **Styling**: Open Props + CSS modules. Design tokens defined in `/src/styles/tokens.css`
- **Theme Customization**: Custom Navbar and Root components override default Docusaurus theme
- **Static Assets**: Images organized by project in `/static/img/`

**Important Configuration (docusaurus.config.ts):**
- Base URL: https://mashku.pro
- Light mode only (dark mode disabled)
- Internationalization enabled (en/ru locales)
- Custom navbar with email and CV download links
- No versioning, no blog, no docs - pure portfolio site

**Component Patterns:**
- Components use TypeScript with CSS modules for styling
- Navigation between projects uses custom NavigationButtons component
- Reusable UI components: Button, TeamCard
- Custom project page layouts with MDX support

## Design System Rules
- **Никогда не хардкодить значения в CSS** — всегда использовать переменные из `tokens.css`
- **Open Props** используется для: цветов (`--gray-*`), радиусов (`--radius-*`), теней (`--shadow-*`), easings (`--ease-*`), border sizes (`--border-size-*`)
- **Кастомная spacing шкала** (`--space-1`...`--space-10`) — Open Props sizes имеют экспоненциальную шкалу, не подходящую для spacing
- **Кастомная typography шкала** (`--font-size-h1`...`--font-size-small`) — Open Props fluid sizes имеют другие диапазоны
- **Семантические алиасы** обязательны: `--space-xs`, `--space-sm`, `--space-md` и т.д.
- Accent color `#1a01ff` — кастомный, нет аналога в Open Props

## Custom instructions
- Отвечай на русском
- Стили пиши в файлах css, а не в md,mdx или html
- Не создавай новые файлы без необходимости
- Используй best practice индустрии
 