import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/projects',
    component: ComponentCreator('/projects', 'be4'),
    routes: [
      {
        path: '/projects',
        component: ComponentCreator('/projects', '1d1'),
        routes: [
          {
            path: '/projects',
            component: ComponentCreator('/projects', 'c3a'),
            routes: [
              {
                path: '/projects/hackathons',
                component: ComponentCreator('/projects/hackathons', 'e88'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/projects/selectel-design-system',
                component: ComponentCreator('/projects/selectel-design-system', '33b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/projects/story-redesign',
                component: ComponentCreator('/projects/story-redesign', '32b'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
