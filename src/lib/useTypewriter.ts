import { useEffect, useState } from 'react';

/**
 * Progressively reveals `raw` for a streaming effect.
 * When `enabled` is false (e.g. reduced motion), shows the full text immediately.
 */
export function useTypewriter(raw: string, enabled = true) {
  const [shown, setShown] = useState('');
  useEffect(() => {
    if (!raw) { setShown(''); return; }
    if (!enabled) { setShown(raw); return; }
    setShown('');
    let i = 0;
    const step = Math.max(2, Math.round(raw.length / 150));
    const id = setInterval(() => {
      i += step;
      setShown(raw.slice(0, i));
      if (i >= raw.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [raw, enabled]);
  return shown;
}
