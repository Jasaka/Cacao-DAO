import type { NextApiRequest, NextApiResponse } from "next"
import { isNotGet } from "../../lib/util"
import connection from "../../lib/db"
import { getNavigation, getProposalFlags } from "../../lib/queries"
import { getSession } from "next-auth/react"

/**
 * @swagger
 * /api/navigation:
 *   get:
 *     description: Returns navigation items
 *     responses:
 *       200:
 *         description: hello world
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (isNotGet(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
  }

  const session = await getSession({ req })
  if (session && session.user.isAdmin) {
    connection.query(getProposalFlags, (err, results) => {
      if (err) {
        res.status(500).json({ endpoint: "Internal server error" })
      }
      res.status(200).json(results.rows)
    })
  } else {
    res.status(401).json({ endpoint: "Unauthorized" })
  }
}