import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const categoryID = req.query.categoryID as string;
    const category = await prisma.category.findFirst({ where: { id: categoryID, } });
    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to load data' });
  }
}