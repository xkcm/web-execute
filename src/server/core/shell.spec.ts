import environment from "../../../tests/helpers/environment"
import shell from "./shell"

beforeAll(() => {
  environment.load()
})

describe("Testing shell module", () => {
  it("should return correct `echo` command output", async () => {
    const content = "this is a t3st m3ss4g3"
    const command = `echo "${content}"`
    const output = await shell.executeCommand(command)
    expect(output).toMatch(content)
  })
  it("should timeout the `sleep` command", () => {
    const command = `sleep 5s`
    const timeout = 3000 // 3 seconds
    const callback = async() => await shell.executeCommand(command, timeout)
    expect(callback).rejects.toThrowError()
  })
  it("should not timeout the `sleep` command", () => {
    const command = `sleep 3s`
    const timeout = 5000
    const promise = shell.executeCommand(command, timeout)
    expect(promise).resolves.not.toThrowError()
  })
})