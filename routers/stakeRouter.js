const asyncHandler = require("express-async-handler");
const {
    createStakingPlan,
    deleteStakingPlan, getStakingPlan, getSingleStakingPlan, stakeMyToken, fetchMyContract, rewardToken, sendMailer
} = require("../controller/stakeController");
const express = require("express");
const { validateToken } = require("../middleware/tokenValidation");

const router = express.Router();
router.use(validateToken);

router.route("/createPlan").post(createStakingPlan);
router.route("/deletePlan").post(deleteStakingPlan);
router.route("/getStakingPlan").post(getStakingPlan);
router.route("/getSingleStakingPlan").post(getSingleStakingPlan);
router.route("/stakeMyToken").post(stakeMyToken);
router.route("/fetchMyContract").post(fetchMyContract);
router.route("/rewardToken").post(rewardToken);
router.route("/sendMailer").post(sendMailer);


module.exports = router;