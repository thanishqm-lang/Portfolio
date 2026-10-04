/**
 * A small page-level event so one part of the site (the assistant) can ask another (the project
 * panels) to open a project's detail dialog, without importing each other (tenet 3 keeps the
 * assistant out of the entry bundle).
 */
const OPEN_PROJECT_EVENT = 'awi:open-project';

export function requestOpenProject(projectId: string): void {
  window.dispatchEvent(new CustomEvent<string>(OPEN_PROJECT_EVENT, { detail: projectId }));
}

/** Calls `handler` with the project id whenever one is requested; returns the unsubscribe function. */
export function onOpenProject(handler: (projectId: string) => void): () => void {
  const listener = (event: Event) => {
    if (event instanceof CustomEvent && typeof event.detail === 'string') handler(event.detail);
  };
  window.addEventListener(OPEN_PROJECT_EVENT, listener);
  return () => window.removeEventListener(OPEN_PROJECT_EVENT, listener);
}
