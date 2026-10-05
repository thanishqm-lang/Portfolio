/**
 * The static AI Core, shown when WebGL is unavailable, motion is reduced, or the 3D chunk is still
 * loading or failed to load (tenet 2, NS-15). Pure SVG, drawn in flat line work and coloured through
 * the design tokens.
 */
export function CoreFallback() {
  return (
    <svg className="core-fallback" viewBox="-120 -120 240 240" role="presentation" focusable="false">
      <circle className="core-fallback__ring" r="98" />
      <circle className="core-fallback__ring core-fallback__ring--2" r="80" />
      <polygon className="core-fallback__lattice" points="0,-62 54,-31 54,31 0,62 -54,31 -54,-31" />
      <polygon
        className="core-fallback__lattice core-fallback__lattice--2"
        points="0,-34 29,-17 29,17 0,34 -29,17 -29,-17"
      />
      <circle className="core-fallback__heart" r="12" />
    </svg>
  );
}
