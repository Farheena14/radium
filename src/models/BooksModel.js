const mongoose = require('mongoose')
const BooksSchema = new mongoose.Schema({
    name: String,
    author_id: {
        type: Number,
        required: true,

    },
    price: Number,
    ratings: Number

}, { timestamps: true })

module.exports = mongoose.model('Books_16-nov', BooksSchema)