import { CONTACT } from '../content/contact';
import { UI } from '../content/ui';
import { Button } from './ui';

/** The contact invitation: email and LinkedIn, plus a résumé link when a file is configured. */
export function ContactBody() {
  return (
    <div className="contact">
      <p className="contact__intro">{CONTACT.intro}</p>
      <div className="contact__links">
        {CONTACT.links.map((link, index) => (
          <Button
            key={link.id}
            href={link.href}
            external={link.external}
            variant={index === 0 ? 'primary' : 'ghost'}
          >
            {link.label}
          </Button>
        ))}
        {CONTACT.resumeHref !== null && (
          <Button href={CONTACT.resumeHref} external variant="ghost">
            {UI.resumeLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

/** A minimal footer: name, year and a link back to the top. */
export function SiteFooter({ name }: { name: string }) {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {name} · {CONTACT.footerNote}
      </p>
      <a href="#hero">{UI.backToTop}</a>
    </footer>
  );
}
