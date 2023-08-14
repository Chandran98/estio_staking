const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/tokenValidation")
const {
    signUpRequest,
    signInRequest, adminSignUpRequest,
    // adminSignInRequest
    // sendLoginOtp,
    // verifyOtp,
} = require("../controller/authController")



router.route("/register").post(signUpRequest);
router.route("/login").post(signInRequest);
router.route("/adminRegister").post(adminSignUpRequest);
// router.route("/adminLogin").post(adminSignInRequest);

// router.route("/rdata").post(validateToken, test);
// router.route("/sendOtp").post(sendLoginOtp);
// router.route("/verifyOtp").post(verifyOtp);


module.exports = router;