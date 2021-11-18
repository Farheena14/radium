const express = require('express');
const router = express.Router();

const AuthorsModel = require('../models/AuthorsModel')


const BooksModel = require('../models/BooksModel')
const BooksController = require('../controller/BooksController')

router.post('/createBooks', BooksController.createBooks);
router.post('/createAuthors', BooksController.createAuthors);
router.get('/findBook', BooksController.findBook)
router.get('/changePrice', BooksController.changePrice)

module.exports = router;