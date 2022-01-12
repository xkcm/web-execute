import supertest from "supertest"
import memoryMongo from "../../../tests/helpers/memoryMongo"
import { Command } from "./db/models/Command"
import server from "./server"

beforeAll(async() => {
  await memoryMongo.start(27017)
  await server.start(4000)
})
beforeEach(async() => {
  await memoryMongo.clear()
})
afterAll(async() => {
  await memoryMongo.close()
  await server.stop()
})

describe("Testing HTTP Express Server", () => {
  it("should correctly perform request", async () => {
    const content = 'hello world'
    const response = await supertest(server.expressInstance())
      .post("/execute")
      .send({ command: `echo ${content}`})
    expect(response.body).toHaveProperty("output")
    expect(response.body.output).toMatch(content)
  })
  it("should perform request and correctly persist the output", async () => {
    const content = 'hello world'
    const command = `echo ${content}`
    const response = await supertest(server.expressInstance())
      .post('/execute')
      .send({ command })
    expect(response.body).toHaveProperty("output")
    expect(response.body.output).toMatch(content)

    const fetchedCommand = await Command.findOne({})
    expect(fetchedCommand.command).toMatch(command)
    expect(fetchedCommand.output).toMatch(content)
  })
})