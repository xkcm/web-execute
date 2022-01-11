import server from './server'
import dotenv from 'dotenv'
import { resolve } from 'path'
import db from './db'

async function main() {
  dotenv.config({ path: resolve(process.cwd(), ".env") }) // load configuration file
  await db.connect(process.env.DB_HOST, +process.env.DB_PORT, process.env.DB_DATABASE)
  server.start() // start http server
}

// if script is not imported from another module, start the app
if (require.main === module) {
  main().catch(error => {
    console.log(`Server error occurred`)
    console.log(error)
  })
}
