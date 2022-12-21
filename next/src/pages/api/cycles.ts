import type { NextApiRequest, NextApiResponse } from "next"
import { isNotGet, isNotPut, isPut } from "../../lib/util"
import { getSession } from "next-auth/react"
import { getCurrentCycle } from "../../lib/queryFunctions"
import sha256 from 'crypto-js/sha256';
import { randomUUID } from "crypto"

export default async function cycleHandler(req: NextApiRequest, res: NextApiResponse) {
  if (isNotGet(req) && isNotPut(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }

  const session = await getSession({ req })

  if (session) {
    if (isPut(req)) {
      if (session.user.isAdmin === true) {
        const currentCycle = await getCurrentCycle()
        switch (req.body.action) {
          case "new":


            break
          case "voting":

            break
          case "ended":

            break
          default:
            res.status(400).json({ endpoint: "Invalid action" })
        }
      } else {
        res.status(401).json({ endpoint: "Unauthorized" })
        return
      }
    }

    const { query } = req
    if (!query.filter) {
      res.status(200).json({ route: "cycles", success: "true" })
      return
    } else {
      if (query.filter === "current") {
        const cycle = await getCurrentCycle()
        res.status(200).json({ currentCycle: cycle })
        return
      } else {
        res.status(400).json({ error: "Invalid filter" })
        return
      }
    }
  } else {
    res.status(401).json({ error: "Unauthorized" })
  }
}