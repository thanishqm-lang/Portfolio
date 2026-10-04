import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonBase {
  variant?: ButtonVariant;
  children: ReactNode;
}

interface LinkButtonProps extends ButtonBase {
  href: string;
  /** External links open in a new tab with rel="noopener" (never leaks window.opener). */
  external?: boolean;
}

interface ActionButtonProps extends ButtonBase {
  onClick: () => void;
  href?: undefined;
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

/** A call-to-action: a link when it has an href, otherwise a real button. */
export function Button(props: ButtonProps) {
  const variant = props.variant ?? 'primary';
  const className = `button button--${variant}`;

  if (props.href !== undefined) {
    const external = 'external' in props && props.external === true;
    return (
      <a
        className={className}
        href={props.href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {props.children}
      </a>
    );
  }

  return (
    <button className={className} type="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
}
