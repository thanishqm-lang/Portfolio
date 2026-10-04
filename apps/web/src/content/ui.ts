/**
 * Section registry and interface strings (tenet 1: no copy inside components).
 * The seven sections, in PRD order. Portfolio content lives in the other modules in this folder.
 */
export interface SectionDef {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  /** The short label used in the navigation bar. */
  readonly navLabel: string;
}

export const SECTIONS = [
  { id: 'hero', eyebrow: 'Quality Engineering Lab', title: 'THANISHQ', navLabel: 'Home' },
  { id: 'what-i-build', eyebrow: 'What I do', title: 'What I Do', navLabel: 'What I do' },
  { id: 'selected-work', eyebrow: 'Selected work', title: 'Selected Work', navLabel: 'Work' },
  { id: 'tech-universe', eyebrow: 'My toolkit', title: 'My Toolkit', navLabel: 'Toolkit' },
  { id: 'about', eyebrow: 'About', title: 'About Me', navLabel: 'About' },
  { id: 'assistant', eyebrow: 'Ask the Lab', title: 'Ask the Lab', navLabel: 'Ask' },
  { id: 'contact', eyebrow: 'Contact', title: 'Get in Touch', navLabel: 'Contact' },
] as const satisfies readonly SectionDef[];

export type SectionId = (typeof SECTIONS)[number]['id'];

export const UI = {
  shellNote: 'This section is a placeholder and is filled in by a later backlog item.',
  next: 'Next section',
  experienceHeading: 'Experience',
  educationHeading: 'Education',
  focusHeading: 'Focus areas',
  resumeLabel: 'Download résumé',
  backToTop: 'Back to top',
  projectOpen: 'View summary',
  projectClose: 'Close',
  projectRole: 'Role',
  projectStack: 'Stack',
  projectLinks: 'Links',
  assistantStatus: 'Online · runs in your browser',
  assistantNote: "Answers come only from what is written on this site. No AI service is used, so I won't make things up.",
  assistantInputLabel: 'Ask a question about my work',
  assistantPlaceholder: 'Ask about my work…',
  assistantSend: 'Ask',
  assistantReset: 'Reset',
  assistantSuggestions: 'Try asking',
  assistantYou: 'You',
  assistantLab: 'Lab',
  assistantSee: 'See',
  assistantOpen: 'Open',
  assistantSkip: 'Skip',
  assistantLoading: 'Loading the assistant…',
  assistantLoadError: 'The assistant could not load. Please reload the page to try again.',
  assistantEmpty: 'Type a question, or pick one of the suggestions.',
  assistantFallback:
    "I can only answer questions about my work: what I do, my projects, tools, experience, education and how to contact me. I don't have an answer for that. Try one of these:",
  skipToContent: 'Skip to main content',
  motionPause: 'Pause animations',
  assistantLogLabel: 'Conversation with the assistant',
  siteMark: 'THANISHQ',
  navLabel: 'Primary',
  menuOpen: 'Menu',
  menuClose: 'Close menu',
  filterLabel: 'Filter the toolkit by category',
  filterAll: 'All',
  toolkitList: 'Toolkit by category',
  detailEmpty: 'Select a tool to see what I use it for.',
  detailCategory: 'Category',
  detailUsedFor: 'What I use it for',
  universeCaption: 'Interactive toolkit universe. Hover or tap a node; the list beside it has the same content.',
} as const;
