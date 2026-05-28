import type { VercelRequest, VercelResponse } from '@vercel/node';

const SOURCES = [
  { name: 'HRD Canada', url: 'https://www.hcamag.com/ca/rss', type: 'rss' },
  { name: 'Canadian HR Reporter', url: 'https://www.hrreporter.com/feed', type: 'rss' },
  { name: 'HRPA', url: 'https://www.hrpa.ca/hr-insights/blog', type: 'html' },
  { name: 'Canada.ca Labour', url: 'https://www.canada.ca/en/employment-social-development/news/notices.html', type: 'html' },
];

async function fetchSource(source: typeof SOURCES[0]): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(source.url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'PreciseHR-ComplianceBot/1.0' },
    });
    clearTimeout(timeout);
    if (!response.ok) return '';
    const text = await response.text();
    // Trim to first ~4000 chars to keep Claude prompt manageable
    return text.substring(0, 4000);
  } catch {
    console.log(`Failed to fetch ${source.name}: skipping`);
    return '';
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Service temporarily unavailable' });
  }

  try {
    // Fetch all sources in parallel
    const sourceResults = await Promise.all(
      SOURCES.map(async (source) => {
        const content = await fetchSource(source);
        return { name: source.name, content, url: source.url };
      })
    );

    const sourceSummary = sourceResults
      .filter(s => s.content.length > 100)
      .map(s => `--- SOURCE: ${s.name} (${s.url}) ---\n${s.content}`)
      .join('\n\n');

    const today = new Date().toISOString().split('T')[0];

    const prompt = `You are an expert Canadian HR compliance analyst. I'm going to provide you with raw content from Canadian HR news sources. Extract and summarize the most relevant, recent updates about Canadian employment law, workplace regulations, HR compliance, and policy changes.

Today's date: ${today}

If the source content is RSS/XML, extract article titles, dates, and descriptions.
If the source content is HTML, extract relevant news items and updates.
If sources fail or have no relevant content, use your knowledge of recent Canadian employment law developments to provide 6-8 current, accurate updates.

IMPORTANT: Focus on updates that Canadian employers NEED to know — law changes, new requirements, compliance deadlines, minimum wage changes, benefit changes, workplace safety updates, human rights developments, pay equity updates, etc.

Respond ONLY with valid JSON (no markdown, no backticks):

{
  "lastUpdated": "${today}",
  "updates": [
    {
      "id": "<unique short id like 'upd-001'>",
      "title": "<clear, concise title>",
      "summary": "<2-3 sentence plain-language summary of what changed and why it matters>",
      "category": "<one of: Employment Standards | Health & Safety | Human Rights | Pay Equity | Privacy | Termination | Benefits | Workplace Safety | Tax & Payroll | Immigration | Accessibility>",
      "provinces": ["<affected provinces, or 'Federal' or 'All Provinces'>"],
      "severity": "<critical|high|medium|low>",
      "actionRequired": "<1 sentence: what employers need to do>",
      "effectiveDate": "<date if known, or 'Effective immediately' or 'TBD'>",
      "source": "<source name>",
      "sourceUrl": "<source URL if available, otherwise empty string>"
    }
  ]
}

Generate 6-10 updates, sorted by severity (critical first). Make them specific, actionable, and accurate to current Canadian law. Include a mix of federal and provincial updates.

Source content:
${sourceSummary || 'No source content available — use your knowledge of current Canadian employment law developments from 2025-2026.'}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      return res.status(500).json({ error: 'Failed to fetch updates' });
    }

    const data = await response.json();
    const text = data.content
      ?.filter((block: any) => block.type === 'text')
      .map((block: any) => block.text)
      .join('');

    const cleaned = text.replace(/```json\s*|```\s*/g, '').trim();
    const parsed = JSON.parse(cleaned);

    // Cache for 4 hours
    res.setHeader('Cache-Control', 's-maxage=14400, stale-while-revalidate=3600');
    return res.status(200).json(parsed);
  } catch (error: any) {
    console.error('Compliance updates error:', error.message);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
