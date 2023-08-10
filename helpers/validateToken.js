const mongoose = require("mongoose");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");



module.exports.generateToken = (data) => {

    return jwt.sign(data, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
}