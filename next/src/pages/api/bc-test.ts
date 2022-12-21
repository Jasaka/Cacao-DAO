import type { NextApiRequest, NextApiResponse } from "next"
import { isNotGet } from "../../lib/util"
import quadraticVotingContract, {
  getCurrentCycleHash,
  getCycleStatus
} from "../../lib/ethereum"

export default async function blockChainHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (isNotGet(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }

  const currentCycleHash = await getCurrentCycleHash()
  console.log(currentCycleHash)
  getCycleStatus(currentCycleHash).then((result: any) => {
    res.status(200).json(result)
  }).catch((error: any) => {
    res.status(500).json({ error: error.message })
  })

}