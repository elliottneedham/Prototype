import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch('https://fabric-api-elliott-win.azurewebsites.net/api/nor');

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('🔁 Proxy error:', err);
    res.status(500).json({ error: 'Proxy failed to fetch NoR data' });
  }
}