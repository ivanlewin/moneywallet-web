import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const walletID = req.query.walletID as string;
    const wallet = await prisma.wallet.findFirst({ where: { id: walletID, } });
    return res.status(200).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to load data' });
  }
}