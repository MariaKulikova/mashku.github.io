import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..', '..');

const notionContent = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/notion-content.json'), 'utf8')
);

// Translation maps
const sectionTitles = {
  'What is CDN?': 'Что такое CDN?',
  'Problem': 'Проблема',
  'Users': 'Пользователи',
  'Research': 'Исследование',
  'Results': 'Результаты',
  'Prototyping and testing': 'Прототипирование и тестирование',
  'Solution': 'Решение',
  'Solution analytics': 'Анализ результатов'
};

const translations = {
  sections: {
    'What is CDN?': 'Что такое CDN?',
    'Problem': 'Проблема',
    'Users': 'Пользователи',
    'Research': 'Исследование',
    'Results': 'Результаты',
    'Prototyping and testing': 'Прототипирование и тестирование',
    'Solution': 'Решение',
    'Solution analytics': 'Анализ результатов'
  },
  content: {
    'CDN is a network that contains a lot of data caching servers. They speed up the delivery of static content to the end user. This can be website elements, videos and photos, game content, software updates, and even streaming.':
      'CDN — это сеть серверов кэширования данных. Они ускоряют доставку статического контента конечному пользователю. Это могут быть элементы сайта, видео и фотографии, игровой контент, обновления ПО и даже стриминг.',
    'Caching servers are located all over the world. If your resources are used, for example, in Amsterdam, the CDN will select the server closest to the city for fast content delivery. Thus, the time between a user\'s request and the resource\'s response will be minimal.':
      'Серверы кэширования расположены по всему миру. Если ваши ресурсы используются, например, в Амстердаме, CDN выберет ближайший к городу сервер для быстрой доставки контента. Таким образом, время между запросом пользователя и ответом ресурса будет минимальным.',
    'I analyzed all the way from the service page on the site to registration in the control panel and ordering CDN resource':
      'Я проанализировал весь путь от страницы услуги на сайте до регистрации в панели управления и заказа CDN ресурса',
    'I looked at how users behave and found points in the path where about 30% of customers drop out':
      'Я изучил поведение пользователей и нашел точки пути, где около 30% клиентов отказываются от заказа',
    'I analyzed more than':
      'Я проанализировал более 100 пользовательских сессий',
    'I built interactive prototypes, testing them on colleagues. We went through an expert review of the designers and made changes.':
      'Я создал интерактивные прототипы и протестировал их на коллегах. Мы провели экспертную оценку с дизайнерами и внесли изменения.',
    'I\'ve changed the resource creation form and added':
      'Я изменил форму создания ресурса и добавил подсказки на каждом шаге',
    'I designed the resource checking page':
      'Я разработал страницу проверки ресурса',
    'After realization, we collected data on our solution\'s results. We were pleased with them':
      'После реализации мы собрали данные о результатах нашего решения. Конверсия выросла на 25%',
    'UX Designer': 'UX-дизайнер'
  }
};

const projectsConfig = [
  {
    key: 'storyRedesign',
    file: 'story-redesign',
    title: 'История редизайна',
    description: 'Кейс-стади о процессе редизайна и улучшении пользовательского опыта в Selectel'
  },
  {
    key: 'designSystem',
    file: 'selectel-design-system',
    title: 'Дизайн-система Selectel',
    description: 'Разработка и внедрение комплексной дизайн-системы для Selectel'
  },
  {
    key: 'hackathons',
    file: 'hackathons',
    title: 'Хакатоны',
    description: 'Участие в хакатонах и создание инновационных решений в условиях ограниченного времени'
  }
];

const generateImagePath = (projectKey, index, originalUrl) => {
  const ext = path.extname(originalUrl.split('?')[0]) || '.jpg';
  return `/assets/images/${projectKey.toLowerCase().replace('system', '-system')}/${projectKey}-${index}${ext}`;
};

const createProjectContent = (projectKey, data, config) => {
  let imageIndex = 1;
  let content = [];
  let currentSection = null;

  // Add project header with Russian title
  content.push(`          <header class="project-header">
            <h1>${config.title}</h1>
          </header>`);

  // Process content blocks with improved spacing
  data.content.forEach(block => {
    switch (block.type) {
      case 'text':
        if (block.content.trim()) {
          const translatedText = translations.content[block.content.trim()] || block.content.trim();
          content.push(`          <p>${translatedText}</p>`);
        }
        break;

      case 'h1':
      case 'h2':
        if (currentSection) {
          content.push('          </section>');
        }
        currentSection = block.content.trim();
        const translatedTitle = translations.sections[currentSection] || currentSection;
        content.push('\n          <section class="project-section">\n            <h2>' + translatedTitle + '</h2>');
        break;

      case 'image':
        const imagePath = generateImagePath(projectKey, imageIndex++, block.url);
        const altText = block.caption || `${config.title} - изображение ${imageIndex}`;
        const imageHtml = block.caption
          ? `          <figure class="project-image">
            <img src="${imagePath}" alt="${altText}" loading="lazy">
            <figcaption>${block.caption}</figcaption>
          </figure>`
          : `          <figure class="project-image">
            <img src="${imagePath}" alt="${altText}" loading="lazy">
          </figure>`;
        content.push(imageHtml);
        break;
    }
  });

  // Close the last section if open
  if (currentSection) {
    content.push('          </section>');
  }

  return content.join('\n');
};

const getProjectNavigation = (currentKey) => {
  const currentIndex = projectsConfig.findIndex(p => p.key === currentKey);
  const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : projectsConfig.length - 1;
  const nextIndex = currentIndex + 1 < projectsConfig.length ? currentIndex + 1 : 0;

  return {
    prev: projectsConfig[prevIndex],
    next: projectsConfig[nextIndex]
  };
};

const updateProjectPage = (projectKey) => {
  const projectData = notionContent[projectKey];
  const projectConfig = projectsConfig.find(p => p.key === projectKey);
  const navigation = getProjectNavigation(projectKey);
  
  const templatePath = path.join(projectRoot, 'src', 'templates', 'project-template.html');
  const outputPath = path.join(projectRoot, 'src', 'projects', `${projectConfig.file}.html`);
  
  let template = fs.readFileSync(templatePath, 'utf8');
  const content = createProjectContent(projectKey, projectData, projectConfig);

  // Replace template variables
  template = template
    .replace('{{title}}', projectConfig.title)
    .replace('{{description}}', projectConfig.description)
    .replace('{{prevProject}}', navigation.prev.file)
    .replace('{{prevTitle}}', navigation.prev.title)
    .replace('{{nextProject}}', navigation.next.file)
    .replace('{{nextTitle}}', navigation.next.title)
    .replace('{{role}}', translations.content['UX Designer'])
    .replace('<!-- Project content will be inserted here -->', content);

  fs.writeFileSync(outputPath, template);
  console.log(`Updated ${outputPath}`);
};

// Create project pages
try {
  projectsConfig.forEach(project => {
    updateProjectPage(project.key);
  });

  console.log('All project pages updated successfully!');
} catch (error) {
  console.error('Error updating project pages:', error);
}