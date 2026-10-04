import type { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from '../motion/useMediaQuery';

interface SceneCanvasProps {
  active: boolean;
  children: ReactNode;
  cameraZ?: number;
}

/**
 * The shared canvas for every scene. It lives in the lazy 3D chunk (tenet 3), caps the pixel
 * ratio, and stops rendering while the scene is off screen. The canvas resizes with its container.
 * On phones it renders at a lower pixel ratio and without antialiasing so it stays smooth.
 */
export function SceneCanvas({ active, children, cameraZ = 6 }: SceneCanvasProps) {
  const phone = useMediaQuery('(max-width: 47.99rem)');
  return (
    <Canvas
      dpr={phone ? [1, 1.25] : [1, 2]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, cameraZ], fov: 45 }}
      gl={{ antialias: !phone, alpha: true, powerPreference: 'high-performance' }}
    >
      {children}
    </Canvas>
  );
}
