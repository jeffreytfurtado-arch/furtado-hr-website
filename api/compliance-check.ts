import type { VercelRequest, VercelResponse } from '@vercel/node';
import { setCorsHeaders, checkRateLimit } from './_shared';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (checkRateLimit(req, res)) return;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not configured');
    return res.status(500).json({ error: 'Service temporarily unavailable' });
  }

  try {
    const { province, companySize, industry, currentPractices } = req.body;

    if (!province || !companySize || !industry) {
      return res.status(400).json({ error: 'Province, company size, and industry are required' });
    }

    const practicesList = currentPractices && currentPractices.length > 0
      ? `The company currently has the following in place: ${currentPractices.join(', ')}.`
      : 'The company has not indicated any current HR practices.';

    const prompt = `You are an expert Canadian HR compliance consultant. Based on the following company profile, generate a compliance assessment.

Company Profile:
- Province: ${province}
- Company Size: ${companySize}
- Industry: ${industry}
- ${practicesList}

Respond ONLY with valid JSON (no markdown, no backticks, no preamble). Use this exact structure:

{
  "overallScore": <number 0-100 representing their estimated compliance level based on what they have vs what's required>,
  "riskLevel": "<Critical|High|Medium|Low>",
  "summary": "<2 sentence summary of their compliance posture and biggest risk>",
  "requirements": [
    {
      "category": "<category name>",
      "requirement": "<specific requirement name>",
      "description": "<1 sentence explaining what this is>",
      "status": "<missing|at_risk|likely_compliant>",
      "priority": "<critical|high|medium|low>",
      "detail": "<1-2 sentences on what they need to do, specific to their province and size>"
    }
  ],
  "topRisks": [
    "<1 sentence describing a specific risk they face>"
  ],
  "nextSteps": [
    "<1 sentence actionable recommendation>"
  ]
}

Generate 10-14 requirements covering: employment standards, health & safety, human rights, privacy, pay equity, termination, workplace violence/harassment, accessibility, employment contracts, and any province-specific requirements for ${province}. Include 3-4 top risks and 3-4 next steps.

Mark items as "likely_compliant" only if the company indicated they have that practice. Mark as "at_risk" if partially covered. Mark as "missing" if not mentioned. Be specific to ${province} law — reference actual legislation names where relevant.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 3000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      return res.status(500).json({ error: 'Failed to generate compliance check' });
    }

    const data = await response.json();
    const text = data.content
      ?.filter((block: any) => block.type === 'text')
      .map((block: any) => block.text)
      .join('');

    // Parse JSON response
    try {
      const cleaned = text.replace(/```json\s*|```\s*/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return res.status(200).json({ result: parsed });
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Raw:', text);
      return res.status(500).json({ error: 'Failed to parse compliance results' });
    }
  } catch (error: any) {
    console.error('Compliance check error:', error.message);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
