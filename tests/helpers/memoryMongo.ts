import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from "mongoose"
import environment from "./environment"

let mongod: MongoMemoryServer

export async function start(port?: number){
  const c = environment.load()
  mongod = new MongoMemoryServer({
    instance: {
      ip: process.env.DB_HOST,
      port: port ?? +process.env.DB_PORT,
    }
  })
  await mongod.start()
  const uri = mongod.getUri()
  await mongoose.connect(uri)
}

export async function close(){
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
  mongod = null
}

export async function clear(){
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}

export default {
  start, close, clear
}
