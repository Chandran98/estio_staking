const asyncHandler = require("express-async-handler");
const { updateuserById, getuserById, getAllUser,deleteuserById } = require("../controller/userContoller")
const express = require("express");

const router = express.Router();


router.route("/getAllUser").post(getAllUser);
router.route("/getuserById").post(getuserById);
router.route("/updateuserById/:id").post(updateuserById);
router.route("/deleteuserById/:id").post(deleteuserById);

module.exports = router;
