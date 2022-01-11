import shell from "../../src/server/core/shell"

describe("Testing shell module", () => {
  it("should return correct `echo` command output", async () => {
    const content = "this is a t3st m3ss4g3"
    const command = `echo "${content}"`
    const { output } = await shell.executeCommand(command)
    expect(output).toMatch(content)
  })
})