import mongoose from "mongoose"

function connect(host: string, port: number, database: string){
  const uri = `mongodb://${host}:${port}/${database}`
  return mongoose.connect(uri)
}

export default {
  connect
}
