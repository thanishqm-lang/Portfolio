import { Component, Suspense, lazy, useRef, type ReactNode } from 'react';
import { UI } from '../content/ui';
import { useInView } from '../three/useInView';
import { Panel } from './ui';

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
      <Panel role="alert">
        <p>{UI.assistantLoadError}</p>
      </Panel>
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
              <Panel role="status">
                <p>{UI.assistantLoading}</p>
              </Panel>
            }
          >
            <AssistantPanel />
          </Suspense>
        </LoadBoundary>
      )}
    </div>
  );
}
