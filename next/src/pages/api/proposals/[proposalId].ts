import type {NextApiRequest, NextApiResponse} from "next"
import connection from "../../../lib/db";
import {getProposalById} from "../../../lib/queries";
import { isGet, isNotGet } from "../../../lib/util"

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
        res.status(200).json(result.rows)
      })
      .catch((err: { message: any }) => {
        res.status(404).json({error: err.message})
      })
  }

}
