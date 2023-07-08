import type { NextApiRequest, NextApiResponse } from "next"
import connection from "../../lib/db/db"
import { createProposal, createVersionHistoryEntry, getProposals } from "../../lib/db/queries"
import { generateHash, generateUUID } from "../../lib/util/generators"
import saveProposalToArweave from "../../lib/web3/arweave"
import { getSession } from "next-auth/react"
import { isGet, isNotGet, isNotPost, isPost } from "../../lib/util/util"
import { getCurrentCycleHash } from "../../lib/web3/ethereum"
import { getCurrentCycle } from "../../lib/cycleFunctions"

export function generateProposalHash(uuid: string, title: string, description: string, predictedCost: number) {
  const proposal = {
    uuid: uuid,
    title: title,
    description: description,
    predictedCost: predictedCost
  }

  return generateHash(JSON.stringify(proposal))
}

export default async function proposalHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (isNotGet(req) && isNotPost(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }
  console.log("proposal handling")
  if (session) {
    if (isGet(req)) {
      connection
        .query(getProposals)
        .then((result: { rows: any }) => {
          res.status(200).json(result.rows)
        })
        .catch((error: { message: string }) => {
          res.status(500).json({ error: error.message })
        })
    }

    if (isPost(req)) {
      console.log("proposal POST")
      const currentCycle = await getCurrentCycle();
      const { title, description } = req.body
      if (!title || !description) {
        res.status(400).json({ endpoint: "Missing title or description" })
      }
      let predictedCost = req.body.predictedCost
      if (!predictedCost) {
        predictedCost = 0
      }
      const proposalId = generateUUID()
      const proposalHash = generateProposalHash(proposalId, title, description, predictedCost)
      if (process.env.ARW_USE === "1") {
        console.log("proposal to ARWEAVE")
        saveProposalToArweave({
          id: proposalId,
          title: title,
          description: description,
          predictedCost: predictedCost,
          currentHash: proposalHash,
          user: {
            id: session.user.id,
            walletAddress: session.user.walletId
          }
        }).then((arweaveResult) => {
          console.log("proposal to ARWEAVE DONE", arweaveResult)
          connection
            .query(createProposal, [proposalId, title, description, session.user.id, proposalHash, predictedCost, 1, currentCycle.hash])
            .then((result: { rows: any }) => {
              console.log("proposal to DB DONE", arweaveResult)
              connection.query(createVersionHistoryEntry, [proposalHash, arweaveResult!.transactionId, proposalId]).then(
                () => res.status(200).json(result.rows)
              ).catch((error: { message: string }) => {
                res.status(200).json({ proposal: result.rows, error: "Failed to create version history. " + error.message })
              })
            })
            .catch((error: { message: string }) => {
              res.status(500).json({ error: error.message })
            })
        }).catch(error => {
          res.status(500).json({ error: error.message })
        })
      } else {
        console.log("proposal NOT ON ARWEAVE")
        connection
          .query(createProposal, [proposalId, title, description, session.user.id, proposalHash, predictedCost, 1, currentCycle.hash])
          .then((result: { rows: any }) => {
            connection.query(createVersionHistoryEntry, [proposalHash, "NOT ON ARWEAVE", proposalId]).then(
              () => res.status(200).json(result.rows)
            ).catch((error: { message: string }) => {
              res.status(200).json({ proposal: result.rows, error: "Failed to create version history. " + error.message })
            })
          })
          .catch((error: { message: string }) => {
            res.status(500).json({ error: error.message })
          })
      }
    }
  } else {
    if (isGet(req)) {
      connection
        .query(getProposals)
        .then((result: { rows: any }) => {
          const cleanProposals = result.rows.map((proposal: any) => {
            return {
              id: proposal.id,
              title: proposal.title,
              description: proposal.description,
              predictedCost: proposal.predictedcost,
              currentHash: proposal.currenthash
            }
          })
          res.status(200).json(cleanProposals)
        })
        .catch((error: { message: string }) => {
          res.status(500).json({ error: error.message })
        })
    }
    res.status(401).json({ error: "Unauthorized" })
  }
}
