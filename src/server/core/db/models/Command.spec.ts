import memoryMongo from "../../../../../tests/helpers/memoryMongo"
import { Command } from "./Command"

beforeAll(async() => {
  await memoryMongo.start(27020)
})

beforeEach(async() => {
  await memoryMongo.clear()
})

afterAll(async() => {
  await memoryMongo.close()
})

describe("Testing Command model", () => {
  it("should create Command entity", () => {
    const command = "test"
    const output = "test output"
    const commandEntity = new Command({
      command, output
    })
    expect(commandEntity.command).toMatch(command)
    expect(commandEntity.output).toMatch(output)
  })
  it("should save the Command entity correctly", async () => {
    const commandEntity = new Command({
      command: "test",
      output: "test output"
    })
    const promise = commandEntity.save()
    expect(promise).resolves.not.toThrowError()
  })
  it("should save the Command entity and fetch it correctly", async() => {
    const commandEntity = new Command({
      command: "test",
      output: "test output"
    })
    await commandEntity.save()
    const fetchedCommandEntity = await Command.findById(commandEntity.id)
    expect(fetchedCommandEntity.command).toMatch(commandEntity.command)
    expect(fetchedCommandEntity.output).toMatch(commandEntity.output)
  })
  it("should fetch no Command entities", async() => {
    const fetchedCommandEntities = await Command.find({});
    expect(fetchedCommandEntities.length).toEqual(0)
  })
})