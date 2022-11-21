import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ endpoint: "Method not allowed" })
  }

  if (req.method === "GET") {
    if (req.body.loggedIn === true) {
      return res.status(200).json([
        { name: "Townsquare", href: "/", current: false },
        { name: "Proposals", href: "/proposals", current: false },
        { name: "Voting", href: "/voting", current: false },
        { name: "Projects pending funding", href: "/pending", current: false },
        { name: "Funded Projects", href: "/projects", current: false }
      ])
    } else {
      return res.status(200).json([
        { name: "Townsquare", href: "/", current: false }
      ])
    }
  }
}