const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/db/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "ACAD2",
        email: "contato@acad.com.br",
        whatsapp: "48000000000",
        city: "Florianópolis",
        uf: "SC"
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
