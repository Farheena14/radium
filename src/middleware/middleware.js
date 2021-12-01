const jwt = require('jsonwebtoken')


let middleware = function(req, res, next) {

    let hello = req.headers['x-api-key']
    if (!hello) {
        return res.send({ msg: "token was not found" })
    } else {
        let decodetoken = jwt.verify(hello, 'my secret key')



        if (decodetoken) {
            req.validToken = decodetoken
            next()
        } else {
            res.send({ msg: "token is not valid" })
        }
    }


}
module.exports.middleware = middleware;
/*Authentication
Add an authorisation implementation for the JWT token that validates the token before every protected endpoint is called. If the validation fails, return a suitable error message with a corresponding HTTP status code
Protected routes are create a blog, edit a blog, get the list of blogs, delete a blog(s)
Set the token, once validated, in the request - x-api-key
Use a middleware for authentication purpose.
Authorisation
Make sure that only the owner of the blogs is able to edit or delete the blog.
In case of unauthorized access return an appropirate error message.*/