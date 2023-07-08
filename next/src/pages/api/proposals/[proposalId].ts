import type {NextApiRequest, NextApiResponse} from "next"
import connection from "../../../lib/db/db";
import {getProposalById} from "../../../lib/db/queries";
import { isGet, isNotGet } from "../../../lib/util/util"

type Data = {
  endpoint: string
}

export default function proposalIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {proposalId} = req.query

  if (isNotGet(req)) {
    res.status(405).json({endpoint: "Method not allowed"})
    return
  }

  if (isGet(req)) {
    connection
      .query(getProposalById, [proposalId])
      .then((result: { rows: any }) => {
        console.log("result", result)
        res.status(200).json(result.rows[0])
      })
      .catch((err: { message: any }) => {
        res.status(404).json({error: err.message})
      })
  }

}
