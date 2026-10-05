import { Component, Suspense, useMemo, useRef, type ReactNode } from 'react';
import { useReducedMotion } from '../motion/useReducedMotion';
import { useInView } from './useInView';
import { useWhenIdle } from './useWhenIdle';
import { detectWebGL } from './webgl';

/** What every lazily loaded scene receives. `active` is false while the scene is off screen. */
export interface SceneProps {
  active: boolean;
}

interface LazySceneProps {
  /**
   * Renders the scene, given whether it is on screen. The scene itself must be a `React.lazy`
   * component so three.js stays out of the entry bundle (tenet 3).
   */
  render: (active: boolean) => ReactNode;
  /** Shown instead of the scene: no WebGL, reduced motion, a loading chunk, or a failed load (tenet 2). */
  fallback: ReactNode;
  className?: string;
}

class SceneBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  override render(): ReactNode {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * Mounts a 3D scene only when the browser supports WebGL, motion is not reduced and the scene
 * has come near the viewport. Everything else shows the fallback, which carries the same content.
 * The container is decorative, so assistive technology skips it; anything it shows must also exist
 * as real content elsewhere on the page.
 */
export function LazyScene({ render, fallback, className }: LazySceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const webgl = useMemo(() => detectWebGL(), []);
  const { inView, seen } = useInView(ref);
  const idle = useWhenIdle();
  // The 3D scene is expected on a capable device with motion allowed. While it is still loading
  // the container stays empty, so the flat fallback never flashes and then jumps to the 3D version;
  // the scene fades in when it is ready. The fallback shows at once where 3D will never appear.
  const expects3D = webgl && !reducedMotion;
  const use3D = expects3D && seen && idle;

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {use3D ? (
        <SceneBoundary fallback={fallback}>
          <Suspense fallback={null}>{render(inView)}</Suspense>
        </SceneBoundary>
      ) : expects3D ? null : (
        fallback
      )}
    </div>
  );
}
