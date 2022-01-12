import { Command } from "./models/Command"
import mongoose from 'mongoose'
import { CommandInterface } from "../../typings"

function persistCommandOutput(command: CommandInterface["command"], output: CommandInterface["output"]){
  // creating Command entity
  const newCommandEntity = new Command({
    command, output
  })
  return newCommandEntity.save() // save the entity to the database
}

function connect(host: string, port: number, database: string){
  const uri = `mongodb://${host}:${port}/${database}` // construct mongodb uri
  return connectToUri(uri) // connect
}

function connectToUri(uri: string){
  return mongoose.connect(uri)
}

export default {
  persistCommandOutput,
  connect,
  connectToUri
}
