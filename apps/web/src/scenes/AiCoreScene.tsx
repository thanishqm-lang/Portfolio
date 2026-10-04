import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, Color, type Group, type Mesh } from 'three';
import { SceneCanvas } from '../three/SceneCanvas';
import type { SceneProps } from '../three/LazyScene';
import { readCssToken } from '../three/tokens';

const GLOW_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-viewPosition.xyz);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const GLOW_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float rim = pow(1.0 - abs(dot(vNormal, vView)), 2.4);
    gl_FragColor = vec4(uColor, rim * 0.85);
  }
`;

/** The original AI Core: a pulsing emissive heart inside two wireframe lattices and three rings. */
function AiCore() {
  const accent = useMemo(() => readCssToken('--color-accent'), []);
  const accent2 = useMemo(() => readCssToken('--color-accent-2'), []);
  const glowUniforms = useMemo(() => ({ uColor: { value: new Color(accent) } }), [accent]);

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
    if (lattice.current) {
      lattice.current.rotation.y += delta * 0.18;
      lattice.current.rotation.x += delta * 0.05;
    }
    if (rings.current) {
      rings.current.rotation.z += delta * 0.12;
      rings.current.rotation.y -= delta * 0.07;
    }
    if (heart.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.07;
      heart.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={tilt}>
      <group ref={lattice}>
        <mesh>
          <icosahedronGeometry args={[1.7, 1]} />
          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={0.55}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh rotation={[0.6, 0.4, 0]}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshBasicMaterial
            color={accent2}
            wireframe
            transparent
            opacity={0.7}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      <mesh ref={heart}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color={accent} />
      </mesh>

      <mesh scale={1.3}>
        <sphereGeometry args={[0.9, 48, 48]} />
        <shaderMaterial
          vertexShader={GLOW_VERTEX}
          fragmentShader={GLOW_FRAGMENT}
          uniforms={glowUniforms}
          transparent
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <group ref={rings}>
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.25, 0.012, 8, 160]} />
          <meshBasicMaterial color={accent} transparent opacity={0.8} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.55, 0.01, 8, 160]} />
          <meshBasicMaterial color={accent2} transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 1.8, -Math.PI / 5, 0]}>
          <torusGeometry args={[2.9, 0.008, 8, 160]} />
          <meshBasicMaterial color={accent} transparent opacity={0.45} />
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
