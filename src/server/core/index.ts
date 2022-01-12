import server from './server'
import dotenv from 'dotenv'
import { resolve } from 'path'
import dbService from './db/dbService'

async function main() {
  console.log('Loading configuration')
  dotenv.config({ path: resolve(process.cwd(), ".env") }) // load configuration file
  console.log('Connecting to database')
  await dbService.connect(process.env.DB_HOST, +process.env.DB_PORT, process.env.DB_DATABASE) // connect to the database
  console.log('Starting server')
  server.start() // start http server
}

// if script is not imported from another module, start the app
if (require.main === module) {
  main().catch(error => {
    console.log(`Server error occurred`)
    console.log(error)
    return server.stop()
  })
}
