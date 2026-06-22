import type { VercelRequest, VercelResponse } from '@vercel/node';

const ALLOWED_ORIGINS = [
  'https://www.precisehr.ca',
  'https://precisehr.ca',
  'http://localhost:5173',
  'http://localhost:3000',
];

/**
 * Set CORS headers, allowing only known origins.
 * Returns true if the origin is allowed (or absent), false otherwise.
 */
export function setCorsHeaders(req: VercelRequest, res: VercelResponse): void {
  const origin = req.headers.origin;
  if (typeof origin === 'string' && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/* ------------------------------------------------------------------ */
/*  IP-based rate limiting (in-memory, per serverless instance)        */
/* ------------------------------------------------------------------ */

const RATE_LIMIT_MESSAGE =
  "You've reached the usage limit for this tool. For unlimited access and personalized HR advice, book a free consultation at (437) 887-2263 or visit https://calendly.com/precisehr-info/precisehr-consult";

const WINDOW_MS = 60_000; // 1-minute sliding window
const CLEANUP_INTERVAL_MS = 5 * 60_000; // purge stale entries every 5 min

interface HitRecord {
  timestamps: number[];
}

const ipHits = new Map<string, HitRecord>();
let lastCleanup = Date.now();

function cleanupStaleEntries(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  const cutoff = now - WINDOW_MS;
  for (const [ip, record] of ipHits) {
    record.timestamps = record.timestamps.filter((t) => t > cutoff);
    if (record.timestamps.length === 0) ipHits.delete(ip);
  }
}

/**
 * IP-based sliding-window rate limiter.
 *
 * Call early in every AI-powered handler (after CORS, before processing).
 * Returns `true` **and sends a 429 response** when the limit is exceeded,
 * so the caller should `return` immediately.  Returns `false` when the
 * request is within budget and processing should continue.
 *
 * @param req        Vercel request
 * @param res        Vercel response
 * @param maxPerMin  Max requests per 60 s window (default 10)
 */
export function checkRateLimit(
  req: VercelRequest,
  res: VercelResponse,
  maxPerMin = 10,
): boolean {
  cleanupStaleEntries();

  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : undefined) ||
    req.socket?.remoteAddress ||
    'unknown';

  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  let record = ipHits.get(ip);
  if (!record) {
    record = { timestamps: [] };
    ipHits.set(ip, record);
  }

  // Drop timestamps outside the current window
  record.timestamps = record.timestamps.filter((t) => t > cutoff);

  if (record.timestamps.length >= maxPerMin) {
    res.status(429).json({ error: RATE_LIMIT_MESSAGE });
    return true;
  }

  record.timestamps.push(now);
  return false;
}

/**
 * Escape HTML entities to prevent XSS when embedding user input in HTML emails.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
