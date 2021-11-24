const userModel = require("../models/userModel.js")
const productModel = require("../models/loginModel.js")
const jwt = require('jsonwebtoken')



const createUser = async function(req, res) {
    var data = req.body
    let savedData = await userModel.create(data)
    res.send({ data: savedData })
}

const login = async function(req, res) {
    let check = await userModel.findOne({ password: req.body.password, email: req.body.email, isDeleted: false })
    if (check) {
        let payload = { _id: check._id }
        let token = jwt.sign(payload, 'RadiumSecret')
        res.send({ "msg": "true", "data": check, "tokendetail": token })
    } else {
        res.send({ "msg": "false" })
    }
}
const dataById = async function(req, res) {
    let userId = req.params.userId
    let tokenUserid = req.body.validToken._id
    if (tokenUserid == userId) {
        let check = await userModel.findById(userId)
        if (check) {
            res.send({ "status": "true", data: { check } })
        } else {
            res.send({ "status": "true", "msg": "#error-response-structure" })
        }

    } else {
        res.send({ status: false, msg: "not authorized user" })
    }


}

const updateName = async function(req, res) {
    let userId = req.params.userId
    let tokenUserid = req.body.validToken._id
    if (tokenUserid == userId) {
        let check = await userModel.findById(userId)
        let newName = req.body.name
        if (check) {
            await userModel.findOneAndUpdate({ _id: userId, name: newName })
            res.send({ status: "updated", data: { check } })
        } else {
            res.send({ "msg": "#error-response-structure" })
        }

    } else {
        res.send({ status: false, msg: "user is not authorized" })
    }
}








module.exports.createUser = createUser
module.exports.login = login
module.exports.dataById = dataById
module.exports.updateName = updateName
