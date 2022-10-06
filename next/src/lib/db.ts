import { Pool } from "pg"

let poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}

let connection = new Pool(poolConfig)

export default connection
