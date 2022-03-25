const express = require('express');
const supertest = require('supertest');

const app = require("./index.js");

describe("Test the root path", () => {
    test("should accept a request", done => {
      request(app)
        .get("/")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });

    test("should respond with Arkham Server Available", () => {
        request(app)
        .get("/")
        .then(response => {
          expect(response).toBe('Arkham Server Available');
          done();
        });
    });

  });