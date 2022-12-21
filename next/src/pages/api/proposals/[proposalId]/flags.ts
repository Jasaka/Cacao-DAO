import type {NextApiRequest, NextApiResponse} from "next"
import connection from "../../../../lib/db";
import {createProposalFlag, getProposalFlagsByProposalId} from "../../../../lib/queries";
import {generateUUID} from "../../../../lib/generators";
import { isGet, isNotGet, isNotPost, isPost } from "../../../../lib/util"
import { getSession } from "next-auth/react"

type Data = {
  endpoint: string
}

export default async function flagForProposalIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { proposalId } = req.query

  if (isNotGet(req) && isNotPost(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }

  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  if (!proposalId) {
    res.status(404).json({ endpoint: "Proposal not found" })
    return
  }

  if (isGet(req)) {
    connection
      .query(getProposalFlagsByProposalId, [proposalId])
      .then((result: { rows: any }) => {
        res.json(result.rows);
      })
      .catch((err: { message: any }) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  }

  if (isPost(req)) {
    const { proposalHash, flagMessage, flagAuthorId } = req.body;
    if (!proposalHash || !flagMessage || !flagAuthorId) {
      res.status(400).json({ error: "Missing required fields" });
    }
    connection
      .query(createProposalFlag, [generateUUID(), proposalId, proposalHash, flagMessage, flagAuthorId])
      .then((result: { rows: any }) => {
        res.json(result.rows);
      })
      .catch((err: { message: any }) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  }
}
