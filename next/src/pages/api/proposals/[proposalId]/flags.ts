import type {NextApiRequest, NextApiResponse} from "next"
import connection from "../../../../lib/db";
import {createProposalFlag, getProposalFlagsByProposalId} from "../../../../lib/queries";
import {generateUUID} from "../../../../lib/generators";

type Data = {
  endpoint: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {proposalId} = req.query

  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({endpoint: "Method not allowed"})
  }
  if (!proposalId) {
    res.status(404).json({endpoint: "Proposal not found"})
  }

  if (req.method === "GET") {
    connection
      .query(getProposalFlagsByProposalId, [proposalId])
      .then((result: { rows: any }) => {
        res.json(result.rows);
      })
      .catch((err: { message: any }) => {
        console.error(err);
        res.status(500).json({error: err.message});
      });
  }

  if (req.method === "POST") {
    const {proposalHash, flagMessage, flagAuthorId} = req.body;
    if (!proposalHash || !flagMessage || !flagAuthorId) {
      res.status(400).json({error: "Missing required fields"});
    }
    connection
      .query(createProposalFlag, [generateUUID(), proposalId, proposalHash, flagMessage, flagAuthorId])
      .then((result: { rows: any }) => {
        res.json(result.rows);
      })
      .catch((err: { message: any }) => {
        console.error(err);
        res.status(500).json({error: err.message});
      });
  }
}
