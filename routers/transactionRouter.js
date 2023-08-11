const asyncHandler = require("express-async-handler");
const express = require("express");
const {deposit,getBalance,sendToken,
    withdraw,getTransactionHistory,getSingleUserTransactionHistory}= require("../controller/transactionController")
const { validateToken } = require("../middleware/tokenValidation");

const router = express.Router();

router.route("/depositInr").post( deposit);
router.route("/withdrawInr").post(withdraw);
router.route("/getBalance").post(getBalance);
router.route("/TransactionHistory").post(getTransactionHistory);
router.route("/UserTransactionHistory").post(validateToken,getSingleUserTransactionHistory);
router.route("/sendToken").post(validateToken,sendToken);


module.exports = router;