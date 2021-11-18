const AuthorsModel = require('../models/AuthorsModel.js')
const BooksModel = require('../models/BooksModel.js')
    // 1st problem 
const createBooks = async function(req, res) {
        var data = req.body
        let savedData = await BooksModel.create(data)
        res.send({ msg: savedData })

    }
    // 2nd problem
const createAuthors = async function(req, res) {
        var data = req.body
        let savedData = await AuthorsModel.create(data)
        res.send({ msg: savedData })

    }
    // 3rd problem 
const findBook = async function(req, res) {
    let twoStates = await BooksModel.find({ name: req.body.name })
    let IdStates = twoStates[0].author_id
        // console.log(idStates)
    let IdList = await AuthorsModel.find({ author_id: IdStates }).select({ author_name: 1 })
    let st = twoStates[0].name
        //  let prizeUpdate = await BooksModel.updateMany({ name: st }, { price: 100 }).select({ prize: 1 })
    let updatedPrize = await BooksModel.findOneAndUpdate({ name: st }, { price: 100 }, { new: true }).select({ price: 1 })
    res.send({ msg: IdList, updatedPrize })
}

// 4th problem
const changePrice = async function(req, res) {
    let rate = await BooksModel.find({ price: { $gte: 50, $lte: 100 } }).select({ author_id: 1 })
    let authorId = rate.map(a => a.author_id)
    let authorNames = await AuthorsModel.find({ author_id: authorId }).select({ author_name: 1 })
    res.send({ msg: authorNames })

}



module.exports.createBooks = createBooks
module.exports.createAuthors = createAuthors
module.exports.findBook = findBook
module.exports.changePrice = changePrice