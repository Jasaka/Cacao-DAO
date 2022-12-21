import type { NextApiRequest, NextApiResponse } from "next"
import connection from "../../../lib/db"
import { getUserById } from "../../../lib/queries"
import { getSession } from "next-auth/react"
import { isNotGet } from "../../../lib/util"

export default async function userIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query
  const session = await getSession({ req })

  if (isNotGet(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }

  if (session) {
    connection
      .query(getUserById, [userId])
      .then((result: { rows: any }) => {
        res.status(200).json(result.rows)
      })
      .catch((err: { message: any }) => {
        res.status(404).json({ error: err.message })
      })
  } else {
    connection
      .query(getUserById, [userId])
      .then((result: { rows: any }) => {
        let cleanUser = result.rows.map((user: any) => {
          return {
            walletId: user.walletid,
            name: user.name,
            imageUrl: user.imageurl,
            about: user.about
          }
        })
        res.status(200).json(cleanUser)
      })
      .catch((err: { message: any }) => {
        res.status(404).json({ error: err.message })
      })
  }
}
