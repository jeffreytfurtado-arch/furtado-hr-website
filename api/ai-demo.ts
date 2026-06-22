import type { VercelRequest, VercelResponse } from '@vercel/node';
import { setCorsHeaders, checkRateLimit } from './_shared';

// A fictional demo company whose data normally lives in separate systems.
// The model is told it has "unified" access so answers feel like they pull
// from every source at once — the core PreciseHR AI-engine pitch, made tangible.
const SYSTEM_PROMPT = `You are the AI engine for a fictional demo company, "Northpoint Logistics" — a mid-sized Canadian third-party logistics provider with 312 employees. You have been given unified, real-time access to data that normally lives in separate, disconnected systems.

Answer the user's question as if you just queried all of these systems live. Rules:
- Be specific and decision-useful. Use the real numbers below.
- Cite the source system(s) inline in square brackets, e.g. [HRIS], [Payroll], [CRM], [Helpdesk], [Finance].
- Keep answers tight — a few short sentences or a compact list. No preamble.
- If asked to draft a document (offer letter, email, policy), produce it cleanly and professionally, using the data where relevant.
- This is a demo on a Canadian HR firm's website; keep everything Canadian-appropriate. Never claim to be a real person.

=== UNIFIED DATA SNAPSHOT (demo) ===
[HRIS]
- Headcount: 312 — Operations 140, Warehouse 70, Sales 48, Tech 27, Finance 18, HR 9
- 12-month voluntary attrition: 18% company-wide. By team: Warehouse 31%, Sales 22%, Operations 14%, Tech 9%
- Average tenure: 3.1 yrs overall; Warehouse just 1.4 yrs
- Open roles: 14 (Warehouse 6, Sales 4, Tech 3, Operations 1)
- eNPS: +12, down from +21 last year; lowest in Warehouse at -4

[Payroll]
- Comp bands (Ontario, annual): Warehouse Associate $42k–$52k; Operations Analyst $62k–$78k; Senior Analyst $85k–$105k; Sales Rep $55k base + commission; Manager $95k–$130k
- Overtime spend last quarter: $214k, 82% of it in Warehouse

[CRM]
- Open pipeline: $4.2M across 38 deals; weighted forecast $1.6M
- 12-month win rate: 24%; average sales cycle 41 days
- At-risk deals (no activity in 21+ days): 9 deals worth $980k
- Top rep at 142% of quota; bottom quartile under 40%

[Helpdesk / IT]
- Open tickets: 86 — Warehouse scanners 31, VPN/access 19, payroll questions 14, other 22
- Median resolution 2.3 days; SLA breach rate 17%

[Finance]
- Revenue run-rate: $48M; gross margin 31%
- Largest cost line after COGS is labour, and overtime is trending up
=== END DATA ===`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (checkRateLimit(req, res)) return;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not configured');
    return res.status(500).json({ error: 'Service temporarily unavailable' });
  }

  try {
    const { question } = req.body || {};
    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'A question is required' });
    }
    // Keep the demo cheap and on-rails.
    const q = question.trim().slice(0, 500);

    const requestBody = {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 700,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: q }],
    };

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI demo API error:', errorText);
      return res.status(500).json({ error: 'The demo is temporarily unavailable' });
    }

    const data = await response.json();
    const text = data.content
      ?.filter((block: any) => block.type === 'text')
      .map((block: any) => block.text)
      .join('\n');

    return res.status(200).json({ answer: text });
  } catch (error: any) {
    console.error('AI demo error:', error.message);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
