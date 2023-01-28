//Import the express package 
const express = require('express');

//Create an express app 
const app = express();

// Body parser, for parsing data
app.use(express.urlencoded({extended: true}));


// Telling express to share files in ./server/public
// with everyone
//app.use === "middleware"
app.use(express.static('./server/public'));

//Empty array to recieve new operations to calculate

let operations= [];

//Getting the operationToHappen object from client
app.post('/calculations', (req,res) => {
    let newOperation = req.body.operationToHappen;

    operations.push(newOperation);

})
















//Telling express to listen on port 5,000
const PORT = 5000;
app.listen(PORT, () => {});