const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    name: String,
    balance: { type: Number, default: 100 },
    address: String,
    age: Number,
    gender: {
        type: String,
        enum: ["female", "male", "other"],
    },
    freeAppUser: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("myUser", userSchema);