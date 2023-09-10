// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}
 
export default function handler(req: NextApiRequest,res: NextApiResponse<ResponseData>) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}