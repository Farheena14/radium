const userModel = require("../models/userModel");

const createUser = async function(req, res) {
    let userDetails = req.body;
    userDetails.freeAppUser = req.isFreeAppUser;
    let userCreated = await userModel.create(userDetails);
    res.send({ data: userCreated });
};

module.exports.createUser = createUser