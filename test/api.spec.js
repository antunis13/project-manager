const request = require("supertest");
const app = require("../src/app.js");

describe("Api Testing", () => {
  it("should return status 200 and message 'Database connection established'", async () => {
    const res = await request(app).get("/api/checkDbConnection");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "Database connection established"
    );
  });

  /*it("GET/ should return status 200 and all document data", async () => {
    try {
      const res = await request(app).get("/api/projects");
      expect(res.status).toBe(200);
      expect(res.body).toBe("array").toBeGreaterThan(0);
      res.body.forEach((doc) => {
        expect(doc).toHaveProperty("name");
        expect(typeof doc.name).toBe("string");
        expect(doc.name.length).toBeGreaterThan(0);

        expect(doc).toHaveProperty("description");
        expect(typeof doc.description).toBe("string");
        expect(doc.description.length).toBeGreaterThan(0);

        expect(doc).toHaveProperty("url");
        expect(typeof doc.url).toBe("string");
        expect(doc.url.length).toBeGreaterThan(0);

        expect(doc).toHaveProperty("image");
        expect(typeof doc.image).toBe("string");
        expect(doc.image.length).toBeGreaterThan(0);
      });
    } catch (err) {
      return err;
    }
  });
  */

  /*it("POST/ should return the status 201 and the document created", async () => {
    try {
      const res = await request(app).post("/api/projects");
      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty("message", "Success. Document created");
    } catch (err) {
      return err;
    }
  }); */

  /*it("PUT/ should return the status 200 and message 'Success. Document updated'", async () => {
    try {
      const res = await request(app)
        .put("/api/projects/66b4053f212f281cb41889f6")
        .send({ name: "Put test" });

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("message", "Success. Document updated");
    } catch (err) {
      return err;
    }
  }); */

  it("DELETE/ should return the status 204", async () => {
    try {
      const res = await request(app).delete(
        "/api/projects/66b4053f212f281cb41889f6"
      );

      expect(res.status).toEqual(204);
    } catch (err) {
      return err;
    }
  });
});
