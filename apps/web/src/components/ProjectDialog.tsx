import { useEffect, useId, useRef } from 'react';
import type { Project } from '../content/types';
import { UI } from '../content/ui';
import { Button, Label } from './ui';

interface ProjectDialogProps {
  /** The project to show, or null when closed. */
  project: Project | null;
  onClose: () => void;
}

/**
 * Project detail as a native modal <dialog>: the browser traps focus, makes the page inert,
 * closes on Esc and returns focus to the opener. Backdrop click and the close button are added here.
 */
export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (dialog === null) return;
    if (project !== null && !dialog.open) {
      opener.current = document.activeElement;
      dialog.showModal();
    } else if (project === null && dialog.open) {
      dialog.close();
    }
  }, [project]);

  const handleClose = () => {
    // Belt and braces: restore focus ourselves in case the browser does not.
    if (opener.current instanceof HTMLElement) opener.current.focus();
    onClose();
  };

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby={titleId}
      onClose={handleClose}
      onClick={(event) => {
        // Only a click on the dialog box itself (the backdrop area) closes it.
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      {project !== null && (
        <div className="project-dialog__body">
          <Label>{project.period}</Label>
          <h3 id={titleId} className="project-dialog__title">
            {project.title}
          </h3>
          <p>{project.summary}</p>
          <dl className="project-dialog__facts">
            <dt>{UI.projectRole}</dt>
            <dd>{project.role}</dd>
            <dt>{UI.projectStack}</dt>
            <dd>{project.stack.join(', ')}</dd>
          </dl>
          {project.links.length > 0 && (
            <ul className="project-dialog__links" aria-label={UI.projectLinks}>
              {project.links.map((link) => (
                <li key={link.href}>
                  <Button href={link.href} external variant="ghost" arrow>
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <Button variant="primary" onClick={() => ref.current?.close()}>
            {UI.projectClose}
          </Button>
        </div>
      )}
    </dialog>
  );
}
