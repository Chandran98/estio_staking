
const mongoose = require("mongoose");


const admin = mongoose.Schema({
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    type: { type: String, default: "Admin" },
    // phone: { type: String },
}, {
    timestamp: true
})

module.exports = mongoose.model("Admin", admin);