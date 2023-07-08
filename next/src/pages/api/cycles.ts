import type { NextApiRequest, NextApiResponse } from "next"
import { isNotGet, isNotPost, isNotPut, isPost, isPut, verboseLog } from "../../lib/util/util"
import { getSession } from "next-auth/react"
import { endCurrentCycle, endProposingPeriod, getCurrentCycle, initNewCycle } from "../../lib/cycleFunctions"
import connection from "../../lib/db/db"
import { getLatestCycle } from "../../lib/db/queries"

export default async function cycleHandler(req: NextApiRequest, res: NextApiResponse) {
  if (isNotGet(req) && isNotPost(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }

  const session = await getSession({ req })

  verboseLog("Called cycleHandler")

  if (session) {
    if (isPost(req)) {
      if (session.user.isAdmin === true) {
        const currentCycle = await getCurrentCycle()
        switch (req.body.action) {
          case "new":
            verboseLog("new cycle")
            initNewCycle().then((result) => {
              res.status(200).json(result)
            }).catch((err) => {
              res.status(500).json({ endpoint: "Internal server error. " + err.message })
            })
            break
          case "voting":
            verboseLog("voting start")
            endProposingPeriod().then((result) => {
              res.status(200).json(result)
            }).catch((err) => {
              res.status(500).json({ endpoint: "Internal server error. " + err.message })
            })
            break
          case "ended":
            verboseLog("cycle ended")
            endCurrentCycle().then((result) => {
              res.status(200).json(result)
            }).catch((err) => {
              res.status(500).json({ endpoint: "Internal server error. " + err.message })
            })
            break
          default:
            res.status(400).json({ endpoint: "Invalid action" })
        }
      } else {
        res.status(401).json({ error: "Unauthorized" })
        return
      }
    }

    const { query } = req
    if (!query.filter) {
      res.status(200).json({ route: "cycles", success: "true" })
      return
    } else {
      if (query.filter === "current") {
        const { rows } = await connection.query(getLatestCycle) //await getCurrentCycle()
        res.status(200).json(rows[0])
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