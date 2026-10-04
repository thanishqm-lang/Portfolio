import type { Capability } from '../content/types';

/** Original line icons for the capability cards. Decorative, so they are hidden from assistive tech. */
export function CapabilityIcon({ icon }: { icon: Capability['icon'] }) {
  const common = {
    className: 'card__icon',
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
  };

  switch (icon) {
    case 'manual':
      return (
        <svg {...common}>
          <circle cx="21" cy="21" r="11" />
          <path d="M29 29l11 11" />
          <path d="M16 21l4 4 7-8" />
        </svg>
      );
    case 'automation':
      return (
        <svg {...common}>
          <rect x="6" y="9" width="36" height="26" rx="4" />
          <path d="M20 17l9 5-9 5z" />
          <path d="M16 41h16" />
        </svg>
      );
    case 'pipeline':
      return (
        <svg {...common}>
          <circle cx="10" cy="24" r="4" />
          <circle cx="24" cy="24" r="4" />
          <circle cx="38" cy="24" r="4" />
          <path d="M14 24h6M28 24h6" />
          <path d="M10 14c0-5 6-8 14-8s14 3 14 8" />
        </svg>
      );
    case 'agile':
      return (
        <svg {...common}>
          <path d="M8 12h22M8 24h22M8 36h14" />
          <path d="M34 22l4 4 6-8" />
          <path d="M34 34l4 4 6-8" opacity="0.5" />
        </svg>
      );
    default: {
      const unreachable: never = icon;
      throw new Error(`Unknown icon: ${String(unreachable)}`);
    }
  }
}
