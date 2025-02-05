const request = require("supertest");
const app = require("../src/app.js");
const ProjectModel = require("../src/models/projects.js");
const { setupDb, clearDb, tearDownDb } = require("./db-utils.js");

const seedProjects = [
  {
    name: "Project 1",
    description: "Description 1",
    url: "http://example.com/1",
    image: "http://example.com/img1.jpg",
  },
  {
    name: "Project 2",
    description: "Description 2",
    url: "http://example.com/2",
    image: "http://example.com/img2.jpg",
  },
];

let id;

beforeAll(async () => {
  await setupDb();
  await ProjectModel.insertMany(seedProjects);
});

afterEach(async () => {
  await clearDb();
});

afterAll(async () => {
  await tearDownDb();
});

describe("POST api/projects", () => {
  it("POST/ should return the status 201 and the document created", async () => {
    const newProject = {
      name: "Post test",
      description: "new description",
      url: "http://localhost:3000",
      image: "http://randomImage.com/imgs.jpg",
    };
    try {
      const res = await request(app).post("/api/projects").send(newProject);
      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty("id");
      const responseId = JSON.parse(res.text);

      expect(responseId).toHaveProperty("id");

      id = responseId.id;

      expect(res.body).toHaveProperty("message", "Success. Document created");
    } catch (err) {
      return err;
    }
  });
});

describe("GET api/projects:id?", () => {
  it("GET/ should return status 200 and all document data", async () => {
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
});

describe("PUT api/projects/:id", () => {
  it("PUT/ should return the status 200 and message 'Success. Document updated'", async () => {
    try {
      const res = await request(app)
        .put(`/api/projects/${id}`)
        .send({ name: "Put test" });

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("message", "Success. Document updated");
    } catch (err) {
      return err;
    }
  });
});

describe("DELETE api/projects/:id", () => {
  it("DELETE/ should return the status 204", async () => {
    try {
      const res = await request(app).delete(`/api/projects/${id}`);

      expect(res.status).toEqual(204);
    } catch (err) {
      return err;
    }
  });
});
