import type {NextApiRequest, NextApiResponse} from "next"
import connection from "../../../lib/db";
import {getUserById} from "../../../lib/queries";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {userId} = req.query

  if (req.method !== "GET") {
    res.status(405).json({endpoint: "Method not allowed"})
  }

  if (req.method === "GET") {
    connection
      .query(getUserById, [userId])
      .then((result: { rows: any }) => {
        res.status(200).json(result.rows)
      })
      .catch((err: { message: any }) => {
        res.status(404).json({error: err.message})
      })
  }
}
