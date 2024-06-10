import request from "supertest";
import * as chai from "chai";
import app from "../src/app.js";

const expect = chai.expect;

describe("Api Testing", () => {
  it('should return status 200 and message "Database connection established"', (done) => {
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
  it('should return status 200 and message "It works"', (done) => {
    request(app)
      .get("/api/projects")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.text).to.equal("It works");
        done();
      });
  });
});
