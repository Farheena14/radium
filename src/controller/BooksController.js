const AuthorsModel = require('../models/AuthorsModel.js')
const BooksModel = require('../models/BooksModel.js')
const publisherModel = require('../models/publisherModel.js')
    // Q1. Write a create author api that creates an author from the details in request body
const createAuthors = async function(req, res) {
    var data = req.body
    let savedData = await AuthorsModel.create(data)
    res.send({ data: savedData })

}


/* Q2.   Write a create book api that takes author from the request body. 
You have to first check if authorId is present as well a valid authorId. 
A valid authorId is which is present in your authors collection. 
Also make sure you receive a publisherId in the request and validate this id. 
A valid publisherId is which is present in your publishers collection.*/
const createBook = async function(req, res) {
        let bookData = req.body
        let authorId = req.body.author
        let publisherId = req.body.publisher
        let authorFromRequest = await AuthorsModel.findById(authorId)
        let publisherFromRequest = await publisherModel.findById(publisherId)
        if (authorFromRequest && publisherFromRequest) {
            let savedBook = await BooksModel.create(bookData)
            res.send({ msg: savedBook })
        } else {
            res.send('No such Id in publisher and author')
        }


    }
    // Q3. Write a get books api that fetches all the books along with their author details (you have to populate author)

const getBook = async function(req, res) {
    let allBooks = await BooksModel.find().populate('author')
    res.send({ msg: allBooks });
};
//Q4. . Write a post api that creates a publisher resource from the details in the request body
const publisher = async function(req, res) {
    let publisherData = req.body
    let publisher = await publisherModel.create(publisherData)
    res.send({ msg: publisher })
}

/* Q5. Update the 3rd api (GET /books) such that in the authors details you receive _id, author_name and age.*/
const getBooks = async function(req, res) {
    let allBooks = await BooksModel.find().populate('author', { "author_name": 1, "age": 1 }).populate('publisher')
    res.send({ msg: allBooks });
};


module.exports.createAuthors = createAuthors
module.exports.createBook = createBook
module.exports.getBook = getBook
module.exports.publisher = publisher
module.exports.getBooks = getBooks