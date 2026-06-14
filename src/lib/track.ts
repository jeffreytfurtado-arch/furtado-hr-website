import { track as vercelTrack } from '@vercel/analytics';

type Props = Record<string, string | number | boolean | null>;

/**
 * Fire a conversion event to every analytics layer that's listening:
 * Vercel Web Analytics (custom events) + a GA4/GTM-ready window.dataLayer
 * + the site's existing signals layer. Safe no-op if a layer isn't present,
 * so events are captured the moment any analytics tool is connected.
 */
export function track(event: string, props: Props = {}) {
  try {
    vercelTrack(event, props);
  } catch {
    /* ignore */
  }
  try {
    const w = window as unknown as Record<string, unknown[]>;
    w.dataLayer = (w.dataLayer || []) as unknown[];
    (w.dataLayer as unknown[]).push({ event, ...props });
    w._signalsDataLayer = (w._signalsDataLayer || []) as unknown[];
    (w._signalsDataLayer as unknown[]).push({ event, ...props });
  } catch {
    /* ignore */
  }
}

let initialized = false;
/**
 * One global click listener captures demo (Calendly), phone, and app sign-in
 * clicks site-wide, so individual links don't each need instrumenting.
 */
export function initClickTracking() {
  if (initialized || typeof document === 'undefined') return;
  initialized = true;
  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const path = window.location.pathname;
      if (href.includes('calendly.com')) track('demo_click', { path });
      else if (href.startsWith('tel:')) track('call_click', { path });
      else if (href.includes('app.precisehr.ca')) track('app_signin_click', { path });
    },
    { capture: true }
  );
}
