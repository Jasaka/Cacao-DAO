import type {NextApiRequest, NextApiResponse} from "next"
import connection from "../../lib/db";
import {createProposal, getProposals} from "../../lib/queries";
import {generateHash, generateUUID} from "../../lib/generators";
import saveProposalToArweave from "../../lib/arweave";

function generateProposalHash(uuid: string, title: string, description: string, predictedCost: number) {
  const proposal = {
    uuid: uuid,
    title: title,
    description: description,
    predictedCost: predictedCost,
  };

  return generateHash(JSON.stringify(proposal));
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({endpoint: "Method not allowed"})
  }

  if (req.method === "GET") {
    connection
      .query(getProposals)
      .then((result: { rows: any }) => {
        res.status(200).json(result.rows);
      })
      .catch((error: { message: string }) => {
        res.status(500).json({error: error.message});
      })
  }

  if (req.method === "POST") {
    const {title, description} = req.body;
    if (!title || !description) {
      res.status(400).json({endpoint: "Missing title or description"});
    }
    let predictedCost = req.body.predictedCost;
    if (!predictedCost) {
      predictedCost = 0;
    }
    const proposalId = generateUUID();
    const proposalHash = generateProposalHash(proposalId, title, description, predictedCost);
    saveProposalToArweave({
      id: proposalId,
      title: title,
      description: description,
      predictedCost: predictedCost,
      currentHash: proposalHash,
    }).then(arweaveResult => {
      connection
        .query(createProposal, [proposalId, title, description, predictedCost, proposalHash, arweaveResult!.transactionId])
        .then((result: { rows: any }) => {
          res.status(200).json(result.rows);
        })
        .catch((error: { message: string }) => {
          res.status(500).json({error: error.message});
        })
    }).catch(error => {
      res.status(500).json({error: error.message});
    })
  }
}
