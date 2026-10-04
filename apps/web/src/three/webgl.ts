let cached: boolean | undefined;

/** True when the browser can create a WebGL context. Checked once, without importing three.js. */
export function detectWebGL(): boolean {
  if (cached !== undefined) return cached;
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    cached = context !== null;
  } catch {
    cached = false;
  }
  return cached;
}
