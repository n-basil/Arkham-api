import request  from "supertest";
import app from "../app.js";
import 'babel-polyfill';
import {storage, readCSV} from '../app.js'
import ArkhamControlelrs from "../controllers/index.js";



describe("Helper & Utility functions should", () =>{
    test("include multer disk storage.", done => {
        expect(storage).toBeTruthy();
        done();
    });
    test("include multer disk storage.", done => {
        expect(readCSV).toBeTruthy();
        done();
    });
});

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

    xtest("should return all nodes with a status of 500 when submitting a header", done => {
        request(app)
        .get("/allNodes")
        .set("node", JSON.stringify({"payload": "nothing useful"}))
        .then(response => {
          
            expect(response.statusCode).toBe(500);
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

    beforeAll(() => {
        ArkhamControlelrs.delNode('test123');
    });
    afterAll(() => {
        ArkhamControlelrs.delNode('test123');
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

    test("should return a status of 500 when user tries to send a malformed package.", done => {
        const newNode = {number: "test123", title: "test", data: "test"};

        request(app)
            .post("/node")
            .set("payload", JSON.stringify(newNode))
            .then(response => {
                expect(response.statusCode).toBe(500);
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
    test("should return a status of 500 when submitting a node instead of id.", done => {
        const newNode = {number: "test123", title: "test", data: "test"};

        request(app)
            .get("/node")
            .set("node", JSON.stringify(newNode))
            .then(response => {
                expect(response.statusCode).toBe(500);
                done();
            })
            .catch(err => done(err));
    });

    // PATCH /node
    test("should return a status of 201 when a node is successfully patched.", done => {
        request(app)
            .patch("/node")
            .set("id", "test123")
            .set("name", "newTEST")
            .then(response => {
                expect(response.statusCode).toBe(201);
                done();
            })
            .catch(err => done(err));
    });
    test("should return a status of 500 when submitting a mallformed payload.", done => {
        request(app)
            .delete("/node")
            .set("payload", "newTEST")
            .then(response => {
                expect(response.statusCode).toBe(500);
                done();
            })
            .catch(err => done(err));
    });
    test("should return a status of 500 when submitting a mallformed payload.", done => {
        request(app)
            .delete("/node")
            .then(response => {
                expect(response.statusCode).toBe(500);
                done();
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
   test("should return a status of 500 when submitting an object.", done => {
    request(app)
        .delete("/node")
        .set("payload", {id: "test123"})
        .then(response => {
            expect(response.statusCode).toBe(500);
            done();
        })
        .catch(err => done(err));
   });
});



describe("The clear workspace endpoints", () => {
    beforeAll(() => {
        ArkhamControlelrs.delNode('test123');
        ArkhamControlelrs.addNode({id: 'test123', name: "test", notes: "test"});
    });
    afterAll(() => {
        ArkhamControlelrs.delNode('test123');
    });

    // DELETE /node
    xtest("should return a status of 201 when all nodes is successfully removed.", done => {
        request(app)
            .delete("/all")
            .then(response => {
                expect(response.statusCode).toBe(201);
                done();
            })
            .catch(err => done(err));
    });
    test("should return a status of 500 when submitting anything.", done => {
        request(app)
            .delete("/all")
            .set("payload", "nothing useful")
            .then(response => {
                expect(response.statusCode).toBe(500);
                done();
            })
            .catch(err => done(err));
    });
});

describe("The post file endpoints", () => {
    beforeAll(() => {
        ArkhamControlelrs.delNode('test123');
        ArkhamControlelrs.addNode({id: 'test123', name: "test", notes: "test"});
    });
    afterAll(() => {
        ArkhamControlelrs.delNode('test123');
    });

    // POST /file
    xtest("should return a status of 201 when a file is successfully uploaded.", done => {
        request(app)
            .post("/file")
            .set("id", "test123")
            .set("file", "test")
            .then(response => {
                expect(response.statusCode).toBe(201);
                done();
            })
            .catch(err => done(err));
    });
    test("should return a status of 500 when submitting an empty payload.", done => {
        request(app)
            .post("/file")
            .then(response => {
                expect(response.statusCode).toBe(500);
                done();
            })
            .catch(err => done(err));
    });
});


describe("The all links endpoints", () => {
    beforeAll(() => {
        ArkhamControlelrs.delNode('test123');

    });
    afterAll(() => {
        ArkhamControlelrs.delNode('test123');
    });
    test("should return with a 201 when called.", done => {
        request(app)
            .get("/alllinks")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            })
            .catch(err => done(err));
    });
    test("should return with an object.", done => {
        request(app)
            .get("/links")
            .then(response => {
                console.log("endpoint body ", response.body);
                // expect response.body to be an object
                expect(response.body).toBeInstanceOf(Object);
                done();
            })
            .catch(err => done(err));
    });
});

