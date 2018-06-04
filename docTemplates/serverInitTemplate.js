const express = require('express');
const bodyParser = require('body-parser');

// create an instance of the server
const app = express();

// middleware
// tell Express what to do when I get an request for html
// __dirname = server folder
app.use(
    // render a static file like HTML
    express.static(__dirname + '/../public')
);

// DB
const mongoose = require('mongoose');

// use native Promisses
mongoose.Promise = global.Promise;

// create and connect to the database
mongoose.connect('mongodb://localhost:27017/book_db');

// app port from env for production, 3000 for dev
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started at port ${port}`);
})