import { Component, Suspense, lazy, useRef, type ReactNode } from 'react';
import { UI } from '../content/ui';
import { useInView } from '../three/useInView';
import { GlassPanel } from './ui';

// The assistant (engine and knowledge) is a separate chunk, loaded when the section nears the
// viewport; it is never part of the entry bundle (tenet 3).
const AssistantPanel = lazy(() => import('../assistant/AssistantPanel'));

class LoadBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  override render(): ReactNode {
    return this.state.failed ? (
      <GlassPanel role="alert">
        <p>{UI.assistantLoadError}</p>
      </GlassPanel>
    ) : (
      this.props.children
    );
  }
}

/** Loads the assistant on demand and shows a short message while it loads or if it cannot. */
export function AssistantSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { seen } = useInView(ref, '400px');

  return (
    <div ref={ref}>
      {seen && (
        <LoadBoundary>
          <Suspense
            fallback={
              <GlassPanel role="status">
                <p>{UI.assistantLoading}</p>
              </GlassPanel>
            }
          >
            <AssistantPanel />
          </Suspense>
        </LoadBoundary>
      )}
    </div>
  );
}
