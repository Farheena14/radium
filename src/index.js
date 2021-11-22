const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const middle = function(req, res, next) {

    console.log(new Date().toLocaleString())
    console.log(req.ip)
    console.log(req.originalUrl)
    next()

}
app.use(middle)




const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/Farheena_Ibrahim?retryWrites=true&w=majority", { useNewUrlParser: true })

.then(() => console.log('mongodb running on 27017 and connected'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
