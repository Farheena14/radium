const express = require('express');

const router = express.Router();

const AuthorsModel = require('../models/AuthorsModel')


const BooksModel = require('../models/BooksModel')
const BooksController = require('../controller/BooksController')



router.post('/createAuthors', BooksController.createAuthors)
router.post('/createBook', BooksController.createBook);
router.get('/getBook', BooksController.getBook)
router.post('/publisher', BooksController.publisher)
router.get('/getBooks', BooksController.getBooks);




module.exports = router;