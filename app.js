import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import ArkhamControllers from './controllers/index.js';
import cors from 'cors';

///////// ENVIRONMENT PREP //////////
// this creates the express object as an app. We can call it something else if we use it later.
// NOTE: enusre attache the body parser and cookieParser to the object.
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



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
    let { name } = req.headers;

    ArkhamControllers.addNode(name).then(
        (data) => {
            console.log('post data:', data)
            res.status(200).json(data);
        }
    );
});


export default app;