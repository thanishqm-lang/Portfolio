import type { StackCategory, StackItem } from './types';

/** Category order, each paired with the design token its nodes are coloured by (never a raw hex). */
export const STACK_CATEGORIES = [
  { name: 'Testing types', token: '--color-accent' },
  { name: 'Automation tools', token: '--color-accent-2' },
  { name: 'Languages', token: '--color-accent-3' },
  { name: 'Version control and CI/CD', token: '--color-accent-4' },
  { name: 'Tracking and methodology', token: '--color-accent-5' },
] as const satisfies readonly { name: StackCategory; token: string }[];

/** The toolkit shown in the tech universe (TECH-01). Everything here is listed in the résumé. */
export const STACK: readonly StackItem[] = [
  { id: 'automation-testing', name: 'Automation testing', category: 'Testing types', usedFor: 'Scripting critical scenarios so they run without manual effort.' },
  { id: 'manual-testing', name: 'Manual testing', category: 'Testing types', usedFor: 'Hands-on checks of workflows and requirements.' },
  { id: 'functional-testing', name: 'Functional testing', category: 'Testing types', usedFor: 'Checking features behave as the requirements say.' },
  { id: 'regression-testing', name: 'Regression testing', category: 'Testing types', usedFor: 'Confirming new changes do not break what worked.' },
  { id: 'uat', name: 'UAT', category: 'Testing types', usedFor: 'Validating features against acceptance criteria.' },
  { id: 'integration-testing', name: 'Integration testing', category: 'Testing types', usedFor: 'Checking that connected parts work together.' },
  { id: 'playwright', name: 'Playwright (JavaScript)', category: 'Automation tools', usedFor: 'Browser automation for web application workflows.' },
  { id: 'cucumber', name: 'Cucumber (BDD)', category: 'Automation tools', usedFor: 'Behaviour-driven scenarios that validate workflows.' },
  { id: 'testng', name: 'TestNG', category: 'Automation tools', usedFor: 'Test framework listed in my skills.' },
  { id: 'pom', name: 'Page Object Model', category: 'Automation tools', usedFor: 'Structuring automation code so it stays maintainable.' },
  { id: 'javascript', name: 'JavaScript', category: 'Languages', usedFor: 'Writing automation scripts.' },
  { id: 'sql', name: 'SQL (basic)', category: 'Languages', usedFor: 'Basic queries for data checks.' },
  { id: 'git', name: 'Git', category: 'Version control and CI/CD', usedFor: 'Version control for automation code.' },
  { id: 'jenkins', name: 'Jenkins', category: 'Version control and CI/CD', usedFor: 'Running automated checks in a pipeline.' },
  { id: 'jira', name: 'Jira', category: 'Tracking and methodology', usedFor: 'Defect tracking and test management.' },
  { id: 'agile', name: 'Agile (Scrum)', category: 'Tracking and methodology', usedFor: 'Working in sprints with developers and product owners.' },
  { id: 'waterfall', name: 'Waterfall model', category: 'Tracking and methodology', usedFor: 'Familiarity with the traditional delivery model.' },
];
