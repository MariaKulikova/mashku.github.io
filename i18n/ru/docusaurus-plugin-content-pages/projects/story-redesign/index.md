---
title: Как мы снизили путаницу пользователей и нагрузку на поддержку
description: Кейс о процессе редизайна, UX-улучшениях и развитии дизайн-системы в Selectel
hide_table_of_contents: true
image: /img/story-redesign/storyRedesign-1.png
---

import '@site/src/styles/project-page.css'
import { ProjectNavigation } from '@site/src/components/navigation-buttons/NavigationButtons'
import HeaderCenter from '@site/src/components/site-header/HeaderCenter'

<HeaderCenter>
  <h1 className="hero-heading">Пользователи создавали CDN-ресурс и не понимали: «А он вообще работает?»</h1>
</HeaderCenter>

<article>
<div className="container">

<section className="section-margin">
 <div className="columns">
   
    <p>Selectel — один из ведущих провайдеров облачных услуг и дата-центров в России. Один из продуктов компании — CDN: сервис, который помогает одинаково быстро доставлять данные всем пользователям, как бы далеко они ни находились.</p>
   
    <p>Я отвечала за весь пользовательский опыт — исследования и дизайн — для продуктов CDN и облачного хранилища.</p> 
  </div>
  <img src="/img/story-redesign/Cover_Selectel.png" alt="Обложка Selectel" className="image"/>
  
</section>


<section className="section-margin">

 ### Проблема
 В продукте CDN было много обращений в поддержку — свыше 40% из них касались статуса ресурса. Многие не понимали, когда CDN становится активным, как подключить свой домен и как проверить, что настройка прошла успешно. 

 </section>

<section className="section-margin">

  ### Исследование

<div className="columns">
    <div>
      <img src="/img/story-redesign/storyRedesign-2.png" alt="Анализ пути пользователя" className="image"/>
      <img src="/img/story-redesign/storyRedesign-3.png" alt="Юзабилити-тестирование" className="image"/>
    </div>
    <div>
       #### Я проанализировала более <span> 2000 обращений </span> в поддержку, просмотрела <span> 100+ пользовательских сессий </span> и весь путь пользователя от страницы продукта до создания ресурса — и нашла ключевые точки оттока, где уходило около 30% пользователей. 

       Пользователи заполняли форму, нажимали «Создать», не видели отклика и терялись. Кто-то видел заблокированную кнопку и не понимал, что делать. Больше всего это било по нетехническим пользователям, которые полагались на интерфейс.
    </div>
</div>

</section>



<section className="section-margin">

### Прототипирование и юзабилити-тестирование

<div className="columns">
Я подготовила интерактивные прототипы и провела юзабилити-тесты с нетехническими пользователями. Тесты прошли гладко и не выявили критических проблем.
</div>

<img src="/img/story-redesign/storyRedesign-5.png" alt="Прототипы" className="image"/>
 

</section>

<section className="section-margin">

  ### Дизайн
   Мы добавили экран проверки с подсказками по настройке CNAME, полезными инструкциями и встроенным чекером, который подтверждает, что всё работает.


  <div className="columns">
      <img src="/img/story-redesign/Selectel_default_domain.png" alt="Домен по умолчанию Selectel" className="image"/>
      <img src="/img/story-redesign/Selectel_default_domain_after_check.png" alt="Домен после проверки" className="image"/>
  </div>
</section>

<section className="section-margin">
   Мы улучшили форму создания ресурса: добавили поля своего домена и SSL, автоматизировали выбор протокола и показали предупреждение о низком балансе.
  

<img src="/img/story-redesign/Selectel_form.png" alt="Форма Selectel" className="image"/>

</section>

<section className="section-margin">

### Результаты

  <div className="columns">

    <div>
      Доля обращений в поддержку по настройке CDN-ресурса снизилась <span>с 40% до 10%</span>
    </div>
    <div>
      Поддержка <span>использует валидацию прямо в панели</span> вместо внешних сервисов, помогая клиентам
    </div>
    <div>
      <span>Время ответа</span> клиенту по вопросам настройки <span>сократилось</span> — пользователи стали прикладывать к обращению скриншот результата проверки
    </div>
  </div>

</section>


<section className="section-margin">

### P.S.

   Параллельно с продуктовыми задачами я работала с дизайнерами из других команд над развитием дизайн-системы. Мы создавали новые компоненты, обсуждали и документировали паттерны, а разработчики реализовывали их в коде. 
  
<img src="/img/story-redesign/DS.png" alt="Дизайн-система" className="image"/>

В результате весь интерфейс панели стал выглядеть свежее и минималистичнее — включая форму создания CDN-ресурса.

<img src="/img/story-redesign/storyRedesign-9.jpg" alt="Форма Selectel" className="image"/>  
   
 
</section>


<ProjectNavigation nextProject={{ title: "Marquiz", link: "/projects/marquiz-act-requests" }} />


</div>
</article>
