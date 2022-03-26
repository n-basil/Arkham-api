import request  from "supertest";
import app from "../app.js";
import ArkhamControllers from "../controllers/index.js";

// describe("The test runner", () => {
  
//   test("should be working.", () => {
//     expect(true).toBeTruthy();
//   });

// });


// describe("The root directory", () => {
//     test("should accept a request", done => {
//       request(app)
//         .get("/")
//         .then(response => {
//           expect(response.statusCode).toBe(200);
//           done();
//         });
//     });


// });

describe("Bulk endpoints", () => {
// GET /allNodes
    test("should return all nodes with a status of 200", done => {
        request(app)
        .get("/allNodes")
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    test("should return an array of nodes", done => {
        request(app)
        .get("/allNodes")
        .then(response => {
            expect(Array.isArray(response.body)).toBe(true);
            done();
        });
    });

// GET /allLinks
    test("should return all links with a status of 200", done => {
        request(app)
        .get("/allLinks")
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test("should return an array of links", done => {    
        request(app)
        .get("/allLinks")
        .then(response => {
            expect(Array.isArray(response.body)).toBe(true);
            done();
        });
   });
});



describe("Single node endpoints", () => {

    beforeEach(() => {
        
    });

    // POST /node
    test("should return a status of 201 when successfully added.", done => {
        const newNode = {id: "test123", name: "test", notes: "test"};

        request(app)
            .post("/node")
            .set("node", JSON.stringify(newNode))
            .then(response => {
                expect(response.statusCode).toBe(201);
                done();
            })
            .catch(err => done(err));
    });

    // GET /node
    test("should return a status of 201 when successfully retrieved.", done => {   
        request(app)
            .get("/node")
            .set("id", "test123")
            .then(response => {
                expect(response.statusCode).toBe(201);
                done();
            })
            .catch(err => done(err));
    });

    // PATCH /node
    test("should return a status of 201 when a node is successfully patched.", done => {
        request(app)
            .delete("/node")
            .set("id", "test123")
            .set("name", "newTEST")
            .then(response => {
                expect(response.statusCode).toBe(201);
                done();
                // request(app)
                // .get("/node")
                // .set("id", "test123")
                // .then(response => {
                //     console.log('responce', response.body);
                //     done();
                // })
                // .catch(err => done(err));
            })
            .catch(err => done(err));
    });


   // DELETE /node
   test("should return a status of 201 when a node is successfully removed.", done => {
    request(app)
        .delete("/node")
        .set("id", "test123")
        .then(response => {
            expect(response.statusCode).toBe(201);
            done();
        })
        .catch(err => done(err));
   });

});

 // GET /link



// PATCH /link



// POST /link



// DELETE /link



