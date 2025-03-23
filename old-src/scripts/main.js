// Project data
const projects = [
  {
    id: 1,
    title: 'Редизайн CDN сервиса',
    description: 'CDN is a network that contains a lot of data caching servers. They speed up the delivery of static content to the end user.',
    image: '/assets/images/project1.jpg',
    tags: ['UX Research', 'Service Design', 'B2B'],
    link: '/projects/story-redesign.html'
  },
  {
    id: 2,
    title: 'Дизайн-система Selectel',
    description: 'We developed and implemented a set of components and patterns, making the design process more efficient and communication between designers seamless.',
    image: '/assets/images/project2.jpg',
    tags: ['Design System', 'Component Library', 'Documentation'],
    link: '/projects/selectel-design-system.html'
  },
  {
    id: 3,
    title: 'Хакатоны',
    description: 'We took 3rd place at the regional stage of the Digital Breakthrough hackathon. Over the weekend we made a mobile SPA app for searching and distributing orders on the student campus.',
    image: '/assets/images/project3.jpg',
    tags: ['Hackathon', 'Rapid Prototyping', 'Team Work'],
    link: '/projects/hackathons.html'
  }
];

/**
 * Creates a project card element
 * @param {Object} project - Project data
 * @returns {string} HTML string for the project card
 */
const createProjectCard = (project) => {
  return `
    <a href="${project.link}" class="project-card">
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
      </div>
    </a>
  `;
};

/**
 * Initializes the projects grid
 */
const initializeProjects = () => {
  const projectsGrid = document.querySelector('.projects-grid .grid');
  if (projectsGrid) {
    projectsGrid.innerHTML = projects.map(project => createProjectCard(project)).join('');
  }
};

/**
 * Sets up smooth scrolling for navigation links
 */
const setupSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

/**
 * Initializes image lazy loading
 */
const initializeLazyLoading = () => {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.getAttribute('src');
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeProjects();
  setupSmoothScroll();
  initializeLazyLoading();
});