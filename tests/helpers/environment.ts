import { config } from "dotenv";
import { resolve } from "path"

function load(){
  return config({ path: resolve(__dirname, "../..", ".env.test") })
}

export default {
  load
}
