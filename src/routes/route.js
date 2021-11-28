const express = require('express');
const router = express.Router();

const cowinController = require("../controllers/cowinController")


router.get("/coins", cowinController.getCoins)
    //router.get("/ranking", cowinController.getRanking )



module.exports = router;