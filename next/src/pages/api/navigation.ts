import type { NextApiRequest, NextApiResponse } from "next"
import { isNotGet } from "../../lib/util/util"
import connection from "../../lib/db/db"
import { getNavigation } from "../../lib/db/queries"

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
      return
    }

    res.status(200).json(results.rows)
  })
}