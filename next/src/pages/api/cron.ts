import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req:NextApiRequest, res:NextApiResponse) {

  const { CRON_KEY } = process.env;
  const { ACTION_KEY }: any = req.headers?.authorization?.split(" ")[1];

  try {
    if (ACTION_KEY === CRON_KEY) {
      console.log("Cron job started at", new Date());
      res.status(200).json({ success: 'true' })
    } else {
      res.status(401)
    }
  } catch(err) {
    res.status(500)
  }
}