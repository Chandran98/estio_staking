const asyncHandler = require("express-async-handler");
const { updateuserById, getuserById, getAllUser, deleteuserById, uploadImage,readImage } = require("../controller/userContoller")
const express = require("express");
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router.route("/getAllUser").post(getAllUser);
router.route("/getuserById").post(getuserById);
router.route("/updateuserById/:id").post(updateuserById);
router.route("/deleteuserById/:id").post(deleteuserById);
router.route("/uploadImage").post(upload.single("file"), uploadImage);
router.route("/readImage").get( readImage);


module.exports = router;
