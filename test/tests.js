var request = require("supertest");
var should = require("should");
var app = require('../index').app;

describe("Route Authentication tests", function() {
  it("should return 401 Unauthrorized", function(done) {
    request(app).get("/")
      .end(function(err, res) {
        res.status.should.equal(401);
        done();
    });
  });
})
