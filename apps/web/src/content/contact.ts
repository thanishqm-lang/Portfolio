import type { ContactLink } from './types';

/**
 * Public contact links. The phone number and address on the résumé are deliberately NOT published.
 * The GitHub profile was added at the owner's request; the résumé PDF link stays hidden until a
 * file is added (CON-01).
 */
export const CONTACT = {
  heading: 'Get in touch',
  intro: "I'm open to QA and test automation opportunities. The quickest way to reach me is email.",
  links: [
    { id: 'email', label: 'Email', href: 'mailto:srithanishqmanda@gmail.com', external: false },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sri-thanishq-manda-4178b240a/',
      external: true,
    },
    { id: 'github', label: 'GitHub', href: 'https://github.com/thanishqm-lang', external: true },
  ] satisfies readonly ContactLink[],
  resumeHref: null as string | null,
  footerNote: 'Hyderabad, India',
} as const;
