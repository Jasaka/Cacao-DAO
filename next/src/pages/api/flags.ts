import type { NextApiRequest, NextApiResponse } from "next"
import { isNotGet } from "../../lib/util"
import connection from "../../lib/db"
import { getProposalFlags } from "../../lib/queries"
import { getSession } from "next-auth/react"

export default async function flagHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (isNotGet(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
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