/** How long a scene's own idle movement runs at full speed, then how long it takes to ease to rest. */
const FULL_SECONDS = 3.5;
const EASE_SECONDS = 1.5;

/**
 * A 1 to 0 multiplier for automatic movement (slow spins, pulses). A scene shows it moving for a few
 * seconds and then settles, so nothing loops past five seconds on its own (WCAG 2.2.2). Movement the
 * visitor causes, such as the Core following the cursor, does not use this and stays live.
 */
export function idleSpeed(elapsedSeconds: number): number {
  if (elapsedSeconds <= FULL_SECONDS) return 1;
  const eased = 1 - (elapsedSeconds - FULL_SECONDS) / EASE_SECONDS;
  return Math.max(0, eased * eased);
}
