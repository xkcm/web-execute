import { exec } from "child_process"

// function for executing commands in system shell
export function executeCommand(command: string, maxTimeout: number = +process.env.MAX_TIMEOUT) {
  return new Promise<{ output: string }>((resolve, reject) => {
    exec(
      command,
      { timeout: maxTimeout },
      (error, stdout, stderr) => {
        if (error) reject(error) // promise rejects if error occurred
        else if (stdout ?? stderr) resolve({ output: stdout ?? stderr }) // promise resolves if there is any output in standard and error stream  
      }
    )
  })
}

export default {
  executeCommand
}
