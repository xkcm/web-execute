import { exec } from "child_process"

// function for executing commands in system shell
export function executeCommand(command: string, maxTimeout?: number) {
  if (command.includes("sudo")) return Promise.reject("Command not allowed")
  return new Promise<string>((res, rej) => {
    const chunks = [] // chunks array to store stdout and stderr chunks
    const execProcess = exec(command, { timeout: maxTimeout ?? +process.env.MAX_TIMEOUT }) // execute command with timeout
    execProcess.stdout.on("data", (chunk) => chunks.push(chunk))
    execProcess.stderr.on("data", (chunk) => chunks.push(chunk)) // push stdout and stderr chunks to the array
    execProcess.on("close", () => res(chunks.join(''))) // resolving promise
    execProcess.on("error", rej) // rejecting promise on error
  })
}

export default {
  executeCommand
}
