import { CAPABILITIES } from '../content/capabilities';
import { CONTACT } from '../content/contact';
import { EXPERIENCE } from '../content/experience';
import { PROFILE } from '../content/profile';
import { PROJECTS } from '../content/projects';
import { STACK, STACK_CATEGORIES } from '../content/stack';
import type { KnowledgeEntry } from '../content/types';

/**
 * The assistant's whole knowledge. Every answer is built from the content modules (the résumé
 * facts), so nothing is typed twice and nothing is invented (NS-20, NS-30, tenet 6). Only the
 * greeting, thanks and "how does this work" entries are written here, and they make no claims
 * about the owner's work.
 */

const joinList = (items: readonly string[]): string => items.join(', ');

/** Extra ways a visitor might name a tool or category, beyond its own name. */
const TOOL_SYNONYMS: Readonly<Record<string, readonly string[]>> = {
  cucumber: ['bdd', 'behaviour driven', 'behavior driven', 'gherkin'],
  pom: ['pom', 'page object'],
  agile: ['scrum', 'sprint', 'sprints'],
  waterfall: ['waterfall'],
  jenkins: ['pipeline', 'pipelines'],
  sql: ['database', 'query', 'queries'],
  uat: ['user acceptance', 'acceptance testing'],
  'automation-testing': ['test automation', 'automate', 'automated', 'automating'],
};

const CATEGORY_SYNONYMS: Readonly<Record<string, readonly string[]>> = {
  'Testing types': ['types of testing', 'kinds of testing', 'testing types'],
  'Automation tools': ['automation tools', 'framework', 'frameworks', 'test automation tools'],
  Languages: ['language', 'languages', 'programming', 'coding', 'code'],
  'Version control and CI/CD': ['version control', 'ci/cd', 'cicd', 'devops'],
  'Tracking and methodology': ['methodology', 'methodologies', 'tracking', 'process', 'defect tracking'],
};

/** Short names visitors use for a project, beyond its title and stack. */
const PROJECT_SYNONYMS: Readonly<Record<string, readonly string[]>> = {
  'ams-client': ['crm', 'ams', 'application management', 'us client'],
  'product-analytics': ['product analytics', 'analytics'],
  'lab-portfolio': ['quality lab', 'this portfolio', 'this site', 'this website', 'portfolio site'],
};

const ABOUT = PROFILE.about;
const JOB = EXPERIENCE[0];
const EDUCATION = ABOUT.education;
const EMAIL = CONTACT.links.find((link) => link.id === 'email');
const LINKEDIN = CONTACT.links.find((link) => link.id === 'linkedin');
const GITHUB = CONTACT.links.find((link) => link.id === 'github');

const handwritten: KnowledgeEntry[] = [
  {
    id: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good evening'],
    questions: ['Hello'],
    answer:
      "Hello! I can answer questions about my work: what I do, my projects, my tools, my experience, my education and how to contact me.",
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'thx', 'cheers'],
    questions: ['Thank you'],
    answer: "You're welcome! Ask me anything else about my work.",
  },
  {
    id: 'how-it-works',
    keywords: ['chatbot', 'assistant', 'bot', 'llm', 'chatgpt', 'gpt', 'how does this work', 'powered'],
    questions: ['How does this assistant work?'],
    answer:
      "I'm a small assistant that runs entirely in your browser. I only answer from what is written on this site, and I don't use an AI service, so I can't guess or invent things. If I don't know something, I'll say so.",
  },
  {
    id: 'about-me',
    keywords: ['who', 'yourself', 'introduce', 'background', 'bio', 'profession', 'what do you do', 'job title'],
    questions: ['What do you do?', 'Who are you?', 'Tell me about yourself'],
    answer: `${ABOUT.paragraphs[0] ?? ''} I'm based in ${PROFILE.location}.`.trim(),
    target: 'about',
    suggested: true,
  },
  {
    id: 'experience',
    keywords: [
      'experience', 'worked', 'employer', 'company', 'job', 'career', 'work history',
      'work experience', 'deepta', 'years', 'current role', 'employment',
    ],
    questions: ['Tell me about your experience', 'Where do you work?'],
    answer:
      JOB === undefined
        ? ''
        : `I work as a ${JOB.role} at ${JOB.company} (${JOB.period}). ${JOB.highlights.slice(0, 3).join(' ')}`,
    target: 'about',
    suggested: true,
  },
  {
    id: 'education',
    keywords: [
      'education', 'degree', 'study', 'studied', 'college', 'university', 'btech', 'b tech',
      'cbit', 'graduate', 'graduated', 'school', 'qualification', 'qualifications',
    ],
    questions: ['What is your education?', 'Where did you study?'],
    answer: `I have a ${EDUCATION.degree} from ${EDUCATION.school} (${EDUCATION.period}).`,
    target: 'about',
    suggested: true,
  },
  {
    id: 'location',
    keywords: ['located', 'location', 'based', 'live', 'city', 'country', 'hyderabad', 'india'],
    questions: ['Where are you based?'],
    answer: `I'm based in ${PROFILE.location}.`,
  },
  {
    // The owner confirmed in chat that they are open to work (NS-30); the wording lives in content/contact.ts.
    id: 'availability',
    keywords: [
      'open to work', 'available', 'availability', 'looking for', 'job opportunity', 'job opportunities',
      'opportunity', 'opportunities', 'open for', 'job search', 'hiring', 'hire',
    ],
    questions: ['Are you open to work?'],
    answer: CONTACT.intro,
    target: 'contact',
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'mail', 'reach', 'linkedin', 'github', 'hire', 'get in touch', 'message', 'connect'],
    questions: ['How can I contact you?'],
    answer:
      EMAIL === undefined || LINKEDIN === undefined || GITHUB === undefined
        ? ''
        : `You can email me at ${EMAIL.href.replace('mailto:', '')}, find me on LinkedIn: ${LINKEDIN.href} or see my code on GitHub: ${GITHUB.href}`,
    target: 'contact',
    suggested: true,
  },
  {
    id: 'projects-overview',
    // "build" (a request: "can you build me...") is deliberately not a keyword; "built" (past tense) is.
    keywords: ['project', 'portfolio', 'built', 'selected work', 'worked on', 'case study', 'case studies'],
    questions: ['Which projects have you worked on?', 'What have you built?'],
    answer: `Here is my selected work: ${PROJECTS.map((project) => `${project.title} (${project.period}): ${project.pitch}`).join(' ')}`,
    target: 'selected-work',
    suggested: true,
  },
  {
    id: 'tools-overview',
    keywords: ['tool', 'tech', 'stack', 'technology', 'technologies', 'skill', 'toolkit', 'tech stack', 'frameworks'],
    questions: ['What tools do you use?', 'What are your skills?'],
    answer: `Here is my toolkit. ${STACK_CATEGORIES.map(
      (category) =>
        `${category.name}: ${joinList(STACK.filter((item) => item.category === category.name).map((item) => item.name))}.`,
    ).join(' ')}`,
    target: 'tech-universe',
    suggested: true,
  },
];

const capabilityEntries: KnowledgeEntry[] = CAPABILITIES.map((capability) => ({
  id: `capability-${capability.id}`,
  keywords:
    capability.id === 'manual'
      ? ['manual testing', 'manual']
      : capability.id === 'automation'
        ? ['test automation', 'automation', 'automate', 'automated', 'automating']
        : capability.id === 'pipeline'
          ? ['ci/cd', 'cicd', 'pipeline', 'tooling', 'version control']
          : ['agile', 'team', 'collaborate', 'collaboration', 'defect', 'defects', 'report', 'reports'],
  questions: [`Do you do ${capability.title.toLowerCase()}?`],
  answer: `${capability.title}: ${capability.description}`,
  target: 'what-i-build',
}));

const projectEntries: KnowledgeEntry[] = PROJECTS.map((project) => ({
  id: `project-${project.id}`,
  keywords: [
    ...project.title
      .split(/[,:()]/)
      .map((part) => part.trim())
      .filter((part) => part.length > 2),
    ...project.stack,
    ...(PROJECT_SYNONYMS[project.id] ?? []),
  ],
  questions: [`Tell me about ${project.title}`],
  answer: `${project.title} (${project.period}). ${project.summary} My role: ${project.role}. Stack: ${joinList(project.stack)}.`,
  target: 'selected-work',
  projectId: project.id,
}));

const toolEntries: KnowledgeEntry[] = STACK.map((item) => ({
  id: `tool-${item.id}`,
  keywords: [
    item.name.replace(/\(.*?\)/g, '').trim(),
    ...(TOOL_SYNONYMS[item.id] ?? []),
  ],
  questions: [`Do you use ${item.name}?`],
  answer: `${item.name} is part of my toolkit (${item.category}). ${item.usedFor}`,
  target: 'tech-universe',
}));

const categoryEntries: KnowledgeEntry[] = STACK_CATEGORIES.map((category) => ({
  id: `category-${category.name}`,
  keywords: [category.name, ...(CATEGORY_SYNONYMS[category.name] ?? [])],
  questions: [`What ${category.name.toLowerCase()} do you know?`],
  answer: `${category.name}: ${joinList(STACK.filter((item) => item.category === category.name).map((item) => item.name))}.`,
  target: 'tech-universe',
}));

/** Broad "tell me about X" entries. On a tie they lose to a specific entry ("CRM" beats "projects"). */
export const OVERVIEW_IDS: ReadonlySet<string> = new Set(['about-me', 'projects-overview', 'tools-overview']);

// Order matters only for ties: earlier entries win. Specific entries come first, overviews last.
const ALL_ENTRIES: readonly KnowledgeEntry[] = [
  ...handwritten,
  ...capabilityEntries,
  ...projectEntries,
  ...categoryEntries,
  ...toolEntries,
];

export const KNOWLEDGE: readonly KnowledgeEntry[] = [
  ...ALL_ENTRIES.filter((entry) => !OVERVIEW_IDS.has(entry.id)),
  ...ALL_ENTRIES.filter((entry) => OVERVIEW_IDS.has(entry.id)),
];

/** The starter chips: the first question of every entry marked `suggested`. */
export const SUGGESTED_QUESTIONS: readonly string[] = ALL_ENTRIES.filter(
  (entry) => entry.suggested === true,
).flatMap((entry) => (entry.questions[0] === undefined ? [] : [entry.questions[0]]));
