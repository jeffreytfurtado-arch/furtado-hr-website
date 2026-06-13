import type { VercelRequest, VercelResponse } from '@vercel/node';

const PROMPTS: Record<string, (topic: string) => string> = {
  jd: (t) => `You are an expert Canadian HR consultant. Write a concise, professional, ready-to-use job description for: "${t}". Comply with Canadian employment standards and use inclusive, non-discriminatory language. Include these sections with clear headings: Job Title; About the Role (2 sentences); Key Responsibilities (5-6 bullets); Requirements (4-5 bullets); What We Offer (3-4 bullets including Canadian benefits like RRSP matching, health benefits, paid vacation). Do not include salary ranges. Keep it tight and specific — this is a live website demo.`,
  policy: (t) => `You are an expert Canadian HR consultant. Draft a clear, professional workplace policy on: "${t}". It must suit a Canadian employer and align with employment standards and PIPEDA where relevant. Include these sections with headings: Policy title; Purpose (1-2 sentences); Scope; Policy (4-6 short, concrete points); Employee Responsibilities (2-3 points). Keep it concise and practical — this is a live website demo.`,
  review: (t) => `You are an expert Canadian HR consultant and people manager. Write a balanced, professional performance review based on these manager notes: "${t}". Include these sections with headings: Summary (2 sentences); Strengths (3 points); Areas for Development (2-3 constructive points); Goals for Next Quarter (2-3 SMART goals). Keep the tone fair, specific, and growth-oriented. Concise — this is a live website demo.`,
};

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
    const { docType, topic } = req.body || {};
    const builder = typeof docType === 'string' ? PROMPTS[docType] : undefined;
    if (!builder) return res.status(400).json({ error: 'Invalid document type' });
    if (!topic || typeof topic !== 'string' || !topic.trim()) {
      return res.status(400).json({ error: 'A topic is required' });
    }

    const prompt = builder(topic.trim().slice(0, 400));
    const requestBody = {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
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
      console.error('AI build API error:', errorText);
      return res.status(500).json({ error: 'The builder is temporarily unavailable' });
    }

    const data = await response.json();
    const text = data.content
      ?.filter((block: any) => block.type === 'text')
      .map((block: any) => block.text)
      .join('\n');

    return res.status(200).json({ document: text });
  } catch (error: any) {
    console.error('AI build error:', error.message);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
