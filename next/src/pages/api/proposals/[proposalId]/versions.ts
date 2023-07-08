import type { NextApiRequest, NextApiResponse } from 'next'
import { errorLog, isNotGet, isNotPut } from "../../../../lib/util/util"
import { getSession } from "next-auth/react"
import votesForProposalIdHandler from "./votes"
import connection from "../../../../lib/db/db"
import { getProposalFlagsByProposalId, getVersionHistoryByProposalId } from "../../../../lib/db/queries"

export default async function versionForProposalIdHandler(req: NextApiRequest, res: NextApiResponse) {
  if (isNotGet(req) && isNotPut(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }

  const session = await getSession({ req })
  const { proposalId } = req.query

  if (session) {
    connection
      .query(getVersionHistoryByProposalId, [proposalId])
      .then((result: { rows: any }) => {
        res.json(result.rows);
      })
      .catch((err: { message: any }) => {
        errorLog(err);
        res.status(500).json({ error: err.message });
      });
  } else {
    res.status(401).json({ error: "Unauthorized" })
  }
}