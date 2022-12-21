import connection from "./db"
import { getLatestCycle, updateCycle } from "./queries"
import sha256 from "crypto-js/sha256"
import { randomUUID } from "crypto"

export const getCurrentCycle = async () => {
  connection.query(getLatestCycle).then((result: { rows: any }) => {
    return result.rows[0]
  })
}



export const initNewCycle = async () => {
  const currentCycle = await getCurrentCycle()
  if (currentCycle) {
    connection.query(updateCycle, [currentCycle.cycleId, 2]).then((res) => {

    })
  }
  const hash = sha256(randomUUID()).toString()
  const query = await connection.query(

}