const express = require('express');
const bodyParser = require('body-parser');

// create an instance of the server
const app = express();

// MIDDLEWARE
// tell Express what to do when I get an request for html
// __dirname = server folder
app.use(
    // render a static file like HTML
    express.static(__dirname + '/../public')
);

app.use(bodyParser.json());


// DB
const mongoose = require('mongoose');

// use native Promisses
mongoose.Promise = global.Promise;

// create and connect to the database on a remote server, or on a localhost
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/book_db');

// get the book model from books.js and 
// use ES6 destructuring to assign to the var Books the value of the Book property(Book model)
const {Book} = require('./models/books');
const {Store} = require('./models/stores');


// ROUTES

// GET

// get all the stores in the db
app.get('/api/stores', (req, res) => {
    Store.find((err, doc) => {
        if (err) res.status(400).send(err);

        res.send(doc);
    })
});

// show all the book when navigating to index.html
app.get('/api/books', (req, res) => {

    // get the limit parameter, or use the value 20 to limit the number of books shown
    let limit = req.query.limit ? parseInt(req.query.limit) : 20;

    // list books oldest to newest(asc) or newest to oldest(desc)
    let order = req.query.ord ? req.query.ord : 'asc';

    // get the books in chronological order: first entered...last entereds
    Book.find().sort({

        // by what document property: value of order var
        _id: order

    }).limit(limit).exec((err, doc) => {
        if (err) res.status(400).send(err);

        res.send(doc);
    })
})

app.get('/api/books/:id', (req, res) => {

    Book.findById(req.params.id, (err, doc) => {
        if (err) res.status(400).send(err);

        res.send(doc);
    })
})

// POST
app.post('/api/add/store', (req, res) => {

    // use the store model and pass the data to Store model
    const store = new Store({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    })

    // store the data
    store.save((err, doc) => {

        // 400 Bad Request error = the request you sent to the website server was somehow incorrect or corrupted and the server couldn't understand it.
        if (err) res.status(400).send(err);

        res.status(200).send();
    })
});

app.post('/api/add/books', (req, res) => {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        pages: req.body.pages,
        price: req.body.price,
        stores: req.body.stores,
    });

    book.save((err, doc) => {
        if (err) res.status(400).send(err);

        res.status(200).send();
    })
});


// PATCH
app.patch('/api/add/books/:id', (req, res) => {

    Book.findByIdAndUpdate(req.params.id, {
        // set all the info equal to the one we have on the body
        $set: req.body 
    
    }
    , // get the new document
    {$new: true},
    (err, doc) => {
        if (err) res.status(400).send(err);

        res.send(doc);
    })
});

// DELETE
app.delete('/api/delete/books/:id', (req, res) => {
   
    Book.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) res.status(400).send(err);

        res.status(200).send();
    });

});


// app port from env for production, 3000 for dev
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started at port ${port}`);
})
