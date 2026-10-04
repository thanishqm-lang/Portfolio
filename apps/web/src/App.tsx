import { AboutBody } from './components/AboutBody';
import { AssistantSection } from './components/AssistantSection';
import { CapabilityCards } from './components/CapabilityCards';
import { ContactBody, SiteFooter } from './components/ContactBody';
import { HeroBackground, HeroBody } from './components/HeroBody';
import { ProjectPanels } from './components/ProjectPanels';
import { Reveal } from './components/Reveal';
import { Section } from './components/Section';
import { SiteNav } from './components/SiteNav';
import { TechUniverse } from './components/TechUniverse';
import { PROFILE } from './content/profile';
import { SECTIONS, UI, type SectionId } from './content/ui';

function SectionBody({ id, nextId }: { id: SectionId; nextId: string | undefined }) {
  switch (id) {
    case 'hero':
      return <HeroBody nextId={nextId ?? 'hero'} />;
    case 'what-i-build':
      return <CapabilityCards />;
    case 'selected-work':
      return <ProjectPanels />;
    case 'tech-universe':
      return (
        <Reveal index={1}>
          <TechUniverse />
        </Reveal>
      );
    case 'about':
      return (
        <Reveal index={1}>
          <AboutBody />
        </Reveal>
      );
    case 'assistant':
      return (
        <Reveal index={1}>
          <AssistantSection />
        </Reveal>
      );
    case 'contact':
      return (
        <Reveal index={1}>
          <ContactBody />
        </Reveal>
      );
    default: {
      const unhandled: never = id;
      throw new Error(`Unhandled section: ${String(unhandled)}`);
    }
  }
}

/** The portfolio page: seven anchored sections in PRD order, then the footer. */
export function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        {UI.skipToContent}
      </a>
      <SiteNav />
      <main id="main" tabIndex={-1} className="page">
        {SECTIONS.map((section, index) => (
          <Section
            key={section.id}
            id={section.id}
            eyebrow={section.eyebrow}
            title={section.title}
            isFirst={index === 0}
            background={section.id === 'hero' ? <HeroBackground /> : undefined}
          >
            <SectionBody id={section.id} nextId={SECTIONS[index + 1]?.id} />
          </Section>
        ))}
      </main>
      <SiteFooter name={PROFILE.fullName} />
    </>
  );
}
