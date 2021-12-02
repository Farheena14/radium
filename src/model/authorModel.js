const mongoose = require('mongoose');

var validateEmail = function (email) {
   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   return re.test(email)
};
const authorSchema = new mongoose.Schema({
   fname: { type: String, required: true },lname: { type: String, required: true },
   title: { type: String, required: true, enum: ["Mr", "Mrs", "Miss"] },
   email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
   },
   password: { type: String, require: true }

}, { timestamps: true })

module.exports = mongoose.model('myAuthor', authorSchema)

  //{ title: {mandatory}, body: {mandatory}, authorId: {mandatory, refs to author model}, tags: {array of string}, category: {string, mandatory, examples: [technology, entertainment, life style, food, fashion]}, subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] }, createdAt, updatedAt, deletedAt: {when the document is deleted}, isDeleted: {boolean, default: false}, publishedAt: {when the blog is published}, isPublished: {boolean, default: false}}
