import type { Capability } from './types';

/** The four "What I do" rows, written from the résumé's skills and experience. */
export const CAPABILITIES: readonly Capability[] = [
  {
    id: 'manual',
    title: 'Manual testing',
    description:
      'Functional, regression, exploratory, integration and user acceptance testing, with test cases built around real user workflows and business requirements.',
  },
  {
    id: 'automation',
    title: 'Test automation',
    description:
      'Automation scripts in Playwright with JavaScript, BDD scenarios in Cucumber and the Page Object Model, covering critical scenarios and cutting repeated manual regression.',
  },
  {
    id: 'pipeline',
    title: 'CI/CD and tooling',
    description:
      'Version control with Git and build pipelines with Jenkins, so automated checks run as part of delivery.',
  },
  {
    id: 'agile',
    title: 'Quality in Agile teams',
    description:
      'Working with developers and product owners, keeping defect logs in Jira and sharing clear test reports and quality metrics with stakeholders.',
  },
];
