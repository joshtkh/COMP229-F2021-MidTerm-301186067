/* book.js
    Student Name: Joshua Harding
    Student Number: 301186067
    WebApp Name: COMP229-F2021-MIDTERM-301186067 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
// Display Add page
router.get('/add', (req, res, next) => {
    /*****************
     * ADD CODE HERE *
     *****************/
    // show the page used to add a book to the list
    res.render("books/details", { title: "Add Book", books: "" });
});

// POST process the Book Details page and create a new Book - CREATE
// Process Add page
router.post('/add', (req, res, next) => {
    /*****************
     * ADD CODE HERE *
     *****************/
    // Create a new book item with the model using the form request data
    let newItem = new book({
      "Title": req.body.title,
      "Description": "",
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });
    book.create(newItem, (err) => {
      if (err) {
        console.error(err);
        res.end(err);
      };
      // if there is an error, redirect to list page
      res.redirect("/books"); 
    });
});

// GET the Book Details page in order to edit an existing Book
// Displaying the edit page
router.get('/:id', (req, res, next) => {
    /*****************
     * ADD CODE HERE *
     *****************/
    // get our item id we wish to edit
    let id = req.params.id;
    // check the id exists before we render the page
    book.findById(id, (err, bookToEdit) => {
      if(err) {
        console.error(err);
        res.end(err);
      }
      // show the edit page
      res.render('books/details', { title: "Add a Book", books: bookToEdit });
    });
});

// POST - process the information passed from the details form and update the document
// Processing the edit page.
router.post('/:id', (req, res, next) => {
    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id; // get item id
    // create a new item from the req data
    let updatedItem = new book({
      "_id": id,
      "Title": req.body.title,
      "Description": "",
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });
    // update the book with the given ID if it exists
    book.updateOne({ _id: id }, updatedItem, {}, (err) => {
      if(err) {
        console.error(err);
        res.end(err);
      }
      // redirect after update
      res.redirect("/books");
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id; // get the id we wish to delete
    // remove the book from the collection
    books.remove({ _id: id }, (err) => {
      if(err) {
        console.error(err);
        res.end(err);
      }
      // redirect to book list after an entry is deleted.
      res.redirect("/books");
    });
});


module.exports = router;
