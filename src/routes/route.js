const express = require('express');
const router = express.Router();

const cowinController = require("../controllers/cowinController")

router.get("/cowin/states", cowinController.getStatesList)
router.get("/cowin/districts/:stateId", cowinController.getDistrictsList)
router.get("/cowin/centers", cowinController.getByPin)
router.post("/cowin/getOtp", cowinController.getOtp)
router.get("/getweather", cowinController.getweather)
router.get("/londonTemp", cowinController.londonTemp)
router.get("/weatherCities", cowinController.weatherCities)

module.exports = router;