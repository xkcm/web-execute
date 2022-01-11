import { Command } from "./models/Command"

function persistCommandOutput(command: string, output: string){
  const newCommandEntity = new Command({
    command, output
  })

  return newCommandEntity.save()
}

export default {
  persistCommandOutput
}
