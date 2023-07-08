import type { NextApiRequest, NextApiResponse } from 'next'
import { isNotGet, isNotPut } from "../../../../lib/util/util"
import { getSession } from "next-auth/react"

export default async function votesForCycleIdHandler(req: NextApiRequest, res: NextApiResponse) {
  if (isNotGet(req) && isNotPut(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }

  const session = await getSession({ req })

  if (session) {
    res.status(200).json({route: "Votes for CycleId", success: 'true' })
  } else {
    res.status(401).json({ error: "Unauthorized" })
  }
}