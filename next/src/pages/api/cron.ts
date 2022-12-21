import type { NextApiRequest, NextApiResponse } from 'next'
import { isNotPost } from "../../lib/util"

export default function cronHandler(req:NextApiRequest, res:NextApiResponse) {

  const { CRON_KEY } = process.env;
  const { ACTION_KEY }: any = req.headers?.authorization?.split(" ")[1];

  if(isNotPost(req)) {
    res.status(405).send("Method not allowed");
    return;
  }

  try {
    if (ACTION_KEY === CRON_KEY) {
      console.log("Cron job started at", new Date());
      res.status(200).json({ success: 'true' })
    } else {
      res.status(401).json({ error: "Unauthorized" })
    }
  } catch(err) {
    res.status(500)
  }
}