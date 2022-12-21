import type { NextApiRequest, NextApiResponse } from 'next'
import { isNotGet, isNotPut } from "../../../../lib/util"
import { getSession } from "next-auth/react"
import votesForProposalIdHandler from "./votes"

export default async function versionForProposalIdHandler(req: NextApiRequest, res: NextApiResponse) {
  if (isNotGet(req) && isNotPut(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }

  const session = await getSession({ req })

  if (session) {
    res.status(200).json({route: "Versions for ProposalID", success: 'true' })
  } else {
    res.status(401).json({ error: "Unauthorized" })
  }
}