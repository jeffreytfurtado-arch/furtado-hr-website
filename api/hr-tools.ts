import type { VercelRequest, VercelResponse } from '@vercel/node';
import { setCorsHeaders, checkRateLimit } from './_shared';

function policyPrompt(p: any): string {
  const { policyType, province, companyName, industry, companySize } = p;
  return `You are an expert Canadian HR consultant. Write a professional, ready-to-use ${policyType} policy for ${companyName ? `"${companyName}"` : 'a company'}${industry ? ` in the ${industry} industry` : ''}${companySize ? ` with ${companySize} employees` : ''}, operating in ${province || 'Canada'}.

Requirements:
- Align with ${province || 'Canadian'} employment standards and, where relevant, PIPEDA, occupational health & safety, and human rights legislation.
- Use clear section headings: Policy Title; Purpose; Scope; Policy (detailed, concrete points); Roles & Responsibilities; Effective Date (use a [Date] placeholder).
- Use placeholders like [Company Name], [Manager], [Date] where specific details aren't provided.
- Professional, plain language, ready for the company to adapt. Keep it focused — not padded.`;
}

function offerPrompt(p: any): string {
  const { candidateName, jobTitle, employmentType, province, startDate, compensation, companyName, managerName } = p;
  return `You are an expert Canadian HR consultant. Write a professional employment offer letter for a Canadian employer.

Details provided (use placeholders in [brackets] for anything missing):
- Candidate: ${candidateName || '[Candidate Name]'}
- Position: ${jobTitle || '[Job Title]'}
- Employment type: ${employmentType || 'Full-time'}
- Province/Territory: ${province || '[Province]'}
- Start date: ${startDate || '[Start Date]'}
- Compensation: ${compensation || '[Compensation]'}
- Company: ${companyName || '[Company Name]'}
- Reports to: ${managerName || '[Manager]'}

Include: a warm opening; position, start date, and reporting line; compensation; employment type and hours; probationary period; vacation and statutory holiday entitlement consistent with ${province || 'the applicable province'}'s employment standards; benefits ([benefits] placeholder); standard conditions (e.g., proof of eligibility to work in Canada, references/background as applicable); confidentiality; and a clear acceptance/signature block.
Important: use Canadian framing only — do NOT use US concepts like "at-will employment." Keep it clean and professional. End with a short italicized note that this is a template and should be reviewed before use.`;
}

function scanPrompt(p: any): string {
  const { policyText, province } = p;
  return `You are a Canadian HR compliance expert. Review the following workplace policy for a ${province || 'Canadian'} employer and flag potential issues.

For each issue, provide: the concern; why it matters (reference the relevant Canadian standard in general terms — e.g., ESA, human rights, OHS, PIPEDA); and a concrete suggested fix. Group findings under headings by severity: High Priority, Medium Priority, Low Priority. If the policy is missing legally important elements, call those out. Be specific and practical, not generic.

End with one short line noting this is general guidance, not legal advice.

POLICY TO REVIEW:
"""
${(policyText || '').slice(0, 6000)}
"""`;
}

const BUILDERS: Record<string, { prompt: (p: any) => string; maxTokens: number; required: string[] }> = {
  policy: { prompt: policyPrompt, maxTokens: 1300, required: ['policyType'] },
  offer: { prompt: offerPrompt, maxTokens: 1200, required: ['jobTitle'] },
  scan: { prompt: scanPrompt, maxTokens: 1500, required: ['policyText'] },
};

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
    const { tool, ...params } = req.body || {};
    const builder = typeof tool === 'string' ? BUILDERS[tool] : undefined;
    if (!builder) return res.status(400).json({ error: 'Invalid tool' });
    for (const field of builder.required) {
      if (!params[field] || typeof params[field] !== 'string' || !params[field].trim()) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }

    const requestBody = {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: builder.maxTokens,
      messages: [{ role: 'user', content: builder.prompt(params) }],
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
      console.error('HR tools API error:', errorText);
      return res.status(500).json({ error: 'This tool is temporarily unavailable' });
    }

    const data = await response.json();
    const text = data.content
      ?.filter((block: any) => block.type === 'text')
      .map((block: any) => block.text)
      .join('\n');

    return res.status(200).json({ result: text });
  } catch (error: any) {
    console.error('HR tools error:', error.message);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
