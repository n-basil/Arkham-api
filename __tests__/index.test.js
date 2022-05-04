import request  from "supertest";
import regeneratorRuntime from "regenerator-runtime";
// import  '@babel-core';
import 'babel-polyfill';

import app from "../app.js";


describe("The test runner", () => {
  
  test("should be working.", () => {
    expect(true).toBeTruthy();
  });

});


describe("The root directory", () => {
    test("should accept a request", done => {
      request(app)
        .get("/")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });

    xtest("should respond with Arkham Server Available", () => {
        request(app)
        .get("/")
        .then(response => {
          expect(response).toBe('Arkham Server Available');
          done();
        });
    });
});

