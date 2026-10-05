import { CONTACT } from '../content/contact';
import { UI } from '../content/ui';
import { ArrowIcon } from './ui';

/**
 * The closing band: the email address set large as the primary action, with LinkedIn and GitHub
 * (and a résumé link when a file is configured) as quieter links.
 */
export function ContactBody() {
  const [email, ...others] = CONTACT.links;
  return (
    <div className="contact">
      <p className="contact__intro">{CONTACT.intro}</p>
      {email !== undefined && (
        <a className="contact__email" href={email.href}>
          {email.href.replace('mailto:', '')}
        </a>
      )}
      <ul className="contact__links">
        {others.map((link) => (
          <li key={link.id}>
            <a
              className="contact__link"
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
              <ArrowIcon />
            </a>
          </li>
        ))}
        {CONTACT.resumeHref !== null && (
          <li>
            <a className="contact__link" href={CONTACT.resumeHref} target="_blank" rel="noopener noreferrer">
              {UI.resumeLabel}
              <ArrowIcon />
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

/** A minimal footer on the closing band: name, year, place and a link back to the top. */
export function SiteFooter({ name }: { name: string }) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>
          © {new Date().getFullYear()} {name}, {CONTACT.footerNote}
        </p>
        <a href="#hero">{UI.backToTop}</a>
      </div>
    </footer>
  );
}
