import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not configured');
    return res.status(500).json({ error: 'Service temporarily unavailable' });
  }

  // Log key prefix for debugging (safe - only shows first 10 chars)
  console.log('API key prefix:', apiKey.substring(0, 10) + '...');
  console.log('API key length:', apiKey.length);

  try {
    const { jobTitle, industry, employmentType, location, seniorityLevel, keyResponsibilities } = req.body;

    if (!jobTitle || !industry) {
      return res.status(400).json({ error: 'Job title and industry are required' });
    }

    const prompt = `You are an expert Canadian HR consultant. Generate a professional, ready-to-use job description for the following role. The job description must comply with Canadian employment standards and use inclusive, non-discriminatory language.

Role Details:
- Job Title: ${jobTitle}
- Industry: ${industry}
- Employment Type: ${employmentType || 'Full-time'}
- Location: ${location || 'Canada'}
- Seniority Level: ${seniorityLevel || 'Mid-level'}
${keyResponsibilities ? `- Key focus areas: ${keyResponsibilities}` : ''}

Generate the job description in this exact format with these sections:
1. Job Title (just the title, cleaned up professionally)
2. About the Role (2-3 sentences overview)
3. Key Responsibilities (6-8 bullet points)
4. Qualifications & Requirements (6-8 bullet points, split into Required and Preferred)
5. What We Offer (4-6 bullet points including Canadian-specific benefits like RRSP matching, health benefits, vacation)
6. Equal Opportunity Statement (1 brief paragraph, Canadian-appropriate)

Keep the tone professional but warm. Use "you" language where appropriate. Do not include salary ranges. Make it specific to the role and industry, not generic.`;

    const requestBody = {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    };

    console.log('Sending request to Anthropic API...');
    console.log('Model:', requestBody.model);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', JSON.stringify(Object.fromEntries(response.headers.entries())));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FULL API error response:', errorText);
      return res.status(500).json({ error: 'Failed to generate job description', debug: errorText });
    }

    const data = await response.json();
    const text = data.content
      ?.filter((block: any) => block.type === 'text')
      .map((block: any) => block.text)
      .join('\n');

    return res.status(200).json({ jobDescription: text });
  } catch (error: any) {
    console.error('JD generation error:', error.message, error.stack);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
