import type { NextApiRequest, NextApiResponse } from "next"
import { errorLog, isNotGet, verboseLog } from "../../../lib/util/util"
import {
  executeCycleCreation, executeEndProposingPeriod, executeEndVotingPeriod, generateByte32Hash,
  getCurrentCycleHash,
  getCycleStatus
} from "../../../lib/web3/ethereum"
import { sync } from "postcss-load-config"
import { syncCurrentCycle } from "../../../lib/cycleFunctions"

export default async function blockChainHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (isNotGet(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }

  pureCycleStatusTest().then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json({ endpoint: "Internal server error. " + err.message })
  })
}

async function syncTest(){
  syncCurrentCycle().then((result) => {
    verboseLog("syncCurrentCycle", result)
    return result
  }).catch((err) => {
    errorLog("Error syncing current cycle", err)
    return err
  })
}

async function pureCycleStatusTest(){
  const currentCycleHash = await getCurrentCycleHash()
  verboseLog("current cycle hash", currentCycleHash)
  const currentCycleStatus = await getCycleStatus(currentCycleHash)
  verboseLog("current cycle status", currentCycleStatus)
  return {currentCycleHash, currentCycleStatus}
}

async function fullCycleTest(){
  try {
    const currentCycleHash = await getCurrentCycleHash()
    verboseLog("current cycle hash", currentCycleHash)
    const currentCycleStatus = await getCycleStatus(currentCycleHash)
    verboseLog("current cycle status", currentCycleStatus)
    if (currentCycleStatus === 0) {
      verboseLog("ending proposing period...")
      const endedProposing = await executeEndProposingPeriod()
      verboseLog("endedProposing", endedProposing)
      verboseLog("ending voting period...")
      const endedCycle = await executeEndVotingPeriod()
      verboseLog("endedCycle", endedCycle)
    } else if (currentCycleStatus === 1) {
      verboseLog("ending voting period...")
      const endedCycle = await executeEndVotingPeriod()
      verboseLog("endedCycle", endedCycle)
    }
    const hash = generateByte32Hash()
    verboseLog("generated hash", hash)
    verboseLog("currentHash", currentCycleHash)
    verboseLog("newHash", hash)
    const newCycle = await executeCycleCreation(hash)
    verboseLog("return of new cycle execution", newCycle)
    const previousCycleState = await getCycleStatus(currentCycleHash)

    verboseLog("previous cycle state", previousCycleState)
    const newCycleState = await getCycleStatus(hash)
    verboseLog("new cycle state", newCycleState)
  } catch (err: any) {
    return err
  } finally {
    return "success"
  }
}