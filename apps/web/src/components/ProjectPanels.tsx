import { useEffect, useState } from 'react';
import { PROJECTS } from '../content/projects';
import type { Project } from '../content/types';
import { UI } from '../content/ui';
import { onOpenProject } from '../events';
import { ProjectDialog } from './ProjectDialog';
import { Reveal } from './Reveal';
import { GlassPanel, MonoLabel, TagChip } from './ui';

/** Selected Work: one glass panel per project, each opening the detail dialog. Rendered from content. */
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
      <ul className="card-grid project-grid">
        {PROJECTS.map((project, index) => (
          <li key={project.id}>
            <Reveal index={index} className="reveal--fill">
              <GlassPanel as="article" className="card">
                <MonoLabel>{project.period}</MonoLabel>
                <h3 className="card__title">{project.title}</h3>
                <p className="card__text">{project.pitch}</p>
                <p className="card__text">{project.role}</p>
                <ul className="tag-list">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <TagChip>{tech}</TagChip>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="button button--ghost project-open"
                  aria-label={`${UI.projectOpen}: ${project.title}`}
                  onClick={() => setOpen(project)}
                >
                  {UI.projectOpen}
                </button>
              </GlassPanel>
            </Reveal>
          </li>
        ))}
      </ul>
      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </>
  );
}
