import type { NextApiRequest, NextApiResponse } from 'next'
import { errorLog, isGet, isNotGet, isNotPut } from "../../../../lib/util/util"
import { getSession } from "next-auth/react"
import connection from "../../../../lib/db/db"
import { getProposalVotesByProposalId, getVersionHistoryByProposalId } from "../../../../lib/db/queries"

export default async function votesForProposalIdHandler(req: NextApiRequest, res: NextApiResponse) {
  if (isNotGet(req) && isNotPut(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }

  const session = await getSession({ req })
  const { proposalId } = req.query

  if (session) {
    if (isGet(req)) {
      connection
        .query(getProposalVotesByProposalId, [proposalId])
        .then((result: { rows: any }) => {
          let positiveVotes = 0;
          let negativeVotes = 0;

          result.rows.forEach((vote: any) => {
            if (vote.voteValue > 0) {
              positiveVotes += parseInt(vote.voteValue);
            } else {
              negativeVotes += parseInt(vote.voteValue) * -1;
            }
          })

          res.json({"upVotes": positiveVotes, "downVotes": negativeVotes});
          return
        })
        .catch((err: { message: any }) => {
          errorLog(err);
          res.status(500).json({ error: err.message });
        });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" })
  }
}