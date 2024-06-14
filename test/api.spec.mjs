import request from "supertest";
import * as chai from "chai";
import app from "../src/app.js";

const expect = chai.expect;

describe("Api Testing", () => {
  it("should return status 200 and message 'Database connection established'", (done) => {
    request(app)
      .get("/api/checkDbConnection")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property("message")
          .equal("Database connection established");
        done();
      });
  });

  /* it("GET/ should return status 200 and all document data", (done) => {
    request(app)
      .get("/api/projects")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array").that.is.not.empty;
        res.body.forEach((doc) => {
          expect(doc).to.have.property("name").that.is.a("string").and.is.not
            .empty;
          expect(doc).to.have.property("description").that.is.a("string").and.is
            .not.empty;
          expect(doc).to.have.property("url").that.is.a("string").and.is.not
            .empty;
          expect(doc).to.have.property("image").that.is.a("string").and.is.not
            .empty;
        });
        done();
      });
  }); */

  /*it("POST/ should return the status 201 and the document created", (done) => {
    request(app)
      .post("/api/projects")
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("message").equal("Success");
        done();
      });
  }); */

  it("PUT/ should return the status 200 and message 'Success'", (done) => {
    request(app)
      .put("/api/projects/6667a195cfde99e96698205c")
      .send({ name: "Put test" })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message").equal("Success");
        done();
      });
  });
});
