import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group, Mesh } from 'three';
import { SceneCanvas } from '../three/SceneCanvas';
import type { SceneProps } from '../three/LazyScene';
import { idleSpeed } from '../three/idleSpeed';
import { readCssToken } from '../three/tokens';

/**
 * The AI Core on the green field: a warm heart inside two wireframe lattices and three rings. It spins
 * and pulses for a few seconds, then settles; it keeps following the cursor.
 */
function AiCore() {
  const line = useMemo(() => readCssToken('--scene-line'), []);
  const line2 = useMemo(() => readCssToken('--scene-line-2'), []);
  const heartColor = useMemo(() => readCssToken('--scene-heart'), []);

  const tilt = useRef<Group>(null);
  const lattice = useRef<Group>(null);
  const rings = useRef<Group>(null);
  const heart = useRef<Mesh>(null);
  // Where the cursor is, -1 to 1 across the window; only tracked on devices with a real cursor.
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state, delta) => {
    if (tilt.current) {
      // Ease toward the cursor (HERO-02) and shrink a little as the hero scrolls away.
      const ease = 1 - Math.pow(0.002, delta);
      tilt.current.rotation.y += (pointer.current.x * 0.35 - tilt.current.rotation.y) * ease;
      tilt.current.rotation.x += (pointer.current.y * 0.25 - tilt.current.rotation.x) * ease;
      const scrolled = Math.min(1, window.scrollY / Math.max(window.innerHeight, 1));
      const scale = 1 - scrolled * 0.18;
      tilt.current.scale.setScalar(tilt.current.scale.x + (scale - tilt.current.scale.x) * ease);
    }
    // Automatic movement eases to rest after a few seconds; the cursor tilt above stays live.
    const idle = idleSpeed(state.clock.elapsedTime);
    if (lattice.current) {
      lattice.current.rotation.y += delta * 0.18 * idle;
      lattice.current.rotation.x += delta * 0.05 * idle;
    }
    if (rings.current) {
      rings.current.rotation.z += delta * 0.12 * idle;
      rings.current.rotation.y -= delta * 0.07 * idle;
    }
    if (heart.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.07 * idle;
      heart.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={tilt}>
      <group ref={lattice}>
        <mesh>
          <icosahedronGeometry args={[1.7, 1]} />
          <meshBasicMaterial
            color={line}
            wireframe
            transparent
            opacity={0.55}
            depthWrite={false}
          />
        </mesh>
        <mesh rotation={[0.6, 0.4, 0]}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshBasicMaterial
            color={line2}
            wireframe
            transparent
            opacity={0.7}
            depthWrite={false}
          />
        </mesh>
      </group>

      <mesh ref={heart}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color={heartColor} />
      </mesh>

      <group ref={rings}>
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.25, 0.012, 8, 160]} />
          <meshBasicMaterial color={line} transparent opacity={0.8} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.55, 0.01, 8, 160]} />
          <meshBasicMaterial color={line2} transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 1.8, -Math.PI / 5, 0]}>
          <torusGeometry args={[2.9, 0.008, 8, 160]} />
          <meshBasicMaterial color={line} transparent opacity={0.45} />
        </mesh>
      </group>
    </group>
  );
}

export default function AiCoreScene({ active }: SceneProps) {
  return (
    <SceneCanvas active={active} cameraZ={7}>
      <AiCore />
    </SceneCanvas>
  );
}
