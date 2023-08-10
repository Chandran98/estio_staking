const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

module.exports.validateToken = expressAsyncHandler(async (req, res, next) => {

    let token
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader === null || authHeader === "" || authHeader === undefined) {
        res.status(401);
        throw new Error("Token is missing ");
    }



    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if (token === null || token === "" || token === undefined) {
            res.status(400);
            throw new Error("Token is missing ");
        }

        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {

            if (err) {
                res.status(401);
                throw new Error("Invalid or Expired token")
            }
            req.user = decode.user;
            console.log(decode.user);
            next();
        })
    }
})