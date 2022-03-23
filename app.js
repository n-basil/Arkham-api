import express from 'express';
//import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import ArkhamControllers from './controllers/index.js';
// import ArkhamGraph from './source/index.js'
import cors from 'cors';
import morgan from 'morgan';
import { hash, compare } from 'bcrypt';

///////// ENVIRONMENT PREP //////////
// this creates the express object as an app. We can call it something else if we use it later.
// NOTE: enusre attache the body parser and cookieParser to the object.
const app = express();
// const morgan = require("morgan")

// const { hash, compare } = require("bcrypt")
const saltRounds = 12;
// const { createUser, getPasswordHasForUser } = require("./controllers")

// ArkhamControlelrs.createUser(var)

// Middleware
app.use(bodyParser.json());
//app.use(cookieParser());
app.use(cors());
app.use(morgan("tiny"))

// REGISTER A NEW USER
app.post("/register", (req, res) => {
    // hash password and store
    let { username, password } = req.headers;
    console.log("username ", username);
    console.log("password ", password)

    if (!username) res.status(401).send("username required for signup")
    else if (!password) res.status(401).send("password required for signup")
    else {
        hash(password, saltRounds).then((hashedPassword) => {
            // LOG STATEMENTS FOR TESTING
            console.log("USERS REAL PW: ", password)
            console.log("USERS HASHED PW: ", hashedPassword)

            ArkhamControllers.createUser(username, hashedPassword)
                .then((data) => res.status(201).json("USER CREATED SUCCESSFULLY"))
                .catch((err) => res.status(500).json("USER REGISTER ERROR: ", err))
        })
    }
})

// LOGIN AS A USER
app.post("/login", (req, res) => {
    let { username, password } = req.headers;

    if (!username) res.status(401).send("username required for login")
    else if (!password) res.status(401).send("password required for login")
    else {
        ArkhamControllers.getPasswordHashForUser(username)
            .then((hashedPassword) => {
                compare(password, hashedPassword)
                    .then((isMatch) => {
                        //SUCCESSFUL LOGIN
                        if (isMatch) res.status(202).json("passwords match, successful login")
                        else res.status(401).json("incorrect username or password supplied")
                    })
                    .catch((err) => res.status(500).json(err))
            })
            .catch((err) => res.status(500).json(err)) 
    }
})



///////// ACTUAL ROUTING //////////
/** 
 * GET
 * Simple root status bilboard.
 * @param {null} void - A get request to the root to check the server status.
*/
app.get('/', (req, res) => {
    res.send('Arkham Server Available');
});

/** 
 * GET
 * allNodes endpoint returns all nodes within the workspace as an array.
 * Nodes are objects.
 * @param {string} workspace_id - The workspace UUID of the nodes you want to recall.
*/
app.get('/allNodes', (req, res) => {
    try {
        ArkhamControllers.recallNodes()
        .then( (data)=>{
              res.status(200).json(data);
          })
        .catch((err) => {
            res.status(500).json({"ALL NODES RECALL ERROR": err})
        });
    }
    catch (err) {
      res.status(500).send('Server side error.');
      console.error(err);
    }
    finally {
      console.error("Unknown Error");
    }
});

/** 
 * GET
 * allLinks endpoint returns all nodes within the workspace as links.
 * @param {string} workspace_id - The workspace UUID of the nodes you want to recall.
*/
app.get('/allLinks', (req, res) => {

    try {
        ArkhamControllers.recallLinks()
            .then( (data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({"ALL LINKS RECALL ERROR": err})
            });
    }
    catch (err) {
      res.status(500).send('Server side error.');
      console.error(err);
    }
    finally {
      console.error("Unknown Error");
    }
});

/** 
 * POST
 * addNode adds a node to the database.
 * @param {string} id - UUID of the node you want to create.
 * @param {string} key - The key of the node. Can be any string.
 * @param {string} value - The payload of the node. Can be any string.
 * 
*/
app.post('/addNode', (req, res) => {
    // TODO: Refractor name to key
    // TODO: refractor in value to node
    // TODO: Add value to node DB
    try {
        let { id, name } = req.headers;
        console.log(`add node: ${name}`);
        ArkhamControllers.addNode(id, name)
            .then((data) => {
                    console.log('post data:', data)
                    res.status(200).json(data);
            })
            .catch((err) => {
                res.status(500).json({"ADD NODE ERROR": err})
            });
    }
    catch (err) {
      res.status(500).send('Server side error.');
      console.error(err);
    }
    finally {
      console.error("Unknown Error");
    }


});

/** 
 * POST
 * addLink creates an edge (link) between two vectors (nodes).
 * @param {string} source - UUID of start vector.
 * @param {string} target - UUID of end vector.
 * 
*/
app.post('/addLink', (req, res) => {
    try {
        let { source, target } = req.headers;

        ArkhamControllers.addLink(source, target)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(500).json({"ADD LINK ERROR": err})
            });
    }
    catch (err) {
      res.status(500).send('Server side error.');
      console.error(err);
    }
    finally {
      console.error("Unknown Error");
    }

} )

/** 
 * DELETE
 * delLink removes an edge (link) between two vectors (nodes).
 * NOTE: We cannot use edge IDs because of the d3 package.
 * @param {string} source - UUID of start vector.
 * @param {string} target - UUID of end vector.
 * 
*/
app.delete('/delLink', (req, res) => {

    try {
        let { source, target } = req.headers;

        ArkhamControllers.delLink(source, target)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(500).json({"DELETE LINK ERROR": err})
            });
    }
    catch (err) {
      res.status(500).send('Server side error.');
      console.error(err);
    }
    finally {
      console.error("Unknown Error");
    }
    
});

/** 
 * DELETE
 * delNode deletes a vector (node) and all associated links.
 * @param {string} id - UUID of vector (node).
 * 
*/
app.delete('/delNode', (req, res) => {
    try {
        let { id } = req.headers;

        ArkhamControllers.delLinksForNode(id)
            .then((data) => {
                ArkhamControllers.delNode(id)
                    .then((data) => {
                        res.status(200).json(data);
                    })
                    .catch((err) => res.status(500).json({"DELETE NODE ERROR": err}))
            })
            .catch((err) => {
                res.status(500).json({"DELETE LINKS FOR NODE ERROR": err})
            })
    }
    catch (err) {
      res.status(500).send('Server side error.');
      console.error(err);
    }
    finally {
      console.error("Unknown Error");
    }
});


export default app;