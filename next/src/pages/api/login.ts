import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  endpoint: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res.status(405).json({ endpoint: "Method not allowed" })
  }

  res.status(200).json({ endpoint: "Login" })
}
