import { useEffect, useState } from 'react';
import { PROJECTS } from '../content/projects';
import type { Project } from '../content/types';
import { UI } from '../content/ui';
import { onOpenProject } from '../events';
import { ProjectDialog } from './ProjectDialog';
import { Reveal } from './Reveal';
import { ArrowIcon } from './ui';

/** Selected Work: one ruled row per project, each opening the detail dialog. Rendered from content. */
export function ProjectPanels() {
  const [open, setOpen] = useState<Project | null>(null);

  // The assistant's deep links ask for a project by id; unknown ids are ignored.
  useEffect(
    () =>
      onOpenProject((projectId) => {
        const project = PROJECTS.find((entry) => entry.id === projectId);
        if (project !== undefined) setOpen(project);
      }),
    [],
  );

  return (
    <>
      <ul className="work-list">
        {PROJECTS.map((project, index) => (
          <li key={project.id}>
            <Reveal index={index}>
              <article className="work">
                <p className="work__period">{project.period}</p>
                <div className="work__main">
                  <h3 className="work__title">
                    <button
                      type="button"
                      className="work__open"
                      aria-label={`${UI.projectOpen}: ${project.title}`}
                      onClick={() => setOpen(project)}
                    >
                      {project.title}
                      <ArrowIcon />
                    </button>
                  </h3>
                  <p className="work__pitch">{project.pitch}</p>
                  <p className="work__meta">
                    {project.role}
                    <span className="work__stack">{project.stack.join(' / ')}</span>
                  </p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </>
  );
}
