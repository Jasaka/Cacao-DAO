import type { NextApiRequest, NextApiResponse } from "next"
import connection from "../../../../lib/db/db"
import { getCurrentUserVotes, insertVote, replaceVote } from "../../../../lib/db/queries"
import { getSession } from "next-auth/react"
import { isGet, isNotGet, isNotPut, isPut } from "../../../../lib/util/util"
import { getCurrentCycle } from "../../../../lib/cycleFunctions"

export default async function userVotesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query
  const session = await getSession({ req })

  if (isNotGet(req) && isNotPut(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }

  if (session) {
    if (isGet(req)) {
      connection
        .query(getCurrentUserVotes, [userId])
        .then((result: { rows: any }) => {
          res.status(200).json(result.rows)
          return
        })
        .catch((err: { message: any }) => {
          res.status(404).json({ error: err.message })
          return
        })
    }
    if (isPut(req)) {
      const { proposalId, vote } = req.body
      connection
        .query(getCurrentUserVotes, [userId])
        .then(async (result: { rows: any }) => {
          const votes = result.rows
          const existingVote = votes.map((vote) => {
            if (vote.proposalId === proposalId && vote.voterId === userId) return vote
            else return null
          })
          if (existingVote) {
            connection
              .query(replaceVote, [vote, existingVote.id])
              .then((result: { rows: any }) => {
                res.status(200).json(result.rows)
                return
              })
              .catch((err: { message: any }) => {
                res.status(404).json({ error: err.message })
                return
              })
          } else {
            const currentCycle = await getCurrentCycle()
            connection
              .query(insertVote, [proposalId, userId, vote, currentCycle.hash])
              .then((result: { rows: any }) => {
                res.status(200).json(result.rows)
                return
              })
              .catch((err: { message: any }) => {
                res.status(404).json({ error: err.message })
                return
              })
          }
        })
        .catch((err: { message: any }) => {
          res.status(404).json({ error: err.message })
          return
        })
    }
  } else {
    res.status(401).json({ error: "Unauthorized" })
  }
}
