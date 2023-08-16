const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/tokenValidation")
const multer = require('multer');
const {
    signUpRequest,
    signInRequest, adminSignUpRequest
    // adminSignInRequest
    // sendLoginOtp,
    // verifyOtp,
} = require("../controller/authController")



router.route("/register").post(signUpRequest);
router.route("/login").post(signInRequest);
router.route("/adminRegister").post(adminSignUpRequest);
// router.route("/adminLogin").post(adminSignInRequest);

// const storage = multer.memoryStorage();
// const upload = multer({storage:storage});
// router.route("/uploadPic").post(upload.single("file"), uploadImage);
// router.route("/rdata").post(validateToken, test);
// router.route("/sendOtp").post(sendLoginOtp);
// router.route("/verifyOtp").post(verifyOtp);


module.exports = router;