const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/tokenValidation")
const {
    signUpRequest,
    signInRequest, test
    // sendLoginOtp,
    // verifyOtp,
} = require("../controller/authController")



router.route("/register").post(signUpRequest);
router.route("/login").post(signInRequest);

// router.route("/rdata").post(validateToken, test);
// router.route("/sendOtp").post(sendLoginOtp);
// router.route("/verifyOtp").post(verifyOtp);


module.exports = router;