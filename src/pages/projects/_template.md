---
# Шаблон страницы проекта/кейса. Файл начинается с "_", поэтому Docusaurus
# НЕ делает из него роут — лишней страницы /projects/_template не появится.
#
# Как использовать:
# 1. Скопируй папку _template → projects/<slug> (slug = url: /projects/<slug>).
# 2. Переименуй файл в index.md.
# 3. Заполни frontmatter и контент. Удаляй/добавляй секции свободно —
#    страницы не обязаны быть одинаковыми, это лишь стартовая точка.
title: Название проекта
description: Короткое описание для SEO и превью
hide_table_of_contents: true
image: /img/previews/example.jpg   # опционально: og-картинка
---

import '../../../styles/project-page.css'
import { ProjectNavigation } from '../../../components/navigation-buttons/NavigationButtons'

<article>
<div className="container">

# Название проекта

<section className="section-margin">

Вводный абзац — о чём проект. Абзацы ограничены по ширине для читаемости
(см. project-page.css). Внешние ссылки: <a href="https://example.com" target="_blank" rel="noopener noreferrer">открыть ресурс →</a>.

<img src="/img/previews/example.jpg" alt="Описание картинки" className="image"/>

### Подзаголовок секции

Ещё текст. Секций может быть сколько угодно — просто повторяй `section-margin`.

</section>

<section className="section-margin">

### Две колонки (опционально)

<div className="columns">

Левая колонка — текст или картинки.

Правая колонка — текст или картинки.

</div>

</section>

{/* Навигация «назад ко всем проектам». Можно указать следующий проект: */}
{/* <ProjectNavigation nextProject={{ title: 'Следующий проект', link: '/projects/<slug>' }} /> */}
<ProjectNavigation />

</div>
</article>
