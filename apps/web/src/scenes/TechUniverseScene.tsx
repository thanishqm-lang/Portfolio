import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import type { Group } from 'three';
import { STACK_CATEGORIES } from '../content/stack';
import type { StackCategory, StackItem } from '../content/types';
import { SceneCanvas } from '../three/SceneCanvas';
import type { SceneProps } from '../three/LazyScene';
import { idleSpeed } from '../three/idleSpeed';
import { readCssToken } from '../three/tokens';

export interface TechSceneProps extends SceneProps {
  items: readonly StackItem[];
  /** The category the filter has chosen, or 'All'. Nodes outside it are dimmed. */
  activeCategory: StackCategory | 'All';
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

type Vec3 = [number, number, number];

interface PlacedNode {
  item: StackItem;
  position: Vec3;
  color: string;
}

interface PlacedCluster {
  name: StackCategory;
  center: Vec3;
  color: string;
}

const RING_RADIUS_X = 3.4;
const RING_RADIUS_Z = 2.2; // flatter in depth, so every cluster stays a similar size on screen
const CLUSTER_RADIUS = 1.35;
const GOLDEN_ANGLE = 2.399963;

/** Clusters sit on a flattened ring around the centre, one per category; nodes spread on a small sphere. */
function layout(items: readonly StackItem[]): { nodes: PlacedNode[]; clusters: PlacedCluster[] } {
  const nodes: PlacedNode[] = [];
  const clusters: PlacedCluster[] = [];
  STACK_CATEGORIES.forEach((category, categoryIndex) => {
    const members = items.filter((item) => item.category === category.name);
    const angle = (categoryIndex / STACK_CATEGORIES.length) * Math.PI * 2 - Math.PI / 2;
    const center: Vec3 = [
      Math.cos(angle) * RING_RADIUS_X,
      categoryIndex % 2 === 0 ? 0.9 : -0.9,
      Math.sin(angle) * RING_RADIUS_Z,
    ];
    const color = readCssToken(category.token);
    clusters.push({ name: category.name, center, color });
    members.forEach((item, k) => {
      const t = members.length > 1 ? k / (members.length - 1) : 0.5;
      const y = 1 - t * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = k * GOLDEN_ANGLE;
      nodes.push({
        item,
        color,
        position: [
          center[0] + Math.cos(theta) * radius * CLUSTER_RADIUS,
          center[1] + y * CLUSTER_RADIUS * 0.8,
          center[2] + Math.sin(theta) * radius * CLUSTER_RADIUS,
        ],
      });
    });
  });
  return { nodes, clusters };
}

function TechUniverse({
  items,
  activeCategory,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: Omit<TechSceneProps, 'active'>) {
  const { nodes, clusters } = useMemo(() => layout(items), [items]);
  const ink = useMemo(() => readCssToken('--color-text'), []);
  const group = useRef<Group>(null);

  // A slow drift that settles after a few seconds, and never moves while a node is hovered.
  useFrame((state, delta) => {
    if (group.current && hoveredId === null) {
      group.current.rotation.y += delta * 0.05 * idleSpeed(state.clock.elapsedTime);
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial
          color={ink}
          wireframe
          transparent
          opacity={0.28}
          depthWrite={false}
        />
      </mesh>

      {clusters.map((cluster) => {
        const dim = activeCategory !== 'All' && activeCategory !== cluster.name;
        return (
          <Html
            key={cluster.name}
            center
            position={[cluster.center[0], cluster.center[1] + CLUSTER_RADIUS + 0.55, cluster.center[2]]}
            style={{ pointerEvents: 'none' }}
          >
            <span
              className={dim ? 'tech-cluster tech-cluster--dim' : 'tech-cluster'}
              style={{ color: cluster.color }}
            >
              {cluster.name}
            </span>
          </Html>
        );
      })}

      {nodes.map(({ item, position, color }) => {
        const inCategory = activeCategory === 'All' || item.category === activeCategory;
        const emphasised = item.id === selectedId || item.id === hoveredId;
        const dim = !inCategory && !emphasised;
        const showLabel = emphasised || (activeCategory !== 'All' && inCategory);
        return (
          <group key={item.id} position={position}>
            <mesh
              scale={emphasised ? 1.9 : 1}
              onPointerOver={(event) => {
                event.stopPropagation();
                document.body.style.cursor = 'pointer';
                onHover(item.id);
              }}
              onPointerOut={() => {
                document.body.style.cursor = '';
                onHover(null);
              }}
              onClick={(event) => {
                event.stopPropagation();
                onSelect(item.id);
              }}
            >
              <sphereGeometry args={[0.17, 20, 20]} />
              <meshBasicMaterial color={color} transparent opacity={dim ? 0.18 : 1} />
            </mesh>
            {showLabel && (
              <Html center position={[0, 0.5, 0]} style={{ pointerEvents: 'none' }}>
                <span className={emphasised ? 'tech-label tech-label--active' : 'tech-label'}>
                  {item.name}
                </span>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function TechUniverseScene({ active, ...rest }: TechSceneProps) {
  return (
    <SceneCanvas active={active} cameraZ={12.5}>
      <TechUniverse {...rest} />
    </SceneCanvas>
  );
}
