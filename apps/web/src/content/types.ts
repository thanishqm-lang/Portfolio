/** Typed shapes for every content module (FR-16, NS-21). Content is edited as data, never in components. */

export interface Capability {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface ExperienceEntry {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly period: string;
  readonly highlights: readonly string[];
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly period: string;
  readonly pitch: string;
  readonly summary: string;
  readonly role: string;
  readonly stack: readonly string[];
  /** Client work has no public links, so this stays empty rather than inventing one. */
  readonly links: readonly { readonly label: string; readonly href: string }[];
}

export type StackCategory =
  | 'Testing types'
  | 'Automation tools'
  | 'Languages'
  | 'Version control and CI/CD'
  | 'Tracking and methodology';

export interface StackItem {
  readonly id: string;
  readonly name: string;
  readonly category: StackCategory;
  /** One line on what it is used for, taken from the résumé. */
  readonly usedFor: string;
}

export interface ContactLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly external: boolean;
}

/** One answer the deterministic assistant can give (used from AST-01). */
export interface KnowledgeEntry {
  readonly id: string;
  /** Words or phrases that point at this entry; matched after normalisation. */
  readonly keywords: readonly string[];
  /** Example questions; the first one is the text of its suggestion chip when `suggested` is set. */
  readonly questions: readonly string[];
  readonly answer: string;
  /** A section id to link to from the answer. */
  readonly target?: string;
  /** A project id: the answer's link opens that project's detail dialog instead of scrolling. */
  readonly projectId?: string;
  /** Show this entry's first question as a starter chip. */
  readonly suggested?: boolean;
}
