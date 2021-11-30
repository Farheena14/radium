const jwt = require('jsonwebtoken')

let tokenCheck = function(req, res, next) {
    let token = req.headers['x-auth-token']
    let validToken = jwt.verify(token, 'RadiumSecret')
    if (validToken) {
        req.body.validToken = validToken
        next()
    } else {
        res.send({ status: false, msg: "token is invalid" })
    }
}
module.exports.tokenCheck = tokenCheck