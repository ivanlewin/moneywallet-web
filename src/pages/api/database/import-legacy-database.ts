import { NextApiRequest, NextApiResponse } from "next";
import { LegacyDatabaseSchema, } from "schemas";
import { importLegacyDatabase } from "utils/import";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed, use POST' });
  }
  try {
    const parsed = LegacyDatabaseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'invalid data' });
    }
    const user = await importLegacyDatabase(parsed.data);
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to load data' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};