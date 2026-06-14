// Shared HubSpot helper. Underscore-prefixed so Vercel does not treat it as a route.
// No-op until HUBSPOT_TOKEN is set in the environment, so it never breaks a request.

type ContactProps = Record<string, string | undefined>;

export async function upsertHubSpotContact(input: ContactProps): Promise<void> {
  const token = process.env.HUBSPOT_TOKEN;
  const email = input.email;
  if (!token || !email) return;

  // Only send properties that actually have a value.
  const properties: Record<string, string> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value != null && String(value).trim() !== '') {
      properties[key] = String(value);
    }
  }

  const base = 'https://api.hubapi.com/crm/v3/objects/contacts';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await fetch(base, {
      method: 'POST',
      headers,
      body: JSON.stringify({ properties }),
    });
    // 409 = contact already exists; update it by email instead.
    if (res.status === 409) {
      await fetch(`${base}/${encodeURIComponent(email)}?idProperty=email`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ properties }),
      });
    }
  } catch (e) {
    console.error('HubSpot upsert failed:', e);
  }
}
