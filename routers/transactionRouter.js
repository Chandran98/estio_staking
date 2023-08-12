const asyncHandler = require("express-async-handler");
const express = require("express");
const { getBalance, sendToken,
    getTransactionHistory, getSingleUserTransactionHistory,convertINR2Crypto, depositINR, withdrawINR } = require("../controller/transactionController")
const { validateToken } = require("../middleware/tokenValidation");

const router = express.Router();

router.route("/depositInr").post(validateToken,depositINR);
router.route("/withdrawInr").post(validateToken,withdrawINR);
router.route("/getBalance").post(getBalance);
router.route("/TransactionHistory").post(getTransactionHistory);
router.route("/UserTransactionHistory").post(validateToken, getSingleUserTransactionHistory);
router.route("/sendToken").post(validateToken, sendToken);
router.route("/convertINR2Crypto").post(validateToken, convertINR2Crypto);


module.exports = router;