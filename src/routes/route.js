const express = require('express');

const router = express.Router();

const userModel = require("../models/userModel")
const productModel = require("../models/loginModel")

const controler = require("../controllers/userController")
const middleware = require("../middleware/middleWare")

router.post('/createUser', controler.createUser);
router.post('/login', controler.login);
router.get('/users/:userId', middleware.tokenCheck, controler.dataById);
router.put('/users/:userId', middleware.tokenCheck, controler.updateEmail);

module.exports = router;