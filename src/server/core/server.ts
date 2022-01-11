import bodyParser from "body-parser"
import express from "express"
import { TypedRequest } from "../typings"
import dbService from "./db/dbService"
import shell from "./shell"

function start() {
  const app = express() // initiate express instance
  const PORT = process.env.HTTP_PORT // declare variable with http port
  
  app.use(bodyParser.json()) // use body parser for parsing requests' json body

  // declare /execute endpoint
  app.post("/execute", async (req: TypedRequest<{ command: string }>, res) => {
    const { command } = req.body // extract the command string
    
    try {

      const { output } = await shell.executeCommand(command) // execute the command
      res.json({ output }) // send the output back to the client

      dbService.persistCommandOutput(command, output) // save the output to mongo database

    } catch (error) {
      res.status(400).json({ error: error.message })
    }


  })
  
  // start listening
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })

}

export default {
  start
}
