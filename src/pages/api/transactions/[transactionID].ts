import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const transactionID = req.query.transactionID as string;

  switch (req.method) {
    case 'GET':
      try {
        const transaction = await prisma.transaction.findFirst({ where: { id: transactionID, } });
        return res.status(200).json(transaction);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'failed to load data' });
      }

    case 'PUT':
      try {
        const validatedBody = validateTransaction(req.body);
        const updatedTransaction = await prisma.transaction.update({
          where: { id: transactionID },
          data: validatedBody, // TODO: validate req.body
        });
        return res.status(200).json(updatedTransaction);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'failed to update transition' });
      }

    default:
      return res.status(405).json({ error: 'method not allowed' });
  }
}