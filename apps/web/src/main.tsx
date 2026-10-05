import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/hanken-grotesk';
import { App } from './App';
import './styles.css';

// A visitor holding an old page after a redeploy asks for a lazy chunk whose hashed file is gone.
// Reload once to pick up the new build; if it fails again, the scene's fallback takes over.
window.addEventListener('vite:preloadError', () => {
  try {
    if (sessionStorage.getItem('awi-reloaded') === '1') return;
    sessionStorage.setItem('awi-reloaded', '1');
    window.location.reload();
  } catch {
    // Storage can be blocked; the fallback content is already shown.
  }
});

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
