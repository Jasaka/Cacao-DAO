import type { NextApiRequest, NextApiResponse } from "next"
import { isNotGet } from "../../lib/util"
import connection from "../../lib/db"
import { getNavigation } from "../../lib/queries"

/**
 * @swagger
 * /api/navigation:
 *   get:
 *     description: Returns navigation items
 *     responses:
 *       200:
 *         description: hello world
 */
export default function navigationHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (isNotGet(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }

  connection.query(getNavigation, (err, results) => {
    if (err) {
      res.status(500).json({ endpoint: "Internal server error" })
    }

    res.status(200).json(results.rows)
  })
}