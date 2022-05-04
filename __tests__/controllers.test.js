import request  from "supertest";
import 'babel-polyfill';
import regeneratorRuntime from "regenerator-runtime";
import ArkhamControllers from "../controllers/index.js";






describe("The controlers test runner", () => {

    afterAll(() => {
        ArkhamControllers.delNode('test123A');
        ArkhamControllers.delNode('test123B')
    });

  test("should be working.", () => {
    expect(true).toBeTruthy();
  });
});


describe("Bulk Database Controllers", () => {
    test("should recall all nodes as an array.", done => {
        ArkhamControllers.recallNodes()
            .then(data => {
                expect(data).toBeTruthy();
                expect(data).toBeInstanceOf(Array);
                done();
            });
    });

    test("should recall all links as an array.", done => {
        ArkhamControllers.recallLinks()
            .then(data => {
                expect(data).toBeTruthy();
                expect(data).toBeInstanceOf(Array);
                done();
            });
    });
});



describe("Single Node Controllers", () => {
    beforeAll(() => {
        ArkhamControllers.delNode('test123A');
        ArkhamControllers.delNode('test123B')
    });
    afterAll(() => {
        ArkhamControllers.delNode('test123A');
        ArkhamControllers.delNode('test123B')
    });

    test("should add a node.", done => {
        const newNode = {id: "test123", name: "test", notes: "test"};

        ArkhamControllers.addNode(newNode)
            .then(data => {
                expect(data).toBeTruthy();
                expect(data).toBeInstanceOf(Object);
                done();
            });
    });

    test("should accurately recall a node by id.", done => {
        const id = "test123";

        ArkhamControllers.getNode(id)
            .then(data => {
                data = data[0];

                expect(data).toBeTruthy();
                expect(data).toBeInstanceOf(Object);
                expect(data.name).toBe("test");
              
                done();
            });
    });


    test("should accurately delete a node by id.", done => {
        const id = "test123";
        ArkhamControllers.delNode(id)
            .then(data => {
                expect(data).toBeTruthy();

                    ArkhamControllers.getNode(id)
                        .then(data => {
                            data = data[0];
                            expect(data).toBeFalsy();
                            done();
                        });
            });
    });
});



describe("Harmonious controllers", () => {
    beforeAll(() => {
        ArkhamControllers.delNode('test123A');
        ArkhamControllers.delNode('test123B')
    });
    afterAll(() => {
        ArkhamControllers.delNode('test123A');
        ArkhamControllers.delNode('test123B')
    });
    test("should add two nodes", done => {
        const nodeA = {id: "test123A", name: "testA", notes: "test"};
        const nodeB = {id: "test123B", name: "testB", notes: "test"};
        // Add node A
        ArkhamControllers.addNode(nodeA)
            .then(data => {
                // Validate step is passed
                expect(data).toBeTruthy();
                // Add node B
                ArkhamControllers.addNode(nodeB)
                .then(data => {
                    // Validate step is passed
                    expect(data).toBeTruthy();
                    // recall node A
                    ArkhamControllers.getNode(nodeA.id)
                        .then(data => {
                            // Validate step is passed accurately
                            data = data[0];
                            expect(data).toBeTruthy();
                            expect(data).toBeInstanceOf(Object);
                            expect(data.name).toBe("testA");
                        })
                        .then(data => {
                            // recall node B
                            ArkhamControllers.getNode(nodeB.id)
                                .then(data => {
                                    // Validate step is passed accurately
                                    data = data[0];
                                    expect(data).toBeTruthy();
                                    expect(data).toBeInstanceOf(Object);
                                    expect(data.name).toBe("testB");
                                    done();
                                });
                        })
                })
            });
    });





    test("should add one link between two nodes.", done => {
        const nodeA = {id: "test123A", name: "testA", notes: "test"};
        const nodeB = {id: "test123B", name: "testB", notes: "test"};
        const link = {source: nodeA.id, target: nodeB.id};

        // Add link
        ArkhamControllers.addLink(link.source, link.target)
            .then(data => {
                // Validate step is passed
                expect(data).toBeTruthy();
                // Recall link
                ArkhamControllers.getLink(link.source, link.target)
                    .then(data => {
                        // Validate step is passed accurately
                        data = data[0];
                        // console.log(data)
                        expect(data).toBeInstanceOf(Object);
                        expect(data.source).toBe(nodeA.id);
                        expect(data.target).toBe(nodeB.id);
                        done();
                    });
            })
            .catch(err => console.error(err));
    });

    test("should delete a link between two nodes.", done => {
        const nodeA = {id: "test123A", name: "testA", notes: "test"};
        const nodeB = {id: "test123B", name: "testB", notes: "test"};
        const link = {source: nodeA.id, target: nodeB.id};


            ArkhamControllers.delLink(link.source, link.target)
                .then(data => {
                    // Validate step is passed accurately
                    expect(data).toBeTruthy();
                    done();
                })
                .catch(err => console.error(err));
    });


    xtest("should add a link between two nodes then remove the link when one node is deleted.", done => {
        const nodeA = {id: "test123A", name: "testA", notes: "test"};
        const nodeB = {id: "test123B", name: "testB", notes: "test"};
        const link = {source: nodeA.id, target: nodeB.id};
        jest.setTimeout(10000);
        // Add link
        ArkhamControllers.addLink(link.source, link.target)
            .then(data => {
                // expect(data).toBeTruthy();
                console.log('add link')
                // Recall link
                ArkhamControllers.getLink(link.source, link.target)
                    .then(data => {
                        // Validate step is passed accurately
                        console.log('get link')
                        // expect(data).toBeTruthy();
                        // Delete node A
                        ArkhamControllers.delNode(nodeB.id)
                            .then(data => {
                                console.log('del node')
                                // Validate step is passed accurately
                                // expect(data).toBeTruthy();
                                // Recall link
                                ArkhamControllers.getLink(link.source, link.target)
                                    .then(data => {
                                        console.log('getlink link2')
                                        // Validate step is passed accurately
                                        data = data[0];
                                        expect(data).toBeFalsy();
                                        done();
                                    });
                            })
                            .catch(err => console.error(err));
                    });
            })
            .catch(err => console.error(err));
    });


    describe("A user needs to", () => {
        test("edit a node.", () => {
            // const node = {id: "test123", name: "test", notes: "test"};
            const newNode = {id: "test123A", name: "UPDATE", notes: "UPDATE"};

            ArkhamControllers.patchNode(newNode)
                .then(data => {
                    expect(data).toBeTruthy();
                    ArkhamControllers.getNode("test123A")
                        .then(data => {
                            data = data[0];
                            expect(data).toBeTruthy();
                            expect(data.name).toBe("UPDATE");
                        }
                    );
                });

        });
      });




});



