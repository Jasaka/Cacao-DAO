import connection from "./db/db"
import { createCycle, getLatestCycle, updateCycle } from "./db/queries"
import {
  executeCycleCreation,
  executeEndProposingPeriod,
  executeEndVotingPeriod,
  generateByte32Hash, getCurrentCycleHash,
  getCycleStatus
} from "./web3/ethereum"
import { errorLog, verboseLog } from "./util/util"

export const getCurrentCycle = async (): Promise<any> => {
  const { rows } = await connection.query(getLatestCycle)
  return rows[0]
  // getCurrentCycleHash().then((hash) => {
  //   verboseLog("current cycle hash", hash)
  //   getCycleStatus(hash).then((status) => {
  //     verboseLog("current cycle status", status)
  //     return { hash, status }
  //   }).catch((err) => {
  //     errorLog("Error getting cycle status", err)
  //     return { error: "Error getting cycle status" }
  //   })
  // }).catch((err) => {
  //   errorLog("Error getting current cycle hash", err)
  //   return { error: "Error getting current cycle hash" }
  // })
}

export const syncCurrentCycle = async (): Promise<any> => {
  const currentCycleState = await getCurrentCycle().then((result) => {
    verboseLog("current cycle state as sync result: ->" + result + "<- here is the result")
  })
  verboseLog("current cycle state after function call", currentCycleState)
  const latestDbCycle = await connection.query(getLatestCycle)
  verboseLog("current cycle state", currentCycleState)
  verboseLog("latestCycle", latestDbCycle.rows[0])
  return { "onChain": currentCycleState, "inDb": latestDbCycle.rows[0] }
}

export const initNewCycle = async () => {
  verboseLog("Getting Current Cycle")
  const currentCycle = await getCurrentCycle()
  verboseLog("Current Cycle: ", currentCycle)
  const hash = generateByte32Hash()

  async function newCycle() {
    verboseLog("Inserting New Cycle")
    return await connection.query(createCycle, [hash]).then((res) => {
      verboseLog("New cycle created: " + res.rows[0])
      // executeCycleCreation(hash).then((res) => {
      //   verboseLog("Ethereum Cycle Creation Successful", res)
      // }).catch((err) => {
      //   errorLog("Ethereum Cycle Creation Failed", err)
      // })
      return res.rows[0]
    })
  }

  if (currentCycle) {
    // const currentCycleHash = await getCurrentCycleHash()
    // verboseLog("current cycle hash", currentCycleHash)
    // const currentCycleStatus = await getCycleStatus(currentCycleHash)
    // verboseLog("current cycle status", currentCycleStatus)
    try {
      if (currentCycle.status === 0) {
        await endProposingPeriod().then(() => verboseLog("Proposing Period Ended")).catch((err) => errorLog("Failed to end Proposing Period", err))
        await endCurrentCycle().then(() => verboseLog("Voting Period Ended")).catch((err) => errorLog("Failed to end Voting Period", err))
      } else if (currentCycle.status === 1) {
        await endCurrentCycle().then(() => verboseLog("Voting Period Ended")).catch((err) => errorLog("Failed to end Voting Period", err))
      }
    } catch (err) {
      errorLog("Error ending cycle", err)
      return err
    }
    return await newCycle().catch((err) => {
      errorLog(err)
    })
  }

  if (!currentCycle) {
    return await newCycle().catch((err) => {
      errorLog(err)
    })
  }

  throw new Error("Failed Cycle Initialisation")
}

export const endCurrentCycle = async () => {
  const currentCycle = await getCurrentCycle()
  if (currentCycle) {
    connection.query(updateCycle, [currentCycle.cycleId, 2]).then((res) => {
      verboseLog("Cycle ended: " + res.rows[0])
      // executeEndVotingPeriod().then(() => {
      //   verboseLog("Ethereum Voting Period Ended")
      //   return res.rows[0]
      // }).catch((err) => {
      //   errorLog("Ethereum Voting Period Failed", err)
      // })
      return res.rows[0]
    }).catch((err) => {
      errorLog(err)
    })
  }
}

export const endProposingPeriod = async () => {
  const currentCycle = await getCurrentCycle()
  if (currentCycle) {
    connection.query(updateCycle, [currentCycle.cycleId, 1]).then((res) => {
      verboseLog("Proposing period ended: " + res.rows[0])
      // executeEndProposingPeriod().then(() => {
      //   verboseLog("Ethereum Proposing Period Ended")
      //   return res.rows[0]
      // }).catch((err) => {
      //   errorLog("Ethereum Proposing Period Failed", err)
      // })
      return res.rows[0]
    }).catch((err) => {
      errorLog(err)
    })
  }
}

