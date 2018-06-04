const mongoose = require('mongoose');

// create schema - validation for a book document
const bookScheema = mongoose.Schema({
    name: {
        // validations for name
        // if this fails, the document will not be added

        type: String,

        // if this value is missing, validation fails
        required: true,

        // trim whitespace around the string
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    pages: Number,
    price: Number,

    // stores is an array
    stores: {
        // 1 book - * stores
        type: [],

        // if the array doesn't have values, it's default value will be null
        default: null
    }
});

// model
const Book = mongoose.model('Book', bookScheema);

// this file will be server in server.js
module.exports = {
    // property Book: Book model
    // Book: Book

    // ES6 equivalent code
    Book
}