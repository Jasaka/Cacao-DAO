import type { NextApiRequest, NextApiResponse } from "next"
import connection from "../../lib/db"
import { getUsers, updateUser } from "../../lib/queries"
import { isGet, isNotGet, isNotPut, isPut } from "../../lib/util"
import { getSession } from "next-auth/react"

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (isNotGet(req) && isNotPut(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }

  const session = await getSession({ req })

  if (session) {
    if (isGet(req)) {
      connection
        .query(getUsers)
        .then((result: { rows: any }) => {
          res.status(200).json(result.rows)
        })
        .catch((err: { message: any }) => {
          res.status(404).json({ error: err.message })
        })
    }

    if (isPut(req)) {
      connection.query(updateUser, [req.body.name, req.body.imageURL, req.body.about, req.body.email, req.body.walletId]).then((result: { rows: any }) => {
        res.status(200).json(result.rows[0])
      }).catch((err: { message: any }) => {
        res.status(404).json({ error: err.message })
      })
    }
  } else {
    if (isNotGet(req)) {
      res.status(401).json({ error: "Unauthorized" })
    }
    connection
      .query(getUsers)
      .then((result: { rows: any }) => {
        res.status(200).json(result.rows.map((user: any) => {
          return {
            walletId: user.walletid,
            name: user.name,
            imageUrl: user.imageurl,
            about: user.about
          }
        }))
      })
      .catch((err: { message: any }) => {
        res.status(404).json({ error: err.message })
      })

  }
}
