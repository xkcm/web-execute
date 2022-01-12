import server from './server'
import dotenv from 'dotenv'
import { resolve } from 'path'
import dbService from './db/dbService'

function loadConfig(){
  const filename = (() => {
    if (process.env.NODE_ENV) return `.env.${process.env.NODE_ENV}`
    return '.env.production'
  })() // resolve environment filename
  const { parsed: config } = dotenv.config({ path: resolve(process.cwd(), filename) }) // load configuration file
  return config
}

async function main() {
  console.log('Loading configuration')
  const config = loadConfig()
  console.log('Configuration:')
  console.log(config)
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
