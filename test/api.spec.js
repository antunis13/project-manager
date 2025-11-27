const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app.js");
const ProjectModel = require("../src/models/projects.js");
const { setupDb, clearDb, tearDownDb } = require("./db-utils.js");
const {
  createTestUser,
  createUserSession,
  createSessionToken,
  deleteUser,
} = require("./clerkTest-utils.js");

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
let name;
let sessionToken;
let userId;

beforeAll(async () => {
  await setupDb();
  const user = await createTestUser();
  const session = await createUserSession(user.id);
  const token = await createSessionToken(session.id);

  sessionToken = token.jwt;
  userId = user.id;
});

beforeEach(async () => {
  await clearDb();

  const inserted = await ProjectModel.insertMany(
    seedProjects.map((p) => ({
      ...p,
      ownerId: userId,
    }))
  );

  id = inserted[0]._id.toString();
  name = inserted[0].name;
});

afterAll(async () => {
  await tearDownDb();
  await deleteUser(userId);
});

describe("POST api/projects", () => {
  it("POST/ should return the status 201 and the document created", async () => {
    const newProject = {
      name: "Post test",
      description: "new description",
      url: "http://localhost:3000",
      image: "http://randomImage.com/imgs.jpg",
    };

    const res = await request(app)
      .post("/api/projects")
      .send(newProject)
      .set("Authorization", `Bearer ${sessionToken}`);
    expect(res.body).toHaveProperty("id");
    const responseId = JSON.parse(res.text);

    expect(responseId).toHaveProperty("id");

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Success. Document created");
  });

  it("POST/ should return 400 when trying to create an empty document", async () => {
    const res = await request(app)
      .post("/api/projects")
      .send({})
      .set("Authorization", `Bearer ${sessionToken}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Validation failed");
  });
});

describe("POST api/projects when DB is disconnected", () => {
  it("POST/ should return 503 when trying to create with DB down", async () => {
    await tearDownDb();
    const newProject = {
      name: "Post test",
      description: "new description",
      url: "http://localhost:3000",
      image: "http://randomImage.com/imgs.jpg",
    };

    const res = await request(app)
      .post("/api/projects")
      .send(newProject)
      .set("Authorization", `Bearer ${sessionToken}`);

    expect(res.status).toBe(503);
    expect(res.body).toHaveProperty(
      "message",
      "Error connecting to the database"
    );
    await setupDb();
  });
});

describe("GET api/projects:id?", () => {
  it("GET/ should return status 200 and all document data", async () => {
    const res = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${sessionToken}`);
    expect(res.status).toBe(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
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
  });

  it("GET/ should return status 200 and one document when try to find with the document name", async () => {
    const res = await request(app)
      .get(`/api/projects/?name=${name}`)
      .set("Authorization", `Bearer ${sessionToken}`);
    expect(res.status).toBe(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    expect(res.body[0]).toHaveProperty("_id");
    expect(res.body[0]._id).toBe(id);
    expect(res.body[0]).toHaveProperty("name");
    expect(typeof res.body[0].name).toBe("string");
    expect(res.body[0].name.length).toBeGreaterThan(0);

    expect(res.body[0]).toHaveProperty("description");
    expect(typeof res.body[0].description).toBe("string");
    expect(res.body[0].description.length).toBeGreaterThan(0);

    expect(res.body[0]).toHaveProperty("url");
    expect(typeof res.body[0].url).toBe("string");
    expect(res.body[0].url.length).toBeGreaterThan(0);

    expect(res.body[0]).toHaveProperty("image");
    expect(typeof res.body[0].image).toBe("string");
    expect(res.body[0].image.length).toBeGreaterThan(0);
  });

  it("GET/ should return nothing when the db is empty", async () => {
    await clearDb();
    const res = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${sessionToken}`);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toStrictEqual([]);
    expect(res.body.length).toBe(0);

    await setupDb();
  });

  it("GET/ should return a internal server error", async () => {
    const spyFind = jest
      .spyOn(ProjectModel, "find")
      .mockImplementationOnce(() => {
        throw new Error("Mock error");
      });

    const res = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${sessionToken}`);

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "Error fetching projects");

    spyFind.mockRestore();
  });
});

describe("GET api/projects:id? when DB is disconnected", () => {
  it("GET/ should return status 503 when trying to get documents with DB down", async () => {
    await tearDownDb();
    const res = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${sessionToken}`);
    expect(res.status).toBe(503);
    expect(res.body).toHaveProperty(
      "message",
      "Error connecting to the database"
    );
    await setupDb();
  });
});

describe("PUT api/projects/:id", () => {
  it("PUT/ should return the status 200 and message 'Success. Document updated'", async () => {
    const res = await request(app)
      .put(`/api/projects/${id}`)
      .send({
        name: "Put test",
        description: "Put description",
        url: "http://localhost:8080",
        image: "http://randomImage.com/imgs.jpg",
      })
      .set("Authorization", `Bearer ${sessionToken}`);

    console.log("ID PUT: ", id);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Success. Document updated");
  });
  it("PUT/ should return error when the id is wrong", async () => {
    const invalidId = new mongoose.Types.ObjectId().toString();
    const res = await request(app)
      .put(`/api/projects/${invalidId}`)
      .send({
        name: "Failed Put test",
      })
      .set("Authorization", `Bearer ${sessionToken}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Project not found");
  });

  it("PUT/ should return error when trying to use put without any updates", async () => {
    const res = await request(app)
      .put(`/api/projects/${id}`)
      .send({})
      .set("Authorization", `Bearer ${sessionToken}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Nothing to update");
  });
});

describe("PUT api/projects/:id when DB is disconnected", () => {
  it("PUT/ should return status 503 when trying to update documents with DB down", async () => {
    await tearDownDb();
    const res = await request(app)
      .put(`/api/projects/${id}`)
      .send({
        name: "Put test",
        description: "Put description",
        url: "http://localhost:8080",
        image: "http://randomImage.com/imgs.jpg",
      })
      .set("Authorization", `Bearer ${sessionToken}`);

    expect(res.status).toBe(503);
    expect(res.body).toHaveProperty(
      "message",
      "Error connecting to the database"
    );
    await setupDb();
  });
});

describe("DELETE api/projects/:id", () => {
  it("DELETE/ should return the status 204", async () => {
    const res = await request(app)
      .delete(`/api/projects/${id}`)
      .set("Authorization", `Bearer ${sessionToken}`);

    expect(res.status).toBe(204);
  });

  it("DELETE/ should return an error when the ID is wrong", async () => {
    const invalidId = new mongoose.Types.ObjectId().toString();
    const res = await request(app)
      .delete(`/api/projects/${invalidId}`)
      .set("Authorization", `Bearer ${sessionToken}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Project not found");
  });
});

describe("DELETE api/projects/:id when DB is disconnected", () => {
  it("DELETE/ should return status 503 when trying to delete documents with DB down", async () => {
    await tearDownDb();
    const res = await request(app)
      .delete(`/api/projects/${id}`)
      .set("Authorization", `Bearer ${sessionToken}`);

    expect(res.status).toBe(503);
    expect(res.body).toHaveProperty(
      "message",
      "Error connecting to the database"
    );

    await setupDb();
  });
});
