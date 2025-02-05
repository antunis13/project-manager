const request = require("supertest");
const app = require("../src/app.js");

describe("database connection", () => {
  it("should return status 200 and message 'Database connection established'", async () => {
    const res = await request(app).get("/api/checkDbConnection");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "Database connection established"
    );
  });
});
