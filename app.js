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
    let { username, password } = req.body;

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
    let { username, password } = req.body

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

// $(pwd)


///////// ACTUAL ROUTING //////////
// 1) SIMPLE GET ROUTE
// NOTE: When building a server from scratch, start here to ensure your connections are good.
app.get('/', (req, res) => {
    // Must be included.
    // the .send is a method of Express to return information
    res.send('Arkham Online');
});


app.get('/allNodes', (req, res) => {
    ArkhamControllers.recallNodes().then(
      (data)=>{
          res.status(200).json(data);
      }
    )
});

app.get('/allLinks', (req, res) => {
    

    ArkhamControllers.recallLinks().then(
        (data) => {
            res.status(200).json(data)
        }
    )
})

app.post('/addNode', (req, res) => {
    let { id, name } = req.headers;

    console.log(`add node: ${name}`);
    ArkhamControllers.addNode(id, name)
        .then((data) => {
                console.log('post data:', data)
                res.status(200).json(data);
            }
        );
});

app.post('/addLink', (req, res) => {
    let { source, target } = req.headers;

    ArkhamControllers.addLink(source, target)
        .then((data) => {
            res.status(200).json(data);
        })
} )

app.delete('/delLink', (req, res) => {
    let { source, target } = req.headers;

    ArkhamControllers.delLink(source, target)
        .then((data) => {
            res.status(200).json(data);
        });
});

app.delete('/delNode', (req, res) => {
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

});


export default app;