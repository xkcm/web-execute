import bodyParser from "body-parser"
import express from "express"
import { TypedRequest } from "../typings"
import dbService from "./db/dbService"
import shell from "./shell"

let app: ReturnType<typeof express>
let server: ReturnType<typeof app.listen>

function declareRoutes(){
  // declare /execute endpoint
  app.post("/execute", async (req: TypedRequest<{ command: string }>, res) => {
    const { command } = req.body // extract the command string
    
    try {
      const output = await shell.executeCommand(command) // execute the command
      res.json({ output }) // send the output back to the client
      
      await dbService.persistCommandOutput(command, output) // save the output to mongo database
      console.log('Command output persisted')
      return
    } catch (error) {
      if (!res.headersSent) res.status(400).json({ error: error.message })
      else console.log(error)
    }
  })
  
}

function declareMiddleware(){
  app.use(bodyParser.json()) // use body parser for parsing requests' json body
}

function start(PORT?: number) {
  app = express() // initiate express instance
  
  declareMiddleware()
  declareRoutes()

  PORT = PORT ?? +process.env.HTTP_PORT

  server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })
  
  return new Promise((res) => server.on("listening", res))

}

async function stop() {
  return new Promise(res => server.close(res))
}

export default {
  start,
  stop,
  expressInstance: () => app,
  httpServerInstance: () => server
}
