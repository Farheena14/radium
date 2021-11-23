const express = require("express");
const router = express.Router();
const mainMiddleware = require("../middlewares/mainMiddleware");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");

router.post("/createUsers", mainMiddleware.validateAppType, userController.createUser);
router.post("/createProducts", productController.createProduct);
router.post("/createOrders", mainMiddleware.validateAppType, orderController.createOrder);

module.exports = router;