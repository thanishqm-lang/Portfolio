import type { Project } from './types';

/**
 * Selected work. The first two come from the résumé; the third is this site, listed as a personal
 * project (the owner to confirm). Client work has no public links, so none are invented (NS-30).
 */
export const PROJECTS: readonly Project[] = [
  {
    id: 'ams-client',
    title: 'Application Management System (CRM), US client',
    period: 'Aug 2025 – Jan 2026',
    pitch:
      'Manual and Playwright automated testing of a US client’s application-lifecycle platform.',
    summary:
      'Tested a web-based Application Management System that streamlines application lifecycle management. Covered user authentication, application submission workflows, status tracking and administrative dashboards through manual and automated testing, documented defects, worked with developers on fixes and re-validated them.',
    role: 'QA Engineer (manual and automation)',
    stack: ['Playwright', 'JavaScript', 'Manual testing'],
    links: [],
  },
  {
    id: 'product-analytics',
    title: 'Product Analytics',
    period: 'Mar 2026 – Present',
    pitch: 'Cucumber automation for an enterprise AI platform’s product analytics.',
    summary:
      'An enterprise AI platform for building, deploying and managing AI-powered solutions. This work covers product analytics that monitors overall user count across applications. Wrote automation scripts in JavaScript and Cucumber to validate workflows, and checked reliability across environments with and without network or power connectivity.',
    role: 'QA Engineer (automation)',
    stack: ['JavaScript', 'Cucumber (BDD)'],
    links: [],
  },
  {
    id: 'lab-portfolio',
    title: 'This portfolio: the Quality Lab',
    period: '2026',
    pitch: 'A personal portfolio site with a 3D animated hero, built as a React and TypeScript project.',
    summary:
      'A single-page, accessible portfolio with a 3D AI Core hero drawn in Three.js, an interactive tech universe and an in-browser assistant that answers questions about my work. Personal project built with React, TypeScript and Vite.',
    role: 'Designer and builder',
    stack: ['React', 'TypeScript', 'Vite', 'Three.js'],
    links: [],
  },
];
