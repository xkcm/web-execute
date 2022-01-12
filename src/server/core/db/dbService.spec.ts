import memoryMongo from "../../../../tests/helpers/memoryMongo"
import dbService from "./dbService"
import { Command } from "./models/Command"

beforeAll(async() => {
  await memoryMongo.start(27023)
})
beforeEach(async() => {
  await memoryMongo.clear()
})
afterAll(async() => {
  await memoryMongo.close()
})

describe("Testing DbService module", () => {
  it("should correctly persist command output", async () => {
    const command = "test"
    const output = "test output"
    await dbService.persistCommandOutput(command, output)
    const fetched = await Command.findOne({})
    expect(fetched.command).toMatch(command)
    expect(fetched.output).toMatch(output)
  })
})