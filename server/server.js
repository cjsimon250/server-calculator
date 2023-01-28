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











//Telling express to listen on port 5,000
const PORT = 5000;
app.listen(PORT, () => {});