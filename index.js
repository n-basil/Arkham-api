import app from './app.js';

const port = 6969;

// Instruct app to listen.
app.listen(port, () => {
    console.log(`API is listening to port ${port}`)
});