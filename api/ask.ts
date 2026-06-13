import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM_PROMPT = `You are the PreciseHR Assistant — a friendly, knowledgeable AI assistant on the website of PreciseHR, a Canadian HR consulting and technology firm based in Toronto, Ontario.

ABOUT PRECISEHR:
- Canadian HR experts: 90+ clients, 1,500+ employees supported, 98% client satisfaction, 15+ years of experience.
- Services: federal & provincial compliance, talent acquisition & hiring, performance management, HR consulting, workplace investigations, employee terminations, training & development, onboarding, culture & engagement surveys, policy & handbook development, payroll support, and fractional HR & executive leadership (Director/VP/CHRO and C-suite).
- PreciseHR also builds AI tools and systems for organizations (see the AI page at /ai and live demos at /ai/demos).
- Contact: phone (437) 887-2263, email info@precisehr.ca, and a free consultation can be booked at https://calendly.com/precisehr-info/precisehr-consult.

HOW TO RESPOND:
- Be warm, concise, and genuinely helpful. Keep replies short — usually 2-4 sentences. Use plain text; avoid headings and heavy formatting. A short list is fine when it truly helps.
- You can give helpful general guidance on Canadian HR topics (ESA standards, termination notice, ROE, T4, CPP/EI, leaves, vacation pay, workplace policies, etc.).
- This is general information and HR compliance support, NOT legal advice. For anything that depends on the specifics of a situation, gently recommend booking a consult with the PreciseHR team.
- When someone shows clear interest (pricing, getting started, a specific problem), naturally invite them to book a free consult or call (437) 887-2263. Pricing is customized — usually per employee per month — so point them to a consult for a quote rather than quoting figures.
- You are an AI assistant, not a human. Never claim to be a person or to be "the team." If asked, say you're PreciseHR's AI assistant.
- Stay on topic (HR, PreciseHR's services, Canadian employment matters). If asked something unrelated, briefly and politely steer back.
- Never invent specific client names, exact prices, or guarantees.`;

type Msg = { role: 'user' | 'assistant'; content: string };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not configured');
    return res.status(500).json({ error: 'Service temporarily unavailable' });
  }

  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    // Sanitize, keep only valid turns, cap history and length to bound cost.
    const clean: Msg[] = messages
      .filter((m: any) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
      .slice(-12)
      .map((m: any) => ({ role: m.role, content: m.content.slice(0, 1500) }));

    if (clean.length === 0 || clean[clean.length - 1].role !== 'user') {
      return res.status(400).json({ error: 'Last message must be from the user' });
    }

    const requestBody = {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: clean,
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
      console.error('Ask API error:', errorText);
      return res.status(500).json({ error: 'The assistant is temporarily unavailable' });
    }

    const data = await response.json();
    const text = data.content
      ?.filter((block: any) => block.type === 'text')
      .map((block: any) => block.text)
      .join('\n');

    return res.status(200).json({ reply: text });
  } catch (error: any) {
    console.error('Ask error:', error.message);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
