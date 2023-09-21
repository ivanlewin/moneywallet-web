import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const wallets = await prisma.wallet.findMany();
    return res.status(200).json(wallets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to load data' });
  }
}