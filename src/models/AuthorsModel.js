const mongoose = require('mongoose')
const AuthorsSchema = new mongoose.Schema({
        author_name: String,

        age: Number,
        address: String
    },

    { timestamps: true })
module.exports = mongoose.model('myAuthor', AuthorsSchema)