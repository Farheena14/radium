const express = require('express');
const router = express.Router();

const cowinController = require("../controllers/cowinController")

router.get("/coins", cowinController.getCoins)
  
module.exports = router;
